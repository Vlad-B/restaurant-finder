<style lang="scss">
@use "./CuisinesList.scss";
</style>

<script>
export default {
  name: "CuisinesList",
  props: {
    cuisines: {
      type: Array,
      default: [],
    },
    filterByCuisine: {
      type: Function,
      default: () => {},
      required: true,
    },
    selectedCuisine: {
      type: String,
    },
  },
};
</script>

<template>
  <ul class="cuisines-list">
    <template v-for="cuisine in cuisines">
      <li>
        <button
          class="btn"
          :class="selectedCuisine === cuisine ? 'selected' : ''"
          @click="filterByCuisine(cuisine)"
        >
          {{ cuisine }}
        </button>
      </li>
    </template>
  </ul>
</template>
