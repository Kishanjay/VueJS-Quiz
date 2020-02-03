<template>
  <div class="container">
    <div class="shadow">
      <the-navbar />
      <fm-quiz />
      <the-footer />
    </div>
  </div>
</template>

<script>
import TheNavbar from './partials/TheNavbar.vue';
import TheFooter from './partials/TheFooter.vue';

import FmQuiz from './pages/FmQuiz.vue';

export default {
  components: {
    TheNavbar,
    TheFooter,
    FmQuiz,
  },
  props: {},
  methods: {},
};
</script>
