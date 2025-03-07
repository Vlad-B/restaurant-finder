import { shallowMount } from "@vue/test-utils";
import RestaurantCard from "@/components/cards/RestaurantCard/RestaurantCard.vue";

describe("RestaurantCard.vue", () => {
  const restaurant = {
    Name: "Sushi Place",
    LogoUrl: "https://example.com/logo.png",
    Rating: {
      Count: 25,
      StarRating: 4.5,
    },
    Cuisines: [{ Name: "Japanese" }, { Name: "Sushi" }],
  };

  it("renders correctly with default props", () => {
    const wrapper = shallowMount(RestaurantCard, {
      propsData: { restaurant },
    });
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find(".restaurant-card__info__title").text()).toBe(
      restaurant.Name,
    );
  });

  it("renders the correct image with alt text", () => {
    const wrapper = shallowMount(RestaurantCard, {
      propsData: { restaurant },
    });
    const img = wrapper.find(".restaurant-card__image");
    expect(img.attributes("src")).toBe(restaurant.LogoUrl);
    expect(img.attributes("alt")).toBe(restaurant.Name);
  });

  it("displays 'No reviews' when Rating Count is zero", () => {
    const noReviewsRestaurant = {
      ...restaurant,
      Rating: { Count: 0, StarRating: 0 },
    };
    const wrapper = shallowMount(RestaurantCard, {
      propsData: { restaurant: noReviewsRestaurant },
    });
    expect(
      wrapper.find(".restaurant-card__info__content__rating p").text(),
    ).toBe("No reviews");
  });

  it("displays the correct star rating and review count", () => {
    const wrapper = shallowMount(RestaurantCard, {
      propsData: { restaurant },
    });
    expect(wrapper.find(".rating").text()).toBe(
      restaurant.Rating.StarRating.toString(),
    );
    expect(wrapper.find(".count").text()).toBe(`(${restaurant.Rating.Count})`);
  });

  it("renders all cuisines correctly", () => {
    const wrapper = shallowMount(RestaurantCard, {
      propsData: { restaurant },
    });
    const cuisines = wrapper.findAll(
      ".restaurant-card__info__content__cuisines li",
    );
    expect(cuisines.length).toBe(restaurant.Cuisines.length);
    expect(cuisines.at(0).text()).toBe("Japanese");
    expect(cuisines.at(1).text()).toBe("Sushi");
  });
});
