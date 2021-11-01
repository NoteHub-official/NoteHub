import http from "@/includes/http";
import { communityNotes } from "@/includes/fake_data";

export default {
  state: {
    communityNotes: [1, 2, 3],
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
      commit("setCommunityNotes", communityNotes);
    },
  },
};
