<template>
  <div class="quiz">
    <div class="card">
      <base-loader
        v-if="loadingQuestion"
        title="Loading question..."
        class="p-4 m-4"
      />
      <div v-if="quizFinished">
        <div
          class="alert alert-success"
          role="alert"
        >
          Congratulations you've finished the quiz
        </div>
      </div>

      <base-quiz-question
        v-if="currentQuestion && !loadingQuestion && !quizFinished"
        :question-id="currentQuestion.id"
        :question="currentQuestion.question"
        :answers="[...currentQuestion.incorrect_answers, currentQuestion.correct_answer]"
        :type="currentQuestion.type"
        :difficulty="currentQuestion.difficulty"

        :timeout="secondsToAnswer"
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

import BaseLoader from '../loader/BaseLoader.vue';

import BaseQuizQuestion from './BaseQuizQuestion.vue';
import BaseQuizProgress from './BaseQuizProgress.vue';

export default {
  components: {
    BaseLoader,
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
      answers: [],
    };
  },
  computed: {
    currentQuestion() {
      return last(this.questions);
    },
  },
  beforeMount() {
    window.addEventListener('beforeunload', this.unloadProtection);
  },
  beforeDestroy() {
    window.removeEventListener('beforeunload', this.unloadProtection);
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

      this.answers.push({
        questionId,
        correct: this.isCorrectAnswer(answer, question.correct_answer),
        value: answer,
      });

      if (this.questions.length >= this.maxNumberOfQuestions) {
        this.quizFinished = true;
        this.$emit('on:finish', this.getScorePercentage(), this.answers);
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
    getScorePercentage() {
      const totalCorrect = this.answers.reduce((correct, answer) => {
        if (answer.correct) {
          return correct + 1;
        }
        return correct;
      }, 0);

      const scorePercentage = (totalCorrect / this.answers.length) * 100;
      return scorePercentage.toFixed(2);
    },
    unloadProtection(event) {
      if (this.questions.length < this.maxNumberOfQuestions) {
        // eslint-disable-next-line no-param-reassign
        event.returnValue = 'Are you sure you want to quit the quiz?';
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.quiz {
    text-align: center;
}
</style>
