import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import App from "@/app/App.vue";
import Router from "vue-router";

const localVue = createLocalVue();

localVue.use(Vuex);
localVue.use(Router);

describe("Mounted App", () => {
  const state = {
    login: {
      token: "",
      cpf: "",
    },
  };

  const mutations = {
    updateLoginData(state, payload) {
      Object.assign(state.login, payload.updates);
    },
  };

  const actions = {
    updateLoginData({ commit }, payload) {
      commit("updateLoginData", payload);
    },
  };

  const getters = {
    loginData: (state) => {
      return state.login;
    },
  };

  const store = new Vuex.Store({
    modules: {
      loginData: {
        namespaced: true,
        state,
        mutations,
        actions,
        getters,
      },
    },
  });

  const wrapper = shallowMount(App, { store, localVue });

  test("is a Vue instance", async () => {
    await expect(wrapper.vm).toBeTruthy();
  });
});
