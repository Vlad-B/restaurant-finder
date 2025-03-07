<style lang="scss">
@use "./ActionButton.scss";
</style>

<script>
export default {
  name: "ActionButton",
  props: {
    variant: {
      validator: function (value) {
        return ["contained", "text"].includes(value);
      },
      default: "contained",
    },
    buttonText: {
      type: String,
      default: null,
    },
    onClick: {
      type: Function,
      default: () => {},
    },
  },
};
</script>

<template>
  <button class="btn simple-button" :class="variant" @click="onClick">
    {{ buttonText }}
  </button>
</template>
