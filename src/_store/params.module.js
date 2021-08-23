const state = {
    params: {
      suitability: [],
    },
  };
  
  const mutations = {
    updateParamsData(state, payload) {
      Object.assign(state.params, payload.updates);
    },
  };
  
  const actions = {
    updateParamsData({ commit }, payload) {
      commit("updateParamsData", payload);
    },
  };
  
  const getters = {
    paramsData: (state) => {
      return state.params;
    },
  };
    
  export const paramsData = {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
  };
