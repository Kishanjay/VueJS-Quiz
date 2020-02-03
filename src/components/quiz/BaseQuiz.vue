<template>
  <div class="quiz">
    <div class="card">
      <div v-if="loadingQuestion">
        loading
      </div>
      <div v-if="finished">
        Finished quiz
      </div>

      <base-quiz-question
        v-if="currentQuestion && !loadingQuestion && !finished"
        :question-id="questions.length.toString()"
        :question="currentQuestion.question"
        :answers="[...currentQuestion.incorrect_answers, currentQuestion.correct_answer]"
        :type="currentQuestion.type"
        :difficulty="currentQuestion.difficulty"

        @on:submit="submitAnswer"
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
    questions: {
      type: Array,
      required: true,
    },
    maxNumberOfQuestions: {
      type: Number,
      default: 10,
      required: false,
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
      finished: false,
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
      if (this.questions.length >= this.maxNumberOfQuestions) {
        this.finished = true;
        return;
      }
      this.showNextQuestion();
    },
    showNextQuestion() {
      if (this.quizFinished) {
        return;
      }

      this.$emit('load:next-question');
      this.questionsLoaded += 1;
    },
  },
};
</script>

<style lang="scss" scoped>
.quiz {
    text-align: center;
}
</style>
