<template>
  <div>
    <h1>
      Question {{ questionId }}
    </h1>

    <p>{{ question }}</p>

    <div class="form-group">
      <label>Answer
        <textarea
          class="form-control"
          :model="answer"
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
    };
  },
  methods: {
    submitAnswer() {
      this.$emit('on:submit', this.answer);
      this.submitted = true;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
