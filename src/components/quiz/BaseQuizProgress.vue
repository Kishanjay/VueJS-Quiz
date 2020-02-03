<template>
  <div class="progress">
    <div
      class="progress-bar bg-success"
      role="progressbar"
      :style="`width: ${getWidth()}`"
      aria-valuemin="0"
      :aria-valuenow="currentProgress"
      :aria-valuemax="maxProgress"
    />
  </div>
</template>
<script>
export default {
  props: {
    maxProgress: {
      type: Number,
      required: true,
    },
    currentProgress: {
      type: Number,
      required: true,
    },
  },
  methods: {
    getWidth() {
      return `${(100 * this.currentProgress) / this.maxProgress}%`;
    },
  },
};
</script>
