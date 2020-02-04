<template>
  <base-scoreboard :scoreboard="scoreboardScores" />
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
      scoreboardScores: [],
    };
  },
  created() {
    scoreboardRepository.listScores().then((data) => {
      this.scoreboardScores = data;
    });
  },
};
</script>
