<template>
  <main>
    <base-alert
      v-if="activeError"
      :message="activeError.message"
      :code="activeError.code"
    />

    <base-jumbotron
      v-if="!quizStarted"
      title="So you think you can quiz?"
      description="Get ready to make your brain sweat, only one can become the quizmaster!"
      input="Enter your nickname"
      cta="Lets get busy"

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
      <base-quiz-result :quiz-result="quizResult" />
      <div class="card">
        <div class="card-body">
          <button
            class="btn btn-primary"
            @click="resetQuiz"
          >
            Try again
          </button>
          <router-link
            to="/scoreboard"
            class="btn btn-secondary"
          >
            Scoreboard
          </router-link>
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
import BaseJumbotron from '../components/text/BaseJumbotron.vue';
import BaseQuiz from '../components/quiz/BaseQuiz.vue';
import BaseQuizResult from '../components/quiz/BaseQuizResult.vue';

export default {
  components: {
    BaseAlert,
    BaseJumbotron,
    BaseQuiz,
    BaseQuizResult,
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
      if (username === 'RESET ALL') {
        scoreboardRepository.deleteScores();
        this.error('failed starting quiz', 'EASTEREGG-1');
        return;
      }
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
      const questions = this.questions.map((q) => ({ ...q })); // copies array of objects
      questions.forEach((question) => { // add userAnswer to every question
        // eslint-disable-next-line no-param-reassign
        question.user_answer = answers.find((answer) => answer.questionId === question.id);
      });

      this.quizResult = {
        score: scorePercentage,
        questions,
      };

      console.log({ r: this.quizResult });

      this.quizFinished = true;
      this.saveQuizResult(this.quizResult, this.username);
    },
    saveQuizResult(quizResult, username) {
      scoreboardRepository.addScore(quizResult.score, username).catch((e) => {
        this.error(e, 'sbr-1');
      });
    },

    error(errorMessage, errorCode = null) {
      this.showError(errorMessage, errorCode, 10000);
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
