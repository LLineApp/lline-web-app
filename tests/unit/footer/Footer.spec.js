import { shallowMount, createLocalVue } from "@vue/test-utils";
import Footer from "@/footer/Footer.vue";

describe("Mounted Footer", () => {
  const wrapper = shallowMount(Footer);

  test("is a Vue instance", () => {
    expect(wrapper.vm).toBeTruthy();
  });
});
