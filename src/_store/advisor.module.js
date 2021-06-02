const state = {
  advisor: {
    link: "",
  },
};

const mutations = {
  updateAdvisorData(state, payload) {
    Object.assign(state.advisor, payload.updates);
  },
};

const actions = {
  updateAdvisorData({ commit }, payload) {
    commit("updateAdvisorData", payload);
  },
};

const getters = {
  advisorData: (state) => {
    return state.advisor;
  },
};

export const advisorData = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
