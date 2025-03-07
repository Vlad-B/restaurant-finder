<style lang="scss">
@use "./SearchInput.scss";
</style>

<script>
import ActionButton from "@/components/buttons/ActionButton/ActionButton.vue";

export default {
  name: "SearchInput",
  components: {
    ActionButton,
  },
  props: {
    value: {
      type: [Number, String],
      default: null,
    },
    placeholder: {
      type: String,
      default: null,
    },
    onChange: {
      type: Function,
      default: () => {},
    },

    onSearch: {
      type: Function,
      default: () => {},
    },
    searchButtonText: {
      type: String,
      default: "Search",
    },
  },
};
</script>
<template>
  <div class="search-input">
    <font-awesome-icon icon="fa-solid fa-magnifying-glass" />
    <input :value="value" :placeholder="placeholder" @input="onChange" />
    <ActionButton :onClick="onSearch" :buttonText="searchButtonText" />
  </div>
</template>
