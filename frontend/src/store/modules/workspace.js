/* eslint-disable */
import http from "@/includes/http";

export default {
  state: {
    note: null,
    comments: [],
  },
  getters: {
    workspaceNote: (state) => {
      return state.note;
    },
    workspaceComments: (state) => {
      return state.comments;
    },
  },
  mutations: {
    updateWorkspaceNote(state, note) {
      state.note = note;
    },
    updateWorkspaceComments(state, comments) {
      state.comments = comments;
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
    async getWorkspaceComments({ commit, rootGetters }, id) {
      try {
        const token = await rootGetters.rootIdToken;
        const requestHeader = {
          headers: { authorization: `Bearer ${token}` },
        };
        const response = await http.post(
          `note/get-comments-by-noteId/`,
          { noteId: parseInt(id) },
          requestHeader
        );
        console.log(response.data);
        commit("updateWorkspaceComments", response.data);
      } catch (e) {
        console.log(e);
      }
    },
    async addCommentById({ rootGetters }, data) {
      const token = await rootGetters.rootIdToken;
      const requestHeader = {
        headers: { authorization: `Bearer ${token}` },
      };
      const response = await http.post(`note/${data.noteId}/insert-comment`, data, requestHeader);
      console.log(response.data);
    },
    async updateCommentContentById({ rootGetters }, data) {
      const token = await rootGetters.rootIdToken;
      const requestHeader = {
        headers: { authorization: `Bearer ${token}` },
      };
      const response = await http.post(`note/update-comment-content`, data, requestHeader);
      console.log(response.data);
    },
  },
};
