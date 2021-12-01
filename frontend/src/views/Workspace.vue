<template>
  <v-container fluid style="max-width: 1400px; min-width: 400px">
    <NotexEditor :noteId="noteId" v-if="noteId !== null" :key="noteId" />
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import NotexEditor from "@/notex-editor/NotexEditor.vue";

export default {
  name: "Workspace",
  components: {
    NotexEditor,
  },
  data() {
    return {
      noteId: `${this.$route.params.id}`,
    };
  },
  methods: {
    ...mapActions(["initNoteState", "getWorkspaceNote", "getWorkspaceComments"]),
    async initWorkspace() {
      const id = `${this.$route.params.id}`;
      this.noteId = `${id}`;
      await this.getWorkspaceNote(id);
      await this.getWorkspaceComments(id);
      console.log(this.workspaceComments);
    },
  },
  computed: {
    ...mapGetters(["notesInitialized", "workspaceNote", "workspaceComments"]),
  },
  async created() {
    const { id } = this.$route.params;
    if (!this.notesInitialized) {
      await this.initNoteState(id);
    }
    await this.initWorkspace();
  },
  watch: {
    "$route.params.id": async function () {
      await this.initWorkspace();
    },
  },
};
</script>

<style></style>
