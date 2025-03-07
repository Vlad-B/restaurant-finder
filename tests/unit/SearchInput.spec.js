import { shallowMount } from "@vue/test-utils";
import SearchInput from "@/components/inputs/SearchInput/SearchInput.vue";
import ActionButton from "@/components/buttons/ActionButton/ActionButton.vue";

describe("SearchInput.vue", () => {
  const defaultProps = {
    value: "test",
    placeholder: "Search here...",
    searchButtonText: "Click to search",
    onChange: jest.fn(),
    onSearch: jest.fn(),
  };

  it("renders correctly with default props", () => {
    const wrapper = shallowMount(SearchInput, {
      propsData: defaultProps,
    });

    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find("input").exists()).toBe(true);
    expect(wrapper.findComponent(ActionButton).exists()).toBe(true);
  });

  it("triggers onChange when input changes", async () => {
    const wrapper = shallowMount(SearchInput, {
      propsData: defaultProps,
    });

    const input = wrapper.find("input");
    await input.setValue("new value");

    expect(defaultProps.onChange).toHaveBeenCalled();
  });

  it("triggers onSearch when the button is clicked", async () => {
    const wrapper = shallowMount(SearchInput, {
      propsData: defaultProps,
    });

    const button = wrapper.findComponent(ActionButton);
    await button.trigger("click");

    expect(defaultProps.onSearch).toHaveBeenCalled();
  });
});
