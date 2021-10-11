import http from "@/includes/http";
/* eslint-disable */
import { doc, getDoc, addDoc, query, where, getDocs, setDoc, collection } from "firebase/firestore";
import { db } from "@/includes/firebase";

export default {
  state: {
    notes: [],
    sharedUsers: [],
    noteCategories: [],
    notesInitialized: false,
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
    notesInitialized: (state) => {
      return state.notesInitialized;
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
    initNotesCompleted: (state) => {
      state.notesInitialized = true;
    },
  },
  actions: {
    async initNoteState({ commit, rootGetters, state }) {
      state.notesInitialized = false;
      try {
        const token = await rootGetters.rootIdToken;
        const requestHeader = {
          headers: { authorization: `Bearer ${token}` },
        };
        const { data: sharedUsers } = await http.get("user/get-note-providers/", requestHeader);
        const { data: notes } = await http.get("note/get-user-notes/", requestHeader);
        const { data: categories } = await http.get("note//get-all-categories", requestHeader);
        console.log(notes);
        commit("setNotes", notes);
        commit("setSharedUsers", sharedUsers);
        commit("setNoteCategories", categories);
      } catch (e) {}
      commit("initNotesCompleted");
    },
    async createNoteByUser({ rootGetters, state }, payload) {
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
        const res = await http.post("note/insert-note", note, requestHeader);
        const user = rootGetters.rootUser;
        state.notes.push({
          ...res.data,
          owner: { ...user, firstName: user.firstname, lastName: user.lastname }, // well...
        });
      } catch (error) {
        console.log(error);
      }
    },
    async editNoteTitleById({ state, rootGetters }, payload) {
      const { noteId, newNoteTitle } = payload;
      console.log(noteId, newNoteTitle);
      const token = await rootGetters.rootIdToken;
      const requestHeader = {
        headers: { authorization: `Bearer ${token}` },
      };
      const data = { noteTitle: newNoteTitle, noteId: noteId };
      const { data: editedNote } = await http.post("note/update-note/", data, requestHeader);
      state.notes = state.notes.map((note) =>
        note.noteId === editedNote.noteId ? { ...note, noteTitle: editedNote.noteTitle } : note
      );
    },
    async deleteNoteAccessById({ rootGetters, state }, payload) {
      const { noteId, newOwnerId } = payload;
      const token = await rootGetters.rootIdToken;
      const requestHeader = {
        headers: { authorization: `Bearer ${token}` },
      };
      const data = { noteId };
      if (newOwnerId != null) data.newOwnerId = newOwnerId;

      await http.post("note/transfer-note-ownership/", data, requestHeader);
      state.notes = state.notes.filter((note) => note.noteId != noteId);
    },
  },
};
