<template>
  <main>
    <base-jumbotron
      title="Welcome dear visitor"
      description="This webapplication was made by Kishan Nirghin"
    />

    <router-link
      to="/quiz"
      class="btn btn-info btn-lg btn-block"
    >
      Take me to the quiz
    </router-link>
  </main>
</template>
<script>
import BaseJumbotron from '../components/text/BaseJumbotron.vue';

export default {
  components: {
    BaseJumbotron,
  },
};
</script>
