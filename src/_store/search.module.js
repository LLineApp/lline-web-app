const state = {
  search: {
    filter: "",
    page: 1,
    totalRows: 1,
    items: [],
  },
};

const mutations = {
  updateSearchData(state, payload) {
    Object.assign(state.search, payload.updates);
  },
};

const actions = {
  updateSearchData({ commit }, payload) {
    commit("updateSearchData", payload);
  },
};

const getters = {
  searchData: (state) => {
    return state.search;
  },
};

export const searchData = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
