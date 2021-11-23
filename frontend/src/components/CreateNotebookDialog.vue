<template>
  <v-dialog :value="createNotebookDialog" @input="toggleDialog()" :width="550">
    <v-card :loading="loading">
      <v-card-title class="text-h6 info--text">
        {{ loading ? "Creating..." : " Create a New Notebook" }}
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text class="pt-3 pb-2">
        <v-form ref="createNotebookForm">
          <v-text-field
            class="mt-3"
            outlined
            dense
            label="Notebook Title"
            placeholder="Untitled notebook ..."
            v-model="noteTitle"
            append-icon="drive_file_rename_outline"
            :rules="[(noteTitle && noteTitle.length > 0) || 'Note title must be non-empty']"
            :disabled="loading"
          >
          </v-text-field>
          <v-autocomplete
            class="mt-1"
            outlined
            v-model="selectedNoteCategories"
            :items="noteCategories"
            label="Note Categories"
            multiple
            hint="Choose categories that best describe your notebook"
            persistent-hint
            :rules="[(v) => (v && v.length > 0) || 'You must choose at least 1 category']"
            :disabled="loading"
          >
            <template v-slot:selection="data">
              <v-chip
                class="primary font-weight-bold"
                v-bind="data.attrs"
                :input-value="data.selected"
                close
                @click:close="removeCategories(data.item)"
                small
                color="white"
              >
                {{ data.item }}
              </v-chip>
            </template>
          </v-autocomplete>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" text @click="createNotebook()" :disabled="loading"> Create </v-btn>
        <v-btn color="error" text @click="reset()" :disabled="loading"> Cancel </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";

export default {
  name: "CreateNotebookDialog",
  props: {
    createNotebookDialog: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      noteTitle: "",
      selectedNoteCategories: [],
      loading: false,
    };
  },
  methods: {
    ...mapActions(["createNoteByUser"]),
    ...mapMutations(["snackbarSuccess"]),
    removeCategories(item) {
      this.selectedNoteCategories.splice(this.selectedNoteCategories.indexOf(item), 1);
    },
    async createNotebook() {
      if (!this.$refs.createNotebookForm.validate()) return;
      this.loading = true;
      const payload = {
        noteTitle: this.noteTitle,
        userId: this.currentUser.userId,
        accessStatus: "owner",
        categories: this.selectedNoteCategories,
      };
      await this.createNoteByUser(payload);
      setTimeout(() => {
        this.reset();
        this.snackbarSuccess("New notebook has been created!");
        this.$refs.createNotebookForm.reset();
      }, 1000);
    },
    reset() {
      this.toggleDialog();
      this.noteTitle = "";
      this.selectedNoteCategories = [];
      this.loading = false;
    },
    toggleDialog() {
      this.$emit("update:createNotebookDialog", !this.createNotebookDialog);
    },
  },
  computed: {
    ...mapGetters(["currentUser", "noteCategories"]),
  },
};
</script>

<style></style>
