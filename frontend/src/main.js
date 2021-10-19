import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import axios from "axios";
import { auth } from "./includes/firebase.js";
import ProgressBar from "./includes/progressbar.js";
import "nprogress/nprogress.css";
import MathField from "mathlive";

Vue.prototype.$axios = axios;
Vue.config.productionTip = false;

ProgressBar(router);

let app;

auth.onAuthStateChanged(async () => {
  await store.dispatch("initialLogin"); // important to be sync!
  if (!app) {
    app = new Vue({
      router,
      store,
      vuetify,
      MathField,
      render: (h) => h(App),
    }).$mount("#app");
  }
});

/* MathLive 0.69.7  */
