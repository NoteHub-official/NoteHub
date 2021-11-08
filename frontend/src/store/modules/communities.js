import http from "@/includes/http";

export default {
  state: {
    searchResult: [],
  },
  getters: {
    searchResult(state) {
      return state.searchResult;
    },
  },
  actions: {
    async getSearchResult({ state, rootGetters }, inputVal) {
      if (inputVal != ""){
        try {
          const token = await rootGetters.rootIdToken;
          const requestHeader = {
            headers: { authorization: `Bearer ${token}` },
          };
          const res = await http.post(
            "community/search-community-by-name/",
            { name: inputVal },
            requestHeader
          );
          // res.data.sort((a,b) => a.name.localCompare(b.name))
          state.searchResult = res.data;
          console.log(state.searchResult);
        } catch (e) {
          console.log("there is an error: " + e);
        }
        
      }
      else{
        state.searchResult = []
      }
    },
  },
};
