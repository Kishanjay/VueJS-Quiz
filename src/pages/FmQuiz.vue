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
    <base-quiz
      v-if="quizStarted"
      :seconds-to-answer="30"

      :questions="questions"
      :max-number-of-questions="3"

      :loading-question="loadingQuestion"
      @load:next-question="loadNextQuestion"

      @on:finish="quizFinished"
    />
  </main>
</template>

<script>
import { first } from 'lodash';

import quizRepository from '../repositories/quizRepository';

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
    };
  },
  methods: {
    startQuiz(username) {
      console.log('starting quiz');
      this.username = username;
      this.quizStarted = true;
    },
    quizFinished(scorePercentage, answers) {
      console.log({ scorePercentage, answers });
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
