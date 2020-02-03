<template>
  <div>
    <h4> {{ title }} </h4>
    <div
      class="spinner-grow text-primary"
      role="status"
    />
    <div
      class="spinner-grow text-secondary"
      role="status"
    />
    <div
      class="spinner-grow text-success"
      role="status"
    />
    <div
      class="spinner-grow text-danger"
      role="status"
    />
    <div
      class="spinner-grow text-warning"
      role="status"
    />
    <div
      class="spinner-grow text-info"
      role="status"
    />
    <div
      class="spinner-grow text-light"
      role="status"
    />
    <div
      class="spinner-grow text-dark"
      role="status"
    />
    <span class="sr-only">Loading...</span>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: false,
      default: 'Loading...',
    },
  },
};
</script>
