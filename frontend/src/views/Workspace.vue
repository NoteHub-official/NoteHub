<template>
  <v-container fluid style="max-width: 1400px; min-width: 500px">
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
    ...mapActions(["initNoteState"]),
  },
  computed: {
    ...mapGetters(["notesInitialized"]),
  },
  async created() {
    const { id } = this.$route.params;
    if (!this.notesInitialized) {
      await this.initNoteState(id);
    }
  },
  watch: {
    "$route.params.id": function (id) {
      this.noteId = `${id}`;
    },
  },
};
</script>

<style></style>
