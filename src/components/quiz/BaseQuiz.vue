<template>
  <div class="quiz">
    <div class="card">
      <div v-if="loading">
        loading
      </div>

      <base-quiz-question
        v-if="currentQuestion"
        :question-id="questions.length.toString()"
        :question="currentQuestion.question"
        :answers="[...currentQuestion.incorrect_answers, currentQuestion.correct_answer]"
        :type="currentQuestion.type"
        :difficulty="currentQuestion.difficulty"
      />

      <div class="progress">
        <div
          class="progress-bar bg-success"
          role="progressbar"
          style="width: 10%"
          aria-valuenow="1"
          aria-valuemin="0"
          aria-valuemax="10"
        />
      </div>
    </div>
  </div>
</template>
<script>
import { last } from 'lodash';

import BaseQuizQuestion from './BaseQuizQuestion.vue';

export default {
  components: {
    BaseQuizQuestion,
  },
  props: {
    secondsToAnswer: {
      type: Number,
      default: 30,
      required: false,
    },
    questions: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      loading: false,
    };
  },
  computed: {
    currentQuestion() {
      return last(this.questions);
    },
  },
  watch: {
    questions: {
      deep: true,
      handler() {
        this.loading = false;
      },
    },
  },
  created() {
    this.startQuiz();
  },
  methods: {
    startQuiz() {
      this.showNextQuestion();
    },
    submitAnswer() {
      this.showNextQuestion();
    },
    showNextQuestion() {
      this.loading = true;
      this.$emit('load:next-question');
    },
  },
};
</script>

<style lang="scss" scoped>
.quiz {
    text-align: center;
}
</style>
