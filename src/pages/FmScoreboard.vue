<template>
  <base-scoreboard :scores="scores" />
</template>

<script>
import BaseScoreboard from '../components/scoreboard/BaseScoreboard.vue';
import scoreboardRepository from '../repositories/scoreboardRepository';

export default {
  components: {
    BaseScoreboard,
  },
  data() {
    return {
      scores: [],
    };
  },
  created() {
    scoreboardRepository.listScores().then((data) => {
      this.scores = data;
    });
  },
};
</script>
