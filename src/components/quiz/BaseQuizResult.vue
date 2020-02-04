<script>/* eslint-disable vue/no-v-html */</script>
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
          <h5 v-html="sanitizeHtml(question.question)" />
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
            <span v-html="sanitizeHtml(question.correct_answer)" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import sanitizeHtml from 'sanitize-html';

export default {
  props: {
    quizResult: {
      required: true,
      type: Object,
    },
  },
  methods: {
    sanitizeHtml,
  }
};
</script>
