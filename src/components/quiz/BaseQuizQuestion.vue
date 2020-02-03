<script>/* eslint-disable vue/no-v-html */</script>
<template>
  <div class="question p-4">
    <h1>
      Question {{ questionId }}
    </h1>
    <span
      v-if="difficulty"
      :class="`badge ${difficultyColorClassMapping[difficulty].badge}`"
    > {{ difficulty }} </span>

    <p v-html="sanitizeHtml(question)" />

    <div class="form-group">
      <div v-if="type==='boolean'">
        <label class="form-check">
          <input
            v-model="answer"
            type="radio"
            value="True"
          > True
        </label>
        <label class="form-check">
          <input
            v-model="answer"
            type="radio"
            value="False"
          > False
        </label>
      </div>
      <div v-else-if="type==='multiple'">
        <label
          v-for="possibleAnswer in answers"
          :key="possibleAnswer"
          class="form-check"
        >
          <input
            v-model="answer"
            type="radio"
            :value="possibleAnswer"
          > {{ sanitizeHtml(possibleAnswer) }}
        </label>
      </div>
      <label
        v-else
        class="w-100"
      >Answer
        <textarea
          v-model="answer"
          class="form-control"
        />
      </label>
    </div>
    <button
      class="btn btn-primary"
      type="button"
    >
      Submit answer
      <span v-if="timeout">|
        {{ secondsLeft }}
      </span>
    </button>
  </div>
</template>
<script>
import sanitizeHtml from 'sanitize-html';

export default {
  props: {
    difficulty: {
      type: String,
      required: false,
      default: null,
    },
    type: {
      type: String,
      required: true,
    },
    questionId: {
      type: String,
      required: false,
      default: null,
    },
    question: {
      type: String,
      required: true,
    },
    answers: {
      type: Array,
      required: true,
    },
    timeout: {
      type: Number,
      required: false,
      default: null,
    }
  },
  data() {
    return {
      answer: null,
      submitted: false,

      difficultyColorClassMapping: {
        null: { text: 'text-primary', badge: 'badge-primary' },
        easy: { text: 'text-info', badge: 'badge-info' },
        medium: { text: 'text-warning', badge: 'badge-warning' },
        hard: { text: 'text-danger', badge: 'badge-danger' },
      },

      secondsLeft: this.timeout,
    };
  },
  created() {
    if (this.timeout) {
      setInterval(() => {
        this.secondsLeft -= 1;
        if (this.secondsLeft <= 0){
          this.submitAnswer();
        }
      }, 1000)
    }
  },
  methods: {
    submitAnswer() {
      this.$emit('on:submit', this.questionId, this.answer);
      this.submitted = true;
    },
    sanitizeHtml,
  },
};
</script>

<style lang="scss" scoped>
</style>
