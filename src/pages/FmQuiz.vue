<template>
  <main>
    <base-alert
      v-if="activeError"
      :message="activeError.message"
      :code="activeError.code"
    />

    <base-quiz
      :seconds-to-answer="30"

      :questions="questions"
      :number-of-questions="10"

      :loading-question="loadingQuestion"
      @load:next-question="loadNextQuestion"

      @on:finish="finish"
    />
  </main>
</template>

<script>
import { first } from 'lodash';

import quizRepository from '../repositories/quizRepository';

import BaseAlert from '../components/alert/BaseAlert.vue';
import BaseQuiz from '../components/quiz/BaseQuiz.vue';

export default {
  components: {
    BaseAlert,
    BaseQuiz,
  },
  data() {
    return {
      activeError: null,
      questions: [],
      loadingQuestion: false,
    };
  },
  methods: {
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
        question.id = (this.questions.length + 1).toString(); // store an unique id for the questions
        this.questions.push(question);
      }).finally(() => {
        this.loadingQuestion = false;
      });
    },

    finish() {

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
  },
};
</script>
