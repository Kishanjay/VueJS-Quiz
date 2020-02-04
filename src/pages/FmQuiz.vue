<template>
  <main>
    <base-alert
      v-if="activeError"
      :message="activeError.message"
      :code="activeError.code"
    />

    <base-jumbotron
      v-if="!quizStarted"
      title="Frontmen Quiz"
      description="Get ready to start the frontmen quiz"
      input="Enter your name"
      cta="Start quiz"

      @click:cta="startQuiz"
    />

    <template v-if="quizStarted">
      <div
        v-if="!quizFinished"
        class="alert alert-light mb-0 d-flex justify-content-between align-items-center"
        role="alert"
      >
        <button
          type="button"
          class="btn btn-danger"
          @click="resetQuiz"
        >
          Abort quiz
        </button>
        Playing as {{ username }}
      </div>
      <base-quiz
        :seconds-to-answer="30"

        :questions="questions"
        :max-number-of-questions="3"

        :loading-question="loadingQuestion"
        @load:next-question="loadNextQuestion"

        @on:finish="finishQuiz"
      />
    </template>

    <template v-if="quizFinished">
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">
            You scored: {{ quizResult.score }}%
          </h5>
          <p class="card-text">
            Compare your score on the scoreboard or try again!
          </p>
          <button
            class="btn btn-primary"
            @click="resetQuiz"
          >
            Try again
          </button>
          <button
            class="btn btn-secondary"
          >
            Scoreboard
          </button>
        </div>
      </div>
    </template>
  </main>
</template>

<script>
import { first } from 'lodash';

import quizRepository from '../repositories/quizRepository';
import scoreboardRepository from '../repositories/scoreboardRepository';

import BaseAlert from '../components/text/BaseAlert.vue';
import BaseQuiz from '../components/quiz/BaseQuiz.vue';
import BaseJumbotron from '../components/text/BaseJumbotron.vue';


export default {
  components: {
    BaseAlert,
    BaseQuiz,
    BaseJumbotron,
  },
  data() {
    return {
      activeError: null,
      questions: [],
      loadingQuestion: false,

      username: null,
      quizStarted: false,
      quizFinished: false,

      quizResult: null,
    };
  },
  methods: {
    startQuiz(username) {
      this.username = username;
      this.quizStarted = true;
    },
    resetQuiz() {
      this.activeError = null;
      this.questions = [];
      this.loadingQuestion = false;

      this.username = null;
      this.quizStarted = false;
      this.quizFinished = false;

      this.quizResult = null;
    },
    finishQuiz(scorePercentage, answers) {
      this.quizResult = {
        score: scorePercentage,
        answers,
        questions: this.questions,
      };

      this.quizFinished = true;
      this.saveQuizResult(this.quizResult, this.username);
    },
    saveQuizResult(quizResult, username) {
      scoreboardRepository.addScore(username, quizResult.score).then(() => {
        console.log('done');
      }).catch(() => {
        console.log('failed storing score');
      });
    },

    error(errorMessage, errorCode = null) {
      this.showError(errorMessage, errorCode, 1000);
    },
    showError(errorMessage, errorCode, duration) {
      this.activeError = {
        message: errorMessage,
        code: errorCode,
      };

      setTimeout(() => {
        this.activeError = null;
      }, duration);
    },

    loadNextQuestion() {
      this.loadingQuestion = true;
      quizRepository.getQuestion().then(({ data, status }) => {
        if (status !== 200) {
          this.error('failed loading quiz question', 1);
          return;
        }
        const question = first(data.results);
        if (!question) {
          this.error('failed loading quiz question', 2);
          return;
        }
        question.id = (this.questions.length + 1).toString(); // add unique id to question
        this.questions.push(question);
      }).finally(() => {
        this.loadingQuestion = false;
      });
    },
  },
};
</script>
