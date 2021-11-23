<template>
  <v-container fluid style="max-width: 1400px; min-width: 600px">
    <NotexEditor :noteId="`${$route.params.id}`" />
  </v-container>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from "vuex";
import NotexEditor from "@/notex-editor/NotexEditor.vue";

export default {
  name: "Workspace",
  components: {
    NotexEditor,
  },
  methods: {
    ...mapActions(["initNoteState"]),
    ...mapMutations(["updateWorkspaceNote"]),
  },
  computed: {
    ...mapGetters(["notesInitialized", "notes"]),
  },
  async created() {
    const { id } = this.$route.params;
    if (!this.notesInitialized) {
      await this.initNoteState(id);
    }
  },
};
</script>

<style></style>
