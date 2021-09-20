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
    toggleAuth: (state) => {
      state.isAuthenticated = !state.isAuthenticated;
    },
    setUser: (state, user) => {
      state.currentUser = user;
    },
  },
  actions: {
    async signup({ commit }, payload) {
      const { email, password } = payload;
      const user = await createUserWithEmailAndPassword(getAuth(), email, password);
      commit("toggleAuth");

      return user;
    },
    async login({ commit }, payload) {
      const { email, password } = payload;
      const user = await signInWithEmailAndPassword(getAuth(), email, password);
      commit("toggleAuth", user);

      return user;
    },
    async logout({ commit }, { router, route }) {
      await signOut(getAuth());
      commit("toggleAuth");
      if (route.meta.requiresAuth) {
        router.push({ name: "home" });
      }
    },
  },
};
