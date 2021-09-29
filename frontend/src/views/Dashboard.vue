<template>
  <div>
    <v-container class="trans main-container">
      <div class="d-flex flex-column">
        <h1 class="special-text text-h4 info--text mb-2">Dashboard</h1>
        <v-divider></v-divider>
        <CommunityGroup class="mt-4" />
        <NotebookGrid class="mt-4" />
      </div>
    </v-container>
    <v-speed-dial
      fixed
      v-model="fab"
      :bottom="true"
      :right="true"
      :direction="'top'"
      :transition="'slide-y-reverse-transition'"
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
    <!-- Create Notebook Dialog -->
    <v-dialog v-model="createNotebookDialog" max-width="430">
      <v-card>
        <v-card-title class="text-h6 info--text">
          Create a New Notebook
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
              hide-details="auto"
              :rules="[noteTitle.length > 0 || 'Note title must be non-empty']"
            >
            </v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="createNotebook()">
            Create
          </v-btn>
          <v-btn color="error" text @click="reset()">
            Cancel
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- Create Community Dialog -->
    <v-dialog v-model="createCommunityDialog" max-width="430">
      <v-card>
        <v-card-title class="text-h6 info--text">
          Create a New Community
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
              v-model="noteTitle"
              append-icon="drive_file_rename_outline"
              :rules="[noteTitle.length > 0 || 'Community name must be non-empty']"
            >
            </v-text-field>
            <v-textarea
              class="mt-1"
              outlined
              counter
              name="input-7-4"
              label="Community Description"
              v-model="communityDescription"
              :rules="[
                (v) => v.length <= 300 || 'Max 300 characters',
                (v) => v.length > 0 || 'Description must be non-empty',
              ]"
            ></v-textarea>
            <v-file-input
              v-model="file"
              accept="image/*"
              color="primary"
              label="Upload Cover Image"
              placeholder="Select your files"
              append-icon="mdi-paperclip"
              prepend-icon=""
              outlined
              :show-size="1000"
              :rules="[(v) => !!v || 'Cover image must be non-empty']"
            >
              <template v-slot:selection="{ index, text }">
                <v-chip color="green accent-4" dark label>
                  {{ text }}
                </v-chip>
              </template>
            </v-file-input>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="createCommunity()">
            Create
          </v-btn>
          <v-btn color="error" text @click="reset()">
            Cancel
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import CommunityGroup from "@/components/CommunityGroup.vue";
import NotebookGrid from "@/components/NotebookGrid.vue";

export default {
  name: "Dashboard",
  components: { CommunityGroup, NotebookGrid },
  data() {
    return {
      actionSize: 40,
      fab: false,
      createNotebookDialog: false,
      createCommunityDialog: false,
      noteTitle: "",
      communityDescription: "",
      file: null,
    };
  },
  methods: {
    createNotebook() {
      if (!this.$refs.createNotebookForm.validate()) return;
      this.createNotebookDialog = false;
    },
    createCommunity() {
      if (!this.$refs.createCommunityForm.validate()) return;
      this.createCommunityDialog = false;
    },
    reset() {
      this.createNotebookDialog = false;
      this.createCommunityDialog = false;
    },
  },
};
</script>

<style>
.test {
  position: fixed;
}
.main-container {
  max-width: 1300px;
}
.special-text {
  font-family: "Open Sans", sans-serif !important;
}

.trans {
  transition: all 0.3s linear;
}

/* This is for documentation purposes and will not be needed in your application */
.action-button-container {
  border: 1px solid red;
  position: fixed;
  bottom: 0;
  right: 0;
  width: 100px;
  height: 100px;
}
</style>
