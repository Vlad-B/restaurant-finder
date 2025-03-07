<style lang="scss">
@use "./RestaurantsView.scss";
</style>

<script>
import { debounce } from "lodash";
import RestaurantCard from "../../components/cards/RestaurantCard/RestaurantCard.vue";
import CuisinesList from "./CuisinesList/CuisinesList.vue";
import SearchInput from "../../components/inputs/SearchInput/SearchInput.vue";
import Loading from "../../components/loading/Loading.vue";
import ActionButton from "@/components/buttons/ActionButton/ActionButton.vue";

export default {
  name: "RestaurantsView",
  components: {
    ActionButton,
    SearchInput,
    CuisinesList,
    RestaurantCard,
    Loading,
  },
  data() {
    return {
      search: "",
      restaurants: null,
      filteredRestaurants: null,
      cuisines: null,
      filter: null,
      selectedCuisine: null,
      loading: false,
    };
  },
  methods: {
    getRestaurants: debounce(async function () {
      const trimmedSearch = this.search.trim();

      if (!trimmedSearch) return;
      this.loading = true;

      try {
        const res = await fetch(`/api/restaurants/bypostcode/${this.search}`);
        const data = await res.json();
        this.restaurants = data.Restaurants;
        this.filteredRestaurants = data.Restaurants;
        this.cuisines = data.CuisineSets[0].Cuisines.map(
          (cuisine) => cuisine.Name,
        ).sort();
      } catch (e) {
        console.error("Error fetching data:", e);
        this.restaurants = [];
      } finally {
        this.loading = false;
      }
    }, 500),

    handleInputChange(e) {
      this.search = e.target.value;
      this.getRestaurants();
    },

    filterByCuisine(cuisine) {
      if (this.selectedCuisine === cuisine) {
        this.filteredRestaurants = this.restaurants;
        this.selectedCuisine = null;
        return;
      }

      this.filteredRestaurants = this.restaurants.filter((restaurant) => {
        const restaurantCuisines = restaurant.Cuisines.map(
          (cuisine) => cuisine.Name,
        );
        return restaurantCuisines.some(
          (restaurantCuisine) => restaurantCuisine === cuisine,
        );
      });

      this.selectedCuisine = cuisine;
    },
    resetFilter() {
      this.selectedCuisine = null;
      this.filteredRestaurants = this.restaurants;
    },
  },
};
</script>

<template>
  <div class="restaurant-view">
    <div class="location-search">
      <SearchInput
        :value="search"
        placeholder="Search by Postcode"
        :onChange="handleInputChange"
        :onSearch="getRestaurants"
      />
    </div>

    <template v-if="loading">
      <Loading />
    </template>

    <template v-else-if="restaurants && restaurants.length === 0">
      <p>No results found for "{{ search }}"</p>
    </template>

    <template v-else-if="restaurants && restaurants.length > 0">
      <div class="restaurant-view__listing">
        <div class="cuisines">
          <div class="cuisines__title">
            <p>All Cuisines A - Z</p>
            <ActionButton
              buttonText="Reset"
              variant="text"
              :onClick="resetFilter"
            />
          </div>
          <CuisinesList
            :cuisines="cuisines"
            :selectedCuisine="selectedCuisine"
            :filterByCuisine="filterByCuisine"
          />
        </div>
        <div class="restaurants">
          <template v-for="item in filteredRestaurants">
            <RestaurantCard :restaurant="item" :cuisines="cuisines" />
          </template>
        </div>
      </div>
    </template>
  </div>
</template>
