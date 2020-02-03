<template>
  <div class="question p-4">
    <h1>
      Question {{ questionId }}
    </h1>
    <span
      v-if="difficulty"
      :class="`badge ${difficultyColorClassMapping[difficulty].badge}`"
    > {{ difficulty }} </span>

    <p>
      {{ question }} {{ answer }}
    </p>

    <div class="form-group">
      <label v-if="type==='boolean'">
        <input
          v-model="answer"
          type="checkbox"
        > True
      </label>
      <div v-else-if="type==='multiple'">
        <label
          v-for="possibleAnswer in answers"
          :key="possibleAnswer"
        >
          <input
            v-model="answer"
            type="radio"
            :value="possibleAnswer"
          > {{ possibleAnswer }}
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
      type="button"
      class="btn btn-primary"
      @click="submitAnswer"
    >
      Submit answer
    </button>
  </div>
</template>
<script>

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
    };
  },
  methods: {
    submitAnswer() {
      console.log({ a: this.answers });
      this.$emit('on:submit', this.questionId, this.answer);
      this.submitted = true;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
