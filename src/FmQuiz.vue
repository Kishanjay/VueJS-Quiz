<template>
  <div class="fm_quiz">
    <div class="card">
      <h1>
        Question 1
      </h1>

      <p>A random placeholder question for this thing</p>

      <div class="form-group">
        <label>Answer
          <textarea
            class="form-control"
            rows="3"
          />
        </label>
      </div>
      <button
        type="button"
        class="btn btn-primary"
      >
        Submit answer
      </button>

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
export default {
  props: {

  },
  mounted() {
    this.startQuiz();
  },
  methods: {
    startQuiz() {

    },
  },
};
</script>

<style lang="scss" scoped>
.fm_quiz {
    text-align: center;
}
</style>
