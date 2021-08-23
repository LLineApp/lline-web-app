import Vue from "vue";
import Router from "vue-router";

import HomePage from "../home/HomePage";
import LoginPage from "../login/LoginPage";
import RegisterPage from "../register/RegisterPage";
import ProfileDataSheet from "../profile/ProfileDataSheet";
import Client from "../profile/Client";
import Portfolio from "../advisor/Portfolio";
import AdvisorPortfolio from "../advisor/AdvisorPortfolio";
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
    { path: "/advisorPortfolio", component: AdvisorPortfolio },
    { path: "/prospect", component: Prospect },
    { path: "/targets", component: Targets },

    { path: "*", redirect: "/" },
  ],
});

router.beforeEach((to, from, next) => {
  const publicPages = ["/login", "/register"];
  if (!publicPages.includes(to.path) && !store.state.loginData.login.token) {
    return next("/login");
  }
  const managerExclusivePages = ["/advisorPortfolio"]
  if (managerExclusivePages.includes(to.path) && !(store.state.profileData.data.level == 2)) {
    next("/");
  }
  const advisorExclusivePages = ["/portfolio", "/prospect"]
  if (advisorExclusivePages.includes(to.path) && !store.state.profileData.data.isAdvisor) {
    next("/");
  }
  next();
});
