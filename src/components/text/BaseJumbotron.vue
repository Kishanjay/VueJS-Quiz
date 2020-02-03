<template>
  <div class="jumbotron mb-0">
    <h1 class="display-4">
      {{ title }}
    </h1>
    <p class="lead">
      {{ description }}
    </p>

    <hr class="my-4">

    <div
      v-if="input"
      class="form-group"
    >
      <label> {{ input }}
        <input
          v-model="inputValue"
          type="text"
          class="form-control"
          @update="() => $emit('update:value', inputValue)"
        >
      </label>
    </div>

    <button
      v-if="cta"
      class="btn btn-primary btn-lg"
      @click="() => $emit('click:cta', inputValue)"
    >
      {{ cta }}
    </button>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      required: true,
      type: String,
    },
    description: {
      required: true,
      type: String,
    },
    input: {
      required: false,
      type: String,
      default: null,
    },
    cta: {
      required: false,
      type: String,
      default: null,
    },
  },
  data() {
    return {
      inputValue: null,
    };
  },
};
</script>
