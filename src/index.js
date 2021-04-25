import Vue from "vue";
import VueCookies from "vue-cookies";
import VueHtmlToPaper from "vue-html-to-paper";
import VeeValidate from "vee-validate";
import { store } from "./_store";
import { router } from "./_helpers";
import App from "./app/App";
import VueApollo from "vue-apollo";
import Toasted from "vue-toasted";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
//  import 'bootstrap/dist/css/bootstrap.css';
// import 'bootstrap-vue/dist/bootstrap-vue.css';
import {
  connectToBackend,
  authURI,
  profileURI,
} from "../datasource/backendConnect";

Vue.config.productionTip = false;

Vue.use(VeeValidate, {
  inject: true,
  fieldsBagName: "veeFields",
});
Vue.use(VueApollo);
Vue.use(Toasted);
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

const apolloProvider = new VueApollo({
  clients: {
    authClient: connectToBackend(authURI),
    profileClient: connectToBackend(profileURI),
  },
  defaultClient: connectToBackend(authURI),
});

const options = {
  name: "_blank",
  specs: ["fullscreen=yes", "titlebar=no", "scrollbars=no"],
  styles: [
    "https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css",
    "https://unpkg.com/kidlat-css/css/kidlat.css",
  ],
};

Vue.use(VueHtmlToPaper, options);
Vue.use(VueCookies);

new Vue({
  el: "#app",
  router,
  store,
  apolloProvider,
  render: (h) => h(App),
});
