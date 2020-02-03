<template>
  <div class="container">
    <the-navbar />

    <fm-quiz />
    <the-footer />
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
