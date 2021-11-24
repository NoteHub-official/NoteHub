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
    resetNotes: (state) => {
      state.notesInitialized = false;
      state.sharedUsers = [];
      state.notes = [];
      state.noteCategories = [];
    },
    updateNoteSharedUsers: (state, noteId, sharedUsers) => {
      state.notes = notes.map((note) => {
        if (note.noteId === noteId) {
          return { ...note, sharedUsers };
        }
        return note;
      });
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
        const { data: categories } = await http.get("note/get-all-categories", requestHeader);
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
          sharedUsers: [],
        });
      } catch (error) {
        console.log(error);
      }
    },
    async editNoteTitleById({ state, rootGetters }, payload) {
      const { noteId, newNoteTitle } = payload;
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
    async deleteSharedUserById({ rootGetters }, payload) {
      const { noteId, userId } = payload;
      const token = await rootGetters.rootIdToken;
      const requestHeader = {
        headers: { authorization: `Bearer ${token}` },
      };
      await http.post(
        "note/alter-note-access/",
        { noteId, userId, command: "DELETE" },
        requestHeader
      );
    },
    async changeNoteAccessStatus({ rootGetters }, payload) {
      const { noteId, userId, accessStatus } = payload;
      const token = await rootGetters.rootIdToken;
      const requestHeader = {
        headers: { authorization: `Bearer ${token}` },
      };
      await http.post(
        "note/alter-note-access/",
        { noteId, userId, accessStatus, command: "UPDATE" },
        requestHeader
      );
    },
    async shareNoteByUserId({ rootGetters }, payload) {
      const { noteId, userIds } = payload;
      const token = await rootGetters.rootIdToken;
      const requestHeader = {
        headers: { authorization: `Bearer ${token}` },
      };
      return await http.post(
        "note/alter-note-access/",
        { noteId, userIds, command: "INSERT" },
        requestHeader
      );
    },
  },
};
