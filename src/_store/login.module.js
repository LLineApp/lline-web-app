const state = {
    login: {
      token: "",
      cpf:"",
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
    
  export const loginData = {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
  };
