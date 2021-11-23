/* eslint-disable */
import http from "@/includes/http";

export default {
  state: {
    note: null,
  },
  getters: {
    workspaceNote: (state) => {
      return state.note;
    },
  },
  mutations: {
    updateWorkspaceNote(state, note) {
      state.note = note;
    },
  },
};
