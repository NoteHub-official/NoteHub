import http from "@/includes/http";
import { uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage, ref } from "@/includes/firebase";

export default {
  state: {
    communities: [],
    communitiesInitialized: false,
  },
  getters: {
    communities: (state) => {
      return state.communities;
    },
    communitiesInitialized: (state) => {
      return state.communitiesInitialized;
    },
  },
  mutations: {
    setCommunities: (state, communities) => {
      state.communities = communities;
    },
    initCommunitiesCompleted: (state) => {
      state.communitiesInitialized = true;
    },
  },
  actions: {
    async initCommunityState({ commit, rootGetters, state }) {
      state.communitiesInitialized = false;
      try {
        const token = await rootGetters.rootIdToken;
        const requestHeader = {
          headers: { authorization: `Bearer ${token}` },
        };
        const { data: communities } = await http.get(
          "community/get-all-communities/",
          requestHeader
        );
        commit("setCommunities", communities);
      } catch (e) {
        console.log(e.message);
      }
      commit("initCommunitiesCompleted");
    },
    async createCommunityByUser({ rootGetters, state }, payload) {
      const { name, description, photoFile } = payload;
      const token = await rootGetters.rootIdToken;
      const currentUser = rootGetters.rootUser;
      const requestHeader = {
        headers: { authorization: `Bearer ${token}` },
      };
      const storageRef = ref(storage);
      const fileName = `${Math.floor(Date.now() / 1000)}-${photoFile.name}`;
      const communityPhotoRef = ref(storageRef, `community_photos/${fileName}`);
      const task = uploadBytesResumable(communityPhotoRef, photoFile);
      task.on(
        "state_changed",
        (snapshot) => {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(progress);
        },
        (error) => {
          console.log(error);
        },
        async () => {
          const photo = await getDownloadURL(task.snapshot.ref);
          const community = {
            name,
            description,
            photo,
          };
          const res = await http.post("community/insert-community", community, requestHeader);
          state.communities.push({
            ...res.data,
            owner: {
              userId: currentUser.userId,
              firstName: currentUser.firstname,
              lastName: currentUser.lastname,
              subtitle: currentUser.subtitle,
              email: currentUser.email,
              avatarUrl: currentUser.avatarUrl,
            },
          });
        }
      );
    },
    /* eslint-disable */
    async leaveCommunityById({ commit, state, rootGetters }, payload) {
      const { communityId, userId } = payload;
      const token = await rootGetters.rootIdToken;
      const requestHeader = {
        headers: { authorization: `Bearer ${token}` },
      };
      const data = { communityId, userId };
      await http.post("community/delete-membership/", data, requestHeader);
      state.communities = state.communities.filter(
        (community) => community.communityId !== communityId
      );
    },
  },
};
