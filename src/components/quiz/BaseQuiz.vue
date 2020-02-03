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
        :question-id="currentQuestion.id"
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
    submitAnswer(questionId, answer) {
      const question = this.questions.find((q) => q.id === questionId);
      if (!question) {
        throw new Error('question not found');
      }

      question.answer = {
        correct: this.isCorrectAnswer(answer, question.correct_answer),
        value: answer,
      };

      if (this.questions.length >= this.maxNumberOfQuestions) {
        this.quizFinished = true;
        return;
      }
      this.showNextQuestion();
    },
    showNextQuestion() {
      this.$emit('load:next-question');
    },
    isCorrectAnswer(actual, expected) {
      const normalizedActual = this.normalizeAnswer(actual);
      const normalizedExpected = this.normalizeAnswer(expected);
      return normalizedActual === normalizedExpected;
    },
    normalizeAnswer(answer) {
      if (!answer) { return null; }
      return answer.trim().toLowerCase();
    },
  },
};
</script>

<style lang="scss" scoped>
.quiz {
    text-align: center;
}
</style>
