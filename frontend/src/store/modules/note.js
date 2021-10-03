// import http from "@/includes/http";
import { notes, sharedUsers } from "@/includes/fake_data.js";
/* eslint-disable */
import { doc, getDoc, addDoc, query, where, getDocs, setDoc, collection } from "firebase/firestore";
import { db } from "@/includes/firebase";

export default {
  state: {
    notes: [],
    sharedUsers: [],
  },
  getters: {
    sharedUsers: (state) => {
      return state.sharedUsers;
    },
    notes: (state) => {
      return state.notes;
    },
  },
  mutations: {
    setNotes: (state, notes) => {
      state.notes = notes;
    },
    setSharedUsers: (state, sharedUsers) => {
      state.sharedUsers = sharedUsers;
    },
  },
  actions: {
    initNoteState({ commit }) {
      commit("setNotes", notes);
      commit("setSharedUsers", sharedUsers);
    },
    /* eslint-disable */
    async createNoteByUser({ commit }, payload) {
      const { noteTitle, userId, accessStatus } = payload;
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
          dataUrl: noteRef.id,
          userId: userId,
          accessStatus: "owner",
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
