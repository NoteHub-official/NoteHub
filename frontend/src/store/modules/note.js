// import http from "@/includes/http";
import { notes, sharedUsers } from "@/includes/fake_data.js";

export default {
  state: {
    notes: [],
    sharedUsers: [],
  },
  getters: {
    sharedUsers: (state) => {
      return state.sharedUsers;
    },
    notes: (state) => {
      return state.notes;
    },
  },
  mutations: {
    setNotes: (state, notes) => {
      state.notes = notes;
    },
    setSharedUsers: (state, sharedUsers) => {
      state.sharedUsers = sharedUsers;
    },
  },
  actions: {
    initNoteState({ commit }) {
      commit("setNotes", notes);
      commit("setSharedUsers", sharedUsers);
    },
  },
};
