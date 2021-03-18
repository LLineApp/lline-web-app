import Vue from "vue";
import VeeValidate from "vee-validate";
import { store } from "./_store";
import { router } from "./_helpers";
import App from "./app/App";
import VueApollo from "vue-apollo";
import Toasted from "vue-toasted";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
//  import 'bootstrap/dist/css/bootstrap.css';
// import 'bootstrap-vue/dist/bootstrap-vue.css';
import { connectToBackend, authURI, profileURI } from "../datasource/backendConnect";

Vue.config.productionTip = false;

Vue.use(VeeValidate);
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

new Vue({
  el: "#app",
  router,
  store,
  apolloProvider,
  render: (h) => h(App),
});
