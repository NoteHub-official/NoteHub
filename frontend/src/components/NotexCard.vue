<template>
  <v-card class="notex-card card" @click="enterWorkspace">
    <v-responsive :aspect-ratio="16 / 9">
      <!-- Note Card Header -->
      <div class="d-flex overflow-hidden">
        <v-card-title class="pt-2 pb-2">
          <UserAvatar
            :size="40"
            :firstname="note.owner.firstName"
            :lastname="note.owner.lastName"
            :avatarUrl="note.owner.avatarUrl"
          />
        </v-card-title>
        <div style="width: 100%;">
          <v-card-title class="info--text px-0 pt-1 pb-0 pr-1 text-h6 d-flex flex-nowrap">
            <v-tooltip top transition="all 0.25s">
              <template v-slot:activator="{ on, attrs }">
                <span
                  class="d-inline-block text-truncate font-weight-medium"
                  style="max-width: 130px; font-size: 1rem;"
                  v-on="on"
                  v-bind="attrs"
                >
                  {{ note.noteTitle }}
                </span>
              </template>
              <span> {{ note.noteTitle }}</span>
            </v-tooltip>
            <v-spacer></v-spacer>
            <v-menu offset-y v-model="noteMenu">
              <template v-slot:activator="{ on, attrs }">
                <v-btn icon>
                  <v-icon v-bind="attrs" v-on="on">more_vert</v-icon>
                </v-btn>
              </template>
              <v-list class="pa-0">
                <!-- Edit Note Title -->
                <v-list-item class="pa-0" style="height: 100%;" v-if="actions.length >= 1">
                  <v-dialog v-model="editTitleDialog" persistent max-width="400">
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        class="text-capitalize"
                        :color="actions[0].color"
                        text
                        v-bind="attrs"
                        v-on="on"
                        style="width: 100%;"
                      >
                        <v-icon left>edit</v-icon>{{ actions[0].title }}
                      </v-btn>
                    </template>
                    <v-card>
                      <v-card-title class="text-h6">
                        Edit Note Title
                      </v-card-title>
                      <v-divider></v-divider>
                      <v-card-text class="py-0 mt-6">
                        <v-form ref="editNoteForm">
                          <v-text-field
                            v-model="noteTitle"
                            label="New Note Title"
                            clear-icon="highlight_off"
                            clearable
                            append-icon="drive_file_rename_outline"
                            @click:clear="noteTitle = ''"
                            :rules="[
                              (v) => (v && v.length !== 0) || 'Note title must not be empty',
                            ]"
                          ></v-text-field>
                        </v-form>
                      </v-card-text>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                          color="primary"
                          text
                          @click="closeDialogWithAction(actions[0].onClick)"
                        >
                          Confirm
                        </v-btn>
                        <v-btn color="error" text @click="closeDialogWithAction()">
                          Cancel
                        </v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                </v-list-item>
                <!-- Delete Notebook -->
                <v-list-item class="pa-0" v-if="actions.length >= 2">
                  <v-dialog v-model="deleteNoteDialog" persistent max-width="400">
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        class="text-capitalize"
                        :color="actions[1].color"
                        text
                        v-bind="attrs"
                        v-on="on"
                        style="width: 100%;"
                      >
                        <v-icon left>delete</v-icon>{{ actions[1].title }}
                      </v-btn>
                    </template>
                    <v-card>
                      <v-card-title class="text-h6">
                        Delete Note
                      </v-card-title>
                      <v-divider></v-divider>
                      <v-card-text class="py-0">
                        <v-checkbox
                          v-model="transferOwnership"
                          label="Are you willing to transfer ownership?"
                        ></v-checkbox>
                        <v-form ref="ownershipForm">
                          <v-autocomplete
                            v-show="transferOwnership"
                            v-model="sharedUserId"
                            :items="note.sharedUsers"
                            label="Transfer Ownership"
                            :item-text="(item) => `${item.firstName} ${item.lastName}`"
                            item-value="userId"
                            :rules="[
                              !transferOwnership ||
                                sharedUserId !== null ||
                                'You must select a user!',
                            ]"
                          >
                            <template v-slot:selection="data">
                              {{ `${data.item.firstName} ${data.item.lastName}` }}
                            </template>
                            <template v-slot:item="data">
                              <template>
                                <v-list-item-avatar>
                                  <UserAvatar
                                    :avatarUrl="data.item.avatarUrl"
                                    :firstname="data.item.firstName"
                                    :lastname="data.item.lastName"
                                    :size="34"
                                  />
                                </v-list-item-avatar>
                                <v-list-item-content>
                                  <v-list-item-title>{{
                                    `${data.item.firstName} ${data.item.lastName}`
                                  }}</v-list-item-title>
                                </v-list-item-content>
                              </template>
                            </template>
                          </v-autocomplete>
                        </v-form>
                      </v-card-text>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                          color="primary"
                          text
                          @click="closeDialogWithAction(actions[1].onClick)"
                        >
                          Confirm
                        </v-btn>
                        <v-btn color="error" text @click="closeDialogWithAction()">
                          Cancel
                        </v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-card-title>
          <v-card-subtitle
            class="px-0 py-0 info--text d-inline-block text-truncate"
            style="max-width: 130px;"
            >Owner: {{ `${note.owner.firstName} ${note.owner.lastName}` }}</v-card-subtitle
          >
        </div>
      </div>
      <v-divider></v-divider>
      <!-- Note Preview Image -->
      <v-card-text class="pa-3">
        <v-img class="note-preview grey darken-3 d-flex align-end justify-end rounded">
          <p class="pl-2 pb-1 ma-0 mr-2 white--text">
            Created: {{ unixTimeToDate(note.createdAt) }}
          </p>
        </v-img>
      </v-card-text>
      <v-divider></v-divider>
      <!-- Like, Comment, View Count -->
      <v-card-text class="py-2 d-flex justify-space-between text-truncate">
        <div style="width: 70px;"></div>
        <div>
          <v-icon size="18">favorite_border</v-icon>
          {{ note.likeCount }}
        </div>
        <div>
          <v-icon size="18">remove_red_eye</v-icon>
          {{ note.viewCount }}
        </div>
        <div>
          <v-icon size="18">notes</v-icon>
          {{ note.commentCount }}
        </div>
      </v-card-text>
    </v-responsive>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";
