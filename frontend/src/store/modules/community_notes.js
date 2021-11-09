import http from "@/includes/http";

export default {
  state: {
    communityNotes: [],
    topRankingNotes: [],
  },
  getters: {
    communityNotes: (state) => state.communityNotes,
    topRankingNotes: (state) => {
      return state.topRankingNotes;
    },
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
      let res1 = await http.post("note/get-notes-by-communityId", { communityId }, requestHeader);
      commit("setCommunityNotes", res1.data);
      // let res2 = await http.post("community/get-top-10-notes", { communityId }, requestHeader);
    },
    async importNotesByNoteId({ rootGetters }, { communityId, notes }) {
      const token = await rootGetters.rootIdToken;
      const requestHeader = {
        headers: { authorization: `Bearer ${token}` },
      };
      const data = { communityId, noteIds: notes.map((note) => note.noteId) };
      await http.post("community/add-note-to-community", data, requestHeader);
    },
    /* eslint-disable */
    async removeNoteFromCommunityById({ commit, rootGetters }, noteId) {
      console.log("I love you");
    },
    async incrementLikeByNoteId({ rootGetters, state }, noteId) {
      const token = await rootGetters.rootIdToken;
      const requestHeader = {
        headers: { authorization: `Bearer ${token}` },
      };
      await http.get(`note/${noteId}/like-note`, requestHeader);
      state.communityNotes = state.communityNotes.map((note) => {
        if (note.noteId === noteId) note.likeCount++;
        return note;
      });
      state.topRankingNotes = state.topRankingNotes.map((note) => {
        if (note.noteId === noteId) note.likeCount++;
        return note;
      });
    },
    async getTopRankingNotes({ rootGetters, state }, communityId) {
      const token = await rootGetters.rootIdToken;
      const requestHeader = {
        headers: { authorization: `Bearer ${token}` },
      };
      const res = await http.post("community/get-top-10-notes/", { communityId }, requestHeader);
      console.log(res.data);
      state.topRankingNotes = res.data;
    },
  },
};
