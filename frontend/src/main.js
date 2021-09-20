import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import axios from "axios";
import { initializeApp } from "firebase/app";
import firebaseConfig from "./includes/firebase.js";
import { getAuth } from "firebase/auth";
import ProgressBar from "./includes/progressbar.js";
import "nprogress/nprogress.css";

Vue.prototype.$axios = axios;
Vue.config.productionTip = false;

// Initialize Firebase
initializeApp(firebaseConfig);
const auth = getAuth();

let app;

auth.onAuthStateChanged((user) => {
  console.log(user);
  if (!app) {
    ProgressBar(router);
    app = new Vue({
      router,
      store,
      vuetify,
      render: (h) => h(App),
    }).$mount("#app");
  }
});
