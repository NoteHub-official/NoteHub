import Vue from "vue";
import Vuex from "vuex";
import modules from "./modules";

Vue.use(Vuex);

export default new Vuex.Store({
  modules,
  state: {
    darkTheme: localStorage.getItem("darkTheme") || false,
  },
  mutations: {
    toggleTheme: (state) => {
      state.darkTheme = !state.darkTheme;
    },
  },
});
