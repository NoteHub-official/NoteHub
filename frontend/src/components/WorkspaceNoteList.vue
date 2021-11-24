<template>
  <v-list class="fill-height listBackground workspace-note-list" width="240">
    <WorkspaceHeadline icon="description" title="notebook" />
    <v-text-field
      v-model="search"
      class="pa-2 pr-2"
      outlined
      dense
      hide-details
      placeholder="notebook title..."
      label="search"
    >
      <template v-slot:append>
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-icon color="primary" style="cursor: pointer" v-on="on" v-bind="attrs"
              >filter_list</v-icon
            >
          </template>
          <span>Advanced Filtering</span>
        </v-tooltip>
      </template>
    </v-text-field>
    <div class="px-2 pb-3">
      <v-btn block color="primary text-capitalize" @click="createNotebookDialog = true">
        <v-icon left>add_circle_outline</v-icon>
        New Notebook
      </v-btn>
    </div>
    <v-divider></v-divider>
    <v-list>
      <v-list-item-group active-class="selected-workspace-note">
        <WorkspaceNoteItem v-for="note in filteredNotes" :key="note.dataId" :note="note" />
      </v-list-item-group>
    </v-list>
    <!-- Create Notebook Dialog -->
    <CreateNotebookDialog :createNotebookDialog.sync="createNotebookDialog" />
  </v-list>
</template>

<script>
/* eslint-disable */
import { mapActions, mapGetters } from "vuex";
import WorkspaceHeadline from "@/components/WorkspaceHeadline.vue";
import WorkspaceNoteItem from "@/components/WorkspaceNoteItem.vue";
import CreateNotebookDialog from "@/components/CreateNotebookDialog.vue";

export default {
  name: "WorkspaceNoteList",
  components: { WorkspaceHeadline, WorkspaceNoteItem, CreateNotebookDialog },
  data() {
    return {
      links: ["Home", "Contacts", "Settings"],
      createNotebookDialog: false,
      search: "",
    };
  },
  methods: {
    createNotebook() {},
  },
  computed: {
    ...mapGetters(["notes", "noteCategories"]),
    filteredNotes() {
      return this.notes.filter((note) => {
        return note.noteTitle.toLowerCase().includes(this.search.toLowerCase());
      });
    },
  },
};
</script>

<style>
.workspace-note-list::-webkit-scrollbar {
  display: none;
}
</style>
