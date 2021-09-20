import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import axios from "axios";
import { initializeApp } from "firebase/app";

Vue.prototype.$axios = axios;
Vue.config.productionTip = false;

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCE8H066cgN969UuRrI02FxMYlwCK1TWQg",
  authDomain: "notehub-326303.firebaseapp.com",
  projectId: "notehub-326303",
  storageBucket: "notehub-326303.appspot.com",
  messagingSenderId: "121246877159",
  appId: "1:121246877159:web:70bf417836e3c18f2f2942",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
console.log(app);

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
