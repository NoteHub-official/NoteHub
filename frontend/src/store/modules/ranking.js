import http from "@/includes/http";

export default {
  state: {
    popularUser: [],
  },
  getters: {
    returnPopularUser(state) {
      return state.popularUser;
    },
  },
  actions: {
    async getPopularUser({ state, rootGetters }) {
        try {
          const token = await rootGetters.rootIdToken;
          const requestHeader = {
            headers: { authorization: `Bearer ${token}` },
          };
          const res = await http.get(
            "user/get-top-10-users/",
            requestHeader
          );
          state.popularUser = res.data;
          console.log(state.popularUser)
        } catch (e) {
          console.log("there is an error: " + e);
        }
    },
  },
};