import UserAvatar from "./UserAvatar.vue";
import { unixTimeToDate } from "@/includes/utils.js";

export default {
  name: "NotexCard",
  props: {
    note: {
      type: Object,
      required: true,
    },
  },
  components: {
    UserAvatar,
  },
  data() {
    return {
      actions: [],
      editTitleDialog: false,
      deleteNoteDialog: false,
      noteMenu: false,
      noteTitle: this.note.noteTitle,
      transferOwnership: false,
      sharedUserId: null,
    };
  },
  methods: {
    enterWorkspace() {
      this.$router.push({ name: "workspace", params: { id: this.note.noteId } });
    },
    deleteNote() {
      if (this.$refs.ownershipForm.validate()) {
        this.$emit("delete-note", {
          ownerId: this.currentUser.userId,
          newOwnerId: this.sharedUserId,
          noteId: this.note.noteId,
        });
      } else {
        throw new Error("Form is not validated!");
      }
    },
    editNoteTitle() {
      if (this.$refs.editNoteForm.validate()) {
        this.$emit("edit-note-title", {
          noteId: this.note.noteId,
          newNoteTitle: this.noteTitle,
        });
      } else {
        throw new Error("Form is not validated!");
      }
    },
    closeDialogWithAction(action) {
      try {
        if (action) action();
        this.noteMenu = false;
        this.editTitleDialog = false;
        this.deleteNoteDialog = false;
        this.transferOwnership = false;
        this.sharedUserId = null;
        // this.$refs.editNoteForm.reset();
        // this.$refs.ownershipForm.reset();
      } catch (e) {
        console.log(e.message);
      }
    },
    unixTimeToDate(unixTime) {
      return unixTimeToDate(unixTime);
    },
  },
  computed: {
    ...mapGetters(["currentUser"]),
  },
  mounted() {
    const updateAction = {
      title: "Edit Note Title",
      onClick: () => this.editNoteTitle(),
      color: "primary",
    };
    const deleteAction = {
      title: "Delete Note",
      onClick: () => this.deleteNote(),
      color: "error",
    };

    if (this.currentUser.userId === this.note.ownerId) {
      this.actions.push(updateAction);
      this.actions.push(deleteAction);
    }
  },
};
</script>

<style>
.notex-card {
  width: 240px !important;
}

.note-preview {
  width: 100%;
  height: 200px;
}
</style>
