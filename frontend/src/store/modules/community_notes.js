import http from "@/includes/http";

export default {
  state: {
    communityNotes: [],
  },
  getters: {
    communityNotes: (state) => state.communityNotes,
  },
  mutations: {
    setCommunityNotes(state, communityNotes) {
      state.communityNotes = communityNotes;
    },
    resetCommunityNotes: (state) => (state.communityNotes = []),
  },
  actions: {
    async initCommunityNotes({ commit, rootGetters }, communityId) {
      const token = await rootGetters.rootIdToken;
      const requestHeader = {
        headers: { authorization: `Bearer ${token}` },
      };
      const res = await http.post("note/get-notes-by-communityId", { communityId }, requestHeader);
      commit("setCommunityNotes", res.data);
    },
    async importNotesByNoteId({ rootGetters }, { communityId, notes }) {
      const token = await rootGetters.rootIdToken;
      const requestHeader = {
        headers: { authorization: `Bearer ${token}` },
      };
      const data = { communityId, noteIds: notes.map((note) => note.noteId) };
      await http.post("community/add-note-to-community", data, requestHeader);
    },
  },
};
