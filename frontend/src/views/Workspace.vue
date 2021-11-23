<template>
  <v-container fluid style="max-width: 1400px">
    <NotexEditor :noteId="$route.params.id" />
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
  methods: {
    ...mapActions(["initNoteState"]),
  },
  computed: {
    ...mapGetters(["notesInitialized"]),
  },
  async created() {
    const { id } = this.$route.params;
    if (!this.notesInitialized) await this.initNoteState(id);
  },
};
</script>

<style></style>
