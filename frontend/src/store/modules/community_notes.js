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
    async importNotesByNoteId({ commit, rootGetters, state }, { communityId, notes }) {
      const token = await rootGetters.rootIdToken;
      const requestHeader = {
        headers: { authorization: `Bearer ${token}` },
      };
      try {
        const res = await http.post(
          "community/add-note-to-community",
          { communityId, noteIds: notes.map((note) => note.noteId) },
          requestHeader
        );
        commit("setCommunityNotes", res.data);
      } catch (e) {
        console.log(e.message);
      }
    },
  },
};
