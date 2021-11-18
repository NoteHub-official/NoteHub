<template>
  <div>
    <v-container class="trans main-container">
      <div>
        <h1 class="info--text font-weight-regular">Dashboard</h1>
        <v-divider></v-divider>
        <CommunityGroup class="mt-3" />
        <NotebookGrid class="mt-4" />
      </div>
    </v-container>
    <div :class="{ 'action-button-container': $vuetify.breakpoint.xs }">
      <v-speed-dial
        :fixed="!$vuetify.breakpoint.xs"
        v-model="fab"
        :bottom="true"
        :right="true"
        :direction="'top'"
        :transition="'slide-y-reverse-transition'"
        :open-on-hover="true"
      >
        <template v-slot:activator>
          <v-btn v-model="fab" color="primary" dark fab large>
            <v-icon large>
              {{ fab ? "close" : "add" }}
            </v-icon>
          </v-btn>
        </template>
        <v-tooltip left transition="all 0.2s">
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              fab
              dark
              color="orange"
              v-bind="attrs"
              v-on="on"
              :size="actionSize"
              @click.stop="createNotebookDialog = true"
            >
              <v-icon>edit_note</v-icon>
            </v-btn>
          </template>
          <span>Create New Notebook</span>
        </v-tooltip>
        <v-tooltip left transition="all 0.2s">
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              fab
              dark
              color="red"
              v-bind="attrs"
              v-on="on"
              :size="actionSize"
              @click.stop="createCommunityDialog = true"
            >
              <v-icon>group_add</v-icon>
            </v-btn>
          </template>
          <span>Create New Community</span>
        </v-tooltip>
      </v-speed-dial>
    </div>
    <!-- Create Notebook Dialog -->
    <v-dialog v-model="createNotebookDialog" :width="550">
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
    <!-- Create Community Dialog -->
    <v-dialog v-model="createCommunityDialog" :width="550">
      <v-card :loading="loading">
        <v-card-title class="text-h6 info--text">
          {{ loading ? "Creating..." : "Create a New Community" }}
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text class="pb-0">
          <v-form ref="createCommunityForm">
            <v-text-field
              class="mt-7"
              outlined
              dense
              label="Community Name"
              placeholder="Awsome community ..."
              v-model="communityName"
              append-icon="drive_file_rename_outline"
              :rules="[
                (communityName && communityName.length > 0) || 'Community name must be non-empty',
              ]"
              :disabled="loading"
            >
            </v-text-field>
            <v-textarea
              class="mt-2 mb-1"
              outlined
              counter
              name="input-7-4"
              label="Community Description"
              v-model="communityDescription"
              :rules="[
                (v) => (v && v.length <= 300) || 'Max 300 characters',
                (v) => (v && v.length > 0) || 'Description must be non-empty',
              ]"
              :disabled="loading"
            ></v-textarea>
            <ImageUpload
              :height="280"
              :uploadedImage.sync="uploadedImage"
              :rules="[(v) => (v && v !== null) || 'Image must not be empty']"
              :disabled="loading"
            />
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="createCommunity()" :disabled="loading">
            Create
          </v-btn>
          <v-btn color="error" text @click="reset()" :disabled="loading"> Cancel </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import CommunityGroup from "@/components/CommunityGroup.vue";
import NotebookGrid from "@/components/NotebookGrid.vue";
import ImageUpload from "@/components/ImageUpload.vue";
import { mapActions, mapGetters, mapMutations } from "vuex";

export default {
  name: "Dashboard",
  components: { CommunityGroup, NotebookGrid, ImageUpload },
  data() {
    return {
      actionSize: 40,
      fab: false,
      createNotebookDialog: false,
      createCommunityDialog: false,
      noteTitle: "",
      communityName: "",
      communityDescription: "",
      uploadedImage: null,
      loading: false,
      selectedNoteCategories: [],
      categories: [],
    };
  },
  methods: {
    ...mapActions(["createCommunityByUser", "createNoteByUser"]),
    ...mapMutations(["snackbarSuccess"]),
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
    async createCommunity() {
      if (!this.$refs.createCommunityForm.validate()) return;
      this.loading = true;
      const payload = {
        name: this.communityName,
        description: this.communityDescription,
        photoFile: this.uploadedImage,
        ownerId: this.currentUser.userId,
      };
      await this.createCommunityByUser(payload);
      setTimeout(() => {
        this.reset();
        this.snackbarSuccess("New community has been created!");
        this.$refs.createCommunityForm.reset();
      }, 1000);
    },
    removeCategories(item) {
      this.selectedNoteCategories.splice(this.selectedNoteCategories.indexOf(item), 1);
    },
    reset() {
      this.createNotebookDialog = false;
      this.createCommunityDialog = false;
      this.noteTitle = "";
      this.communityName = "";
      this.communityDescription = "";
      this.selectedNoteCategories = [];
      this.uploadedImage = null;
      this.loading = false;
    },
  },
  computed: {
    ...mapGetters(["currentUser", "noteCategories"]),
  },
};
</script>

<style>
.test {
  position: fixed;
}
.main-container {
  max-width: 1150px;
}
.special-text {
  font-family: "Open Sans", sans-serif !important;
  font-size: 1.7rem !important;
  font-weight: 500;
}

.trans {
  transition: all 0.3s linear;
}

/* This is for documentation purposes and will not be needed in your application */
.action-button-container {
  position: fixed;
  bottom: 0;
  right: 0;
  width: 70px;
  height: 125px;
}
</style>
