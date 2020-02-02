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
      :finished="false"
      :loading="loading"
      @load:next-question="loadNextQuestion"
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
      loading: false,
    };
  },
  created() {
    this.loadNextQuestion();
  },
  methods: {
    loadNextQuestion() {
      this.loading = true;
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
        this.questions.push(question);
      }).finally(() => {
        this.loading = false;
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
  },
};
</script>
