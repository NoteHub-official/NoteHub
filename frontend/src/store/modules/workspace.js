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
  actions: {
    async getWorkspaceNote({ commit, rootGetters }, id) {
      try {
        const token = await rootGetters.rootIdToken;
        const requestHeader = {
          headers: { authorization: `Bearer ${token}` },
        };
        const response = await http.post(
          `note/get-note-by-noteId/`,
          { noteId: parseInt(id) },
          requestHeader
        );
        commit("updateWorkspaceNote", response.data);
      } catch (e) {
        console.log(e);
      }
    },
  },
};
