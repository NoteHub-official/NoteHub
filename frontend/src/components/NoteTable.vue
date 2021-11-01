<template>
  <div>
    <v-text-field
      dense
      outlined
      v-model="searchContent"
      label="Search"
      class="pa-3"
      append-icon="search"
      hide-details
    ></v-text-field>
    <v-data-table
      class="card"
      :value="selectedNotes"
      @input="changeSelectedNotes($event)"
      :headers="headers"
      :items="ownedNotes"
      item-key="noteId"
      show-select
      :search="searchContent"
    >
      <template v-slot:item.createdAt="{ item }"> {{ unixTimeToDate(item.createdAt) }} </template>
    </v-data-table>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { unixTimeToDate } from "@/includes/utils";

export default {
  props: {
    selectedNotes: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      searchContent: "",
      headers: [
        {
          text: "Title",
          align: "start",
          sortable: false,
          value: "noteTitle",
        },
        {
          text: "Created At",
          align: "center",
          value: "createdAt",
        },
        { text: "likeCount", align: "center", value: "likeCount" },
        { text: "viewCount", align: "center", value: "viewCount" },
        { text: "commentCount", align: "center", value: "commentCount" },
      ],
    };
  },
  computed: {
    ...mapGetters(["notes", "notesInitialized", "currentUser", "communityNotes"]),
    ownedNotes() {
      return this.notes
        .filter((note) => note.ownerId === this.currentUser.userId)
        .filter((note) => !this.imported(note));
    },
  },
  methods: {
    ...mapActions(["initNoteState"]),
    unixTimeToDate,
    changeSelectedNotes(selectedNotes) {
      this.$emit("select-note", selectedNotes);
    },
    imported(note) {
      // check note.id not in communityNotes
      return this.communityNotes.some((communityNote) => communityNote.noteId === note.noteId);
    },
  },
  async created() {
    if (!this.notesInitialized) {
      await this.initNoteState();
    }
    console.log(this.currentUser);
  },
};
</script>

<style></style>
