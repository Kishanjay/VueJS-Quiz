<template>
  <div>
    <h1>Scoreboard</h1>
    <table class="table">
      <thead>
        <tr>
          <th scope="col">
            #
          </th>
          <th scope="col">
            Username
          </th>
          <th scope="col">
            Score
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(scoreboardScoreEntry, index) in scoreboardScores"
          :key="index"
          :class="{'table-primary': scoreboardScoreEntry.id === highlightedId}"
        >
          <th scope="row">
            {{ index+1 }}
          </th>
          <td>{{ scoreboardScoreEntry.username }}</td>
          <td>{{ scoreboardScoreEntry.score }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: {
    scoreboardScores: {
      required: true,
      type: Array,
    },
    highlightedId: {
      required: false,
      type: String,
      default: null,
    },
  },
};
</script>
