<template>
  <nav class="navbar navbar-dark bg-dark">
    <router-link
      to="/quiz"
      class="navbar-brand"
    >
      VueJs Quiz
    </router-link>

    <ul class="navbar-nav">
      <li class="nav-item">
        <router-link
          to="/quiz"
          class="nav-link"
        >
          Quiz
        </router-link>
      </li>
      <li class="nav-item">
        <router-link
          to="/scoreboard"
          class="nav-link"
        >
          Scoreboard
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
module.exports = {
  props: {},
  methods: {},
};
</script>

<style lang="scss" scoped>
.navbar-nav {
    display: flex;
    flex-direction: row;
}
.nav-item {
    margin-left: 16px;
}
</style>
