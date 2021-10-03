// import http from "@/includes/http";
import { notes, sharedUsers, categories } from "@/includes/fake_data.js";
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
    initNoteState({ commit }) {
      commit("setNotes", notes);
      commit("setSharedUsers", sharedUsers);
      commit("setNoteCategories", categories);
      // ...
    },
    /* eslint-disable */
    async createNoteByUser({ commit }, payload) {
      const { noteTitle, userId, accessStatus, categories } = payload;
      console.log(noteTitle, userId, accessStatus);
      let note = {
        data: {},
        accessingUsers: [],
        chats: [],
      };
      try {
        const noteCollection = collection(db, "notes");
        const noteRef = await addDoc(noteCollection, note);
        console.log(noteRef.id);
        // const docRef = doc(db, "notes", noteRef.id);
        // const docSnap = await getDoc(docRef);
        note = {
          noteTitle: noteTitle,
          dataId: noteRef.id,
          userId: userId,
          accessStatus: "owner",
          categories: categories,
        };
        // ...
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
