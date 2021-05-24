import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from "vuex-persistedstate";
// import SecureLS from "secure-ls";

import { alert } from './alert.module';
import { account } from './account.module';
import { users } from './users.module';
import { profileData } from './profile.module';

// const ls = new SecureLS({ isCompression: false });

Vue.use(Vuex);

export const store = new Vuex.Store({
    modules: {
        alert,
        account,
        users,
        profileData,
    },
    plugins: [
        createPersistedState(
        //     {
        //   storage: {
        //     getItem: key => ls.get(key),
        //     setItem: (key, value) => ls.set(key, value),
        //     removeItem: key => ls.remove(key)
        //   }
        // }
        )
      ],
    });
