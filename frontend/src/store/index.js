import Vue from "vue";
import Vuex from "vuex";
import modules from "./modules";

Vue.use(Vuex);

export default new Vuex.Store({
  modules,
  // globally defined states (theme, snackbar)
  state: {
    darkTheme: localStorage.getItem("darkTheme") || false,
    snackbarShow: false,
    snackbarMessage: "",
    snackbarColor: "",
  },
  getters: {
    rootUser: (state) => {
      return state.auth.currentUser;
    },
    rootIdToken: async (state) => {
      return await state.auth.currentUser.user.getIdToken();
    },
  },
  mutations: {
    toggleTheme: (state) => {
      state.darkTheme = !state.darkTheme;
    },
    snackbarInfo: (state, message) => {
      state.snackbarMessage = message;
      state.snackbarColor = "primary";
      state.snackbarShow = true;
    },
    snackbarSuccess: (state, message) => {
      state.snackbarMessage = message;
      state.snackbarColor = "success";
      state.snackbarShow = true;
    },
    snackbarError: (state, message) => {
      state.snackbarMessage = message;
      state.snackbarColor = "error";
      state.snackbarShow = true;
    },
    setSnackbarShow: (state, show) => {
      state.snackbarShow = show;
    },
  },
});
