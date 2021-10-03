import http from "@/includes/http";
/* eslint-disable */
import { doc, getDoc, addDoc, query, where, getDocs, setDoc, collection } from "firebase/firestore";
import { db } from "@/includes/firebase";

export default {
  state: {
    notes: [],
    sharedUsers: [],
    noteCategories: [],
  },
  getters: {
    sharedUsers: (state) => {
      return state.sharedUsers;
    },
    notes: (state) => {
      return state.notes;
    },
    noteCategories: (state) => {
      return state.noteCategories;
    },
  },
  mutations: {
    setNotes: (state, notes) => {
      state.notes = notes;
    },
    setSharedUsers: (state, sharedUsers) => {
      state.sharedUsers = sharedUsers;
    },
    setNoteCategories: (state, categories) => {
      state.noteCategories = categories;
    },
  },
  actions: {
    async initNoteState({ commit, rootGetters }) {
      const token = await rootGetters.rootIdToken;
      const requestHeader = {
        headers: { authorization: `Bearer ${token}` },
      };
      const { data: sharedUsers } = await http.get("user/get-note-providers/", requestHeader);
      const { data: notes } = await http.get("note/get-user-notes/", requestHeader);
      const { data: categories } = await http.get("note//get-all-categories", requestHeader);

      commit("setNotes", notes);
      commit("setSharedUsers", sharedUsers);
      commit("setNoteCategories", categories);
    },
    /* eslint-disable */
    async createNoteByUser({ commit, rootGetters }, payload) {
      const { noteTitle, userId, accessStatus, categories } = payload;
      const token = await rootGetters.rootIdToken;
      const requestHeader = {
        headers: { authorization: `Bearer ${token}` },
      };
      try {
        const noteCollection = collection(db, "notes");
        const noteRef = await addDoc(noteCollection, {
          data: {},
          accessingUsers: [],
          chats: [],
        });
        console.log(noteRef.id);
        // const docRef = doc(db, "notes", noteRef.id);
        // const docSnap = await getDoc(docRef);
        const note = {
          noteTitle: noteTitle,
          dataId: noteRef.id,
          categories: categories,
        };
        // ...
        const res = await http.post("note/insert-note", note, requestHeader);
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    },
    /* eslint-disable */
    async editNoteTitleById({ commit }, payload) {
      const { noteId, newNoteTitle } = payload;
      console.log(noteId, newNoteTitle);
      // ...
    },
    /* eslint-disable */
    async deleteNoteAccessById({ commit }, payload) {
      const { ownerId, noteId, newOwnerId } = payload;
      console.log(ownerId, noteId, newOwnerId);
      // ...
    },
  },
};
