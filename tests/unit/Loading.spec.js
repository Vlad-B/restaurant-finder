import { shallowMount } from "@vue/test-utils";
import Loading from "@/components/loading/Loading.vue";

describe("Loading.vue", () => {
  it("renders without crashing", () => {
    const wrapper = shallowMount(Loading);
    expect(wrapper.exists()).toBe(true);
  });
});
