import Vue from "vue";
import Router from "vue-router";

import HomePage from "../home/HomePage";
import LoginPage from "../login/LoginPage";
import RegisterPage from "../register/RegisterPage";
import ProfileDataSheet from "../profile/ProfileDataSheet";
import Client from "../profile/Client";
import Portfolio from "../advisor/Portfolio";
import Prospect from "../advisor/Prospect";
import Targets from "../targets/Targets";
import { store } from "../_store/index";

Vue.use(Router);

export const router = new Router({
  mode: "history",
  routes: [
    { path: "/", component: HomePage },
    { path: "/login", component: LoginPage },
    { path: "/register", component: RegisterPage },
    { path: "/profile", component: ProfileDataSheet, name: "ProfileDataSheet" },
    { path: "/new", component: Client },
    { path: "/portfolio", component: Portfolio },
    { path: "/prospect", component: Prospect },
    { path: "/targets", component: Targets },

    { path: "*", redirect: "/" },
  ],
});

router.beforeEach((to, from, next) => {
  const publicPages = ["/login", "/register"];
  const authRequired = !publicPages.includes(to.path);
  if (authRequired && !store.state.loginData.login.token) {
    return next("/login");
  }
  next();
});
