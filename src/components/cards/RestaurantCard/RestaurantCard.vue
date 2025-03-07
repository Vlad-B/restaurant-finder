<style lang="scss">
@use "./RestaurantCard.scss";
</style>

<script>
export default {
  name: "RestaurantCard",
  props: {
    restaurant: {
      type: Object,
      required: true,
      validator(value) {
        return (
          typeof value.Name === "string" &&
          typeof value.LogoUrl === "string" &&
          Array.isArray(value.Cuisines) &&
          typeof value.Rating === "object" &&
          typeof value.Rating.Count === "number" &&
          typeof value.Rating.StarRating === "number"
        );
      },
    },
  },
};
</script>

<template>
  <div class="restaurant-card">
    <img
      class="restaurant-card__image"
      :src="restaurant.LogoUrl"
      :alt="restaurant.Name"
    />
    <div class="restaurant-card__info">
      <h3 class="restaurant-card__info__title">{{ restaurant.Name }}</h3>
      <div class="restaurant-card__info__content">
        <div class="restaurant-card__info__content__rating">
          <font-awesome-icon icon="fa-solid fa-star" />
          <p v-if="restaurant.Rating.Count === 0">No reviews</p>
          <p v-else>
            <span class="rating">{{ restaurant.Rating.StarRating }}</span>
            <span class="count">({{ restaurant.Rating.Count }})</span>
          </p>
        </div>
        <ul class="restaurant-card__info__content__cuisines">
          <template v-for="cuisine in restaurant.Cuisines">
            <li>{{ cuisine.Name }}</li>
          </template>
        </ul>
      </div>
    </div>
  </div>
</template>
