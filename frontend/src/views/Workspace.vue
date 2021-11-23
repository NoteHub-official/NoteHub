<template>
  <v-container style="border: 2px solid green">
    <h1>workspace workspace workspace workspaceworkspaceworkspace</h1>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Workspace",
  methods: {
    ...mapActions(["initNoteState"]),
  },
  async created() {
    const { id } = this.$route.params;
    if (!this.notesInitialized) await this.initNoteState(id);
  },
  computed: {
    ...mapGetters(["notesInitialized", "notes"]),
  },
};
</script>

<style></style>
