import Vue from "vue";
import Vuex from "vuex";
import modules from "./modules";
import http from "@/includes/http";

Vue.use(Vuex);

export default new Vuex.Store({
  modules,
  // globally defined states (theme, snackbar)
  state: {
    darkTheme: localStorage.getItem("darkTheme") || false,
    snackbarShow: false,
    snackbarMessage: "",
    snackbarColor: "",
    workspaceLeftDrawer: localStorage.getItem("workspaceLeftDrawer") || undefined,
    workspaceRightDrawer: localStorage.getItem("workspaceRightDrawer") || undefined,
  },
  getters: {
    rootUser: (state) => {
      return state.auth.currentUser;
    },
    rootIdToken: async (state) => {
      return await state.auth.currentUser.user.getIdToken();
    },
    workspaceLeftDrawer: (state) => {
      return state.workspaceLeftDrawer;
    },
    workspaceRightDrawer: (state) => {
      return state.workspaceRightDrawer;
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
    setWorkspaceLeftDrawer: (state, idx) => {
      console.log(idx);
      localStorage.setItem("workspaceLeftDrawer", idx);
    },
    setWorkspaceRightDrawer: (state, idx) => {
      console.log(idx);
      localStorage.setItem("workspaceRightDrawer", idx);
    },
  },
  actions: {
    rootStateReset({ commit }) {
      commit("resetNotes", null, { root: true });
      commit("resetCommunities", null, { root: true });
      commit("resetCommunityNotes", null, { root: true });
    },
    async searchUserByKeyword({ rootGetters }, keyword) {
      const token = await rootGetters.rootIdToken;
      const requestHeader = {
        headers: { authorization: `Bearer ${token}` },
      };
      const res = await http.post("user/search-user-by-keyword", { keyword }, requestHeader);
      return res.data;
    },
  },
});
