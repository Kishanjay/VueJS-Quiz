<template>
  <div class="quiz">
    <div class="card">
      <div v-if="loadingQuestion">
        loading
      </div>
      <div v-if="quizFinished">
        Quiz finished
      </div>

      <base-quiz-question
        v-if="currentQuestion && !loadingQuestion && !quizFinished"
        :question-id="questions.length.toString()"
        :question="currentQuestion.question"
        :answers="[...currentQuestion.incorrect_answers, currentQuestion.correct_answer]"
        :type="currentQuestion.type"
        :difficulty="currentQuestion.difficulty"

        @on:submit="submitAnswer"
      />

      <base-quiz-progress
        :max-progress="maxNumberOfQuestions"
        :current-progress="questions.length"
      />
    </div>
  </div>
</template>
<script>
import { last } from 'lodash';

import BaseQuizQuestion from './BaseQuizQuestion.vue';
import BaseQuizProgress from './BaseQuizProgress.vue';

export default {
  components: {
    BaseQuizQuestion,
    BaseQuizProgress,
  },
  props: {
    questions: {
      type: Array,
      required: true,
    },
    maxNumberOfQuestions: {
      type: Number,
      default: 10,
      required: false,
      validate: (n) => n > 0,
    },
    secondsToAnswer: {
      type: Number,
      default: 30,
      required: false,
    },
    loadingQuestion: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  data() {
    return {
      quizFinished: false,
    };
  },
  computed: {
    currentQuestion() {
      return last(this.questions);
    },
  },
  created() {
    this.startQuiz();
  },
  methods: {
    startQuiz() {
      this.showNextQuestion();
    },
    submitAnswer(question, answer) {
      // eslint-disable-next-line no-console
      console.log({ question, answer });

      if (this.questions.length >= this.maxNumberOfQuestions) {
        this.quizFinished = true;
        return;
      }
      this.showNextQuestion();
    },
    showNextQuestion() {
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
