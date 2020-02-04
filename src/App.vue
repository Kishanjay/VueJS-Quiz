<template>
  <div class="container">
    <div class="shadow">
      <the-navbar />
      <router-view />
      <the-footer />
    </div>
  </div>
</template>

<script>
import TheNavbar from './partials/TheNavbar.vue';
import TheFooter from './partials/TheFooter.vue';

export default {
  components: {
    TheNavbar,
    TheFooter,
  },
  props: {},
  methods: {},
};
</script>
