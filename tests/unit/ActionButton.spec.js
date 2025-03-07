import { shallowMount } from "@vue/test-utils";
import ActionButton from "@/components/buttons/ActionButton/ActionButton.vue";

describe("ActionButton.vue", () => {
  it("renders a button with default props", () => {
    const wrapper = shallowMount(ActionButton);
    expect(wrapper.classes()).toContain("btn");
    expect(wrapper.classes()).toContain("simple-button");
    expect(wrapper.classes()).toContain("contained");
  });

  it("renders with the correct variant class", () => {
    const wrapper = shallowMount(ActionButton, {
      propsData: { variant: "text" },
    });
    expect(wrapper.classes()).toContain("text");
  });

  it("displays the correct buttonText", () => {
    const buttonText = "Click Me";
    const wrapper = shallowMount(ActionButton, {
      propsData: { buttonText },
    });
    expect(wrapper.text()).toBe(buttonText);
  });

  it("emits click event when button is clicked", async () => {
    const onClick = jest.fn();
    const wrapper = shallowMount(ActionButton, {
      propsData: { onClick },
    });
    await wrapper.trigger("click");
    expect(onClick).toHaveBeenCalled();
  });
});
