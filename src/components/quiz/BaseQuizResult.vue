<template>
  <div class="card">
    <div class="card-body">
      <h5 class="card-title">
        Your quiz score: {{ quizResult.score }}%
      </h5>
      <div class="list-group">
        <div
          v-for="question in quizResult.questions"
          :key="question.id"
          class="list-group-item"
        >
          <h5>{{ question.question }}</h5>
          <div
            v-if="question.user_answer.correct"
            class="alert alert-success"
          >
            {{ question.user_answer.value }}
          </div>
          <div
            v-if="!question.user_answer.correct"
            class="alert alert-danger"
          >
            {{ question.user_answer.value }} <br>
            <b>Correct answer:</b>
            {{ question.correct_answer }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    quizResult: {
      required: true,
      type: Object,
    },
  },
};
</script>
