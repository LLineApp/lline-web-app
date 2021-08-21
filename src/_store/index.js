import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import SecureLS from "secure-ls";

import { alert } from "./alert.module";
import { profileData } from "./profile.module";
import { advisorData } from "./advisor.module";
import { loginData } from "./login.module";
import { searchData } from "./search.module";
import { paramsData } from "./params.module";

const secret =
  process.env.NODE_ENV === "development"
    ? "This is a secret"
    : process.env.SECURE_LS_KEY;

const ls = new SecureLS({ isCompression: false, encryptionSecret: secret });

Vue.use(Vuex);

export const store = new Vuex.Store({
  modules: {
    alert,
    profileData,
    advisorData,
    loginData,
    searchData,
    paramsData,
  },
  plugins: [
    createPersistedState({
      paths:["profileData", "advisorData", "loginData", "paramsData"],
      storage: {
        getItem: (key) => ls.get(key),
        setItem: (key, value) => ls.set(key, value),
        removeItem: (key) => ls.remove(key),
      },
    }),
  ],
});
