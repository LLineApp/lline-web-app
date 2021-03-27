import Vue from "vue";
import Router from "vue-router";

import HomePage from "../home/HomePage";
import LoginPage from "../login/LoginPage";
import RegisterPage from "../register/RegisterPage";
import ProfileDataSheet from "../profile/ProfileDataSheet";
import Profile from "../profile/Profile";
import Portfolio from "../advisor/Portfolio";
import Prospect from "../advisor/Prospect";

Vue.use(Router);

export const router = new Router({
  mode: "history",
  routes: [
    { path: "/", component: HomePage },
    { path: "/login", component: LoginPage },
    { path: "/register", component: RegisterPage },
    { path: "/profile", component: ProfileDataSheet },
    { path: "/new", component: Profile, props: { filledByAdvisor: true } },
    { path: "/portfolio", component: Portfolio },
    { path: "/prospect", component: Prospect },

    { path: "*", redirect: "/" },
  ],
});

router.beforeEach((to, from, next) => {
  const publicPages = ["/login", "/register"];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem("user");

  if (authRequired && !loggedIn) {
    return next("/login");
  }
  next();
});
