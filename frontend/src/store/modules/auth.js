import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

export default {
  state: {
    isAuthenticated: false,
    currentUser: null,
  },
  getters: {
    currentUser: (state) => {
      return state.currentUser;
    },
  },
  mutations: {
    toggleAuth: (state, isAuthenticated) => {
      state.isAuthenticated = isAuthenticated;
    },
    setUser: (state, user) => {
      state.currentUser = user;
    },
  },
  actions: {
    async signup({ commit }, payload) {
      const { email, password } = payload;
      const user = await createUserWithEmailAndPassword(getAuth(), email, password);
      commit("toggleAuth", true);

      return user;
    },
    async login({ commit }, payload) {
      const { email, password } = payload;
      const user = await signInWithEmailAndPassword(getAuth(), email, password);
      commit("toggleAuth", true);

      return user;
    },
    async logout({ commit }, { router, route }) {
      await signOut(getAuth());
      commit("toggleAuth", false);
      console.log(route);
      if (route.meta.requireAuth) {
        router.push({ name: "auth" });
      }
    },
    initialLogin({ commit }) {
      const user = getAuth().currentUser;
      if (user) {
        commit("toggleAuth", true);
        commit("setUser", user);
      }
    },
  },
};
