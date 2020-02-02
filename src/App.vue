<template>
  <div class="container">
    <the-navbar />

    <fm-quiz />
  </div>
</template>

<script>
import TheNavbar from './TheNavbar.vue';
import FmQuiz from './pages/FmQuiz.vue';

export default {
  components: {
    TheNavbar,
    FmQuiz,
  },
  props: {},
  methods: {},
};
</script>
