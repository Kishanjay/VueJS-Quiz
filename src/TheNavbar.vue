<template>
  <nav class="navbar navbar-dark bg-dark">
    <a
      class="navbar-brand"
      href="#"
    >Frontmen Quiz</a>

    <ul class="navbar-nav">
      <li class="nav-item active">
        <a
          class="nav-link"
          href="#"
        >Home <span class="sr-only">(current)</span></a>
      </li>
      <li class="nav-item">
        <a
          class="nav-link"
          href="#"
        >Features</a>
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
