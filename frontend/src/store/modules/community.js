// import http from "@/includes/http";
import { communities } from "@/includes/fake_data.js";

export default {
  state: {
    communities: [],
  },
  getters: {
    communities: (state) => {
      return state.communities;
    },
  },

  mutations: {
    setCommunities: (state, communities) => {
      state.communities = communities;
    },
  },
  actions: {
    initCommunityState({ commit }) {
      commit("setCommunities", communities);
    },
  },
};
