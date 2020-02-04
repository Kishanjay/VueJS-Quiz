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
          v-for="(scoreboardEntry, index) in scoreboard"
          :key="index"
        >
          <th scope="row">
            {{ index+1 }}
          </th>
          <td>{{ scoreboardEntry.username }}</td>
          <td>{{ scoreboardEntry.score }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: {
    scoreboard: {
      required: true,
      type: Array,
    },
  },
};
</script>
