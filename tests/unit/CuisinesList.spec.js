import { shallowMount } from "@vue/test-utils";
import CuisinesList from "@/views/RestaurantsView/CuisinesList/CuisinesList.vue";

describe("CuisinesList.vue", () => {
  const filterByCuisineMock = jest.fn();

  const defaultProps = {
    cuisines: ["Japanese", "Italian", "Sushi", "Mexican"],
    filterByCuisine: filterByCuisineMock,
    selectedCuisine: "Sushi",
  };

  it("renders a list of cuisines", () => {
    const wrapper = shallowMount(CuisinesList, {
      propsData: defaultProps,
    });

    const items = wrapper.findAll("li");
    expect(items.length).toBe(defaultProps.cuisines.length);

    defaultProps.cuisines.forEach((cuisine, index) => {
      expect(items.at(index).text()).toBe(cuisine);
    });
  });

  it("applies 'selected' class to the selected cuisine", () => {
    const wrapper = shallowMount(CuisinesList, {
      propsData: defaultProps,
    });

    const selectedButton = wrapper.find(".btn.selected");
    expect(selectedButton.exists()).toBe(true);
    expect(selectedButton.text()).toBe(defaultProps.selectedCuisine);
  });

  it("calls filterByCuisine when a button is clicked", async () => {
    const wrapper = shallowMount(CuisinesList, {
      propsData: defaultProps,
    });

    const italianButton = wrapper
      .findAll("button.btn")
      .wrappers.find((button) => button.text() === "Italian");
    await italianButton.trigger("click");

    expect(filterByCuisineMock).toHaveBeenCalledWith("Italian");
  });

  it("does not apply 'selected' class to unselected cuisines", () => {
    const wrapper = shallowMount(CuisinesList, {
      propsData: defaultProps,
    });

    const italianButton = wrapper.findAll("button.btn").at(1);
    expect(italianButton.classes()).not.toContain("selected");
  });
});
