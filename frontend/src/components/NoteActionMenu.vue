<template>
  <v-list dense class="pa-0">
    <!-- Edit Note Title -->
    <v-list-item class="pa-0">
      <v-dialog v-model="editTitleDialog" persistent width="500">
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            class="text-capitalize d-flex justify-start info--text"
            text
            v-bind="attrs"
            v-on="on"
            style="width: 100%"
          >
            <v-icon left>edit</v-icon>{{ actions[0].title }}
          </v-btn>
        </template>
        <v-card>
          <v-card-title class="text-h6"> Edit Note Title </v-card-title>
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
                :rules="[(v) => (v && v.length !== 0) || 'Note title must not be empty']"
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" text @click="closeDialogWithAction(actions[0].onClick)">
              Confirm
            </v-btn>
            <v-btn color="error" text @click="closeDialogWithAction()"> Cancel </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-list-item>
    <!-- Delete Notebook -->
    <v-list-item class="pa-0">
      <v-dialog v-model="deleteNoteDialog" persistent width="500">
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            class="text-capitalize d-flex justify-start info--text"
            text
            v-bind="attrs"
            v-on="on"
            style="width: 100%"
          >
            <v-icon left>delete</v-icon>{{ actions[1].title }}
          </v-btn>
        </template>
        <v-card>
          <v-card-title class="text-h6"> Delete Note </v-card-title>
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
                :rules="[!transferOwnership || sharedUserId !== null || 'You must select a user!']"
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
            <v-btn color="primary" text @click="closeDialogWithAction(actions[1].onClick)">
              Confirm
            </v-btn>
            <v-btn color="error" text @click="closeDialogWithAction()"> Cancel </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-list-item>
    <!-- Share Notebook -->
    <v-list-item class="pa-0">
      <v-dialog v-model="shareNoteDialog" persistent width="800">
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            class="text-capitalize d-flex justify-start info--text"
            text
            v-bind="attrs"
            v-on="on"
            style="width: 100%"
          >
            <v-icon left>share</v-icon>{{ actions[2].title }}
          </v-btn>
        </template>
        <v-card>
          <v-card-title class="info--text text-h6"> Share Note </v-card-title>
          <v-divider></v-divider>
          <v-card-actions class="mt-3">
            <UserSearchField
              :loading="shareLoading"
              :selectedUsers="selectedUsers"
              :searchResult="filteredSearchResult"
              @change-selected-users="(newUsers) => (selectedUsers = newUsers)"
              @search-complete="(v) => (searchResult = [...v, ...searchResult])"
            />
          </v-card-actions>
          <v-card-actions>
            <v-btn block color="primary" filled large @click="actions[2].onClick">
              <v-icon left>share</v-icon>
              Share
            </v-btn>
          </v-card-actions>
          <v-card-actions class="d-block" v-if="note.sharedUsers && note.sharedUsers.length !== 0">
            <NoteAccessList :sharedUsers="note.sharedUsers" :noteId="note.noteId" />
          </v-card-actions>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="error" text @click="closeDialogWithAction()"> Cancel </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-list-item>
  </v-list>
</template>

<script>
import UserAvatar from "./UserAvatar.vue";
import UserSearchField from "./UserSearchField.vue";
import NoteAccessList from "./NoteAccessList.vue";
import { mapGetters, mapActions, mapMutations } from "vuex";

export default {
  name: "NoteActionMenu",
  props: {
    note: {
      type: Object,
      required: true,
    },
  },
  components: {
    UserAvatar,
    UserSearchField,
    NoteAccessList,
  },
  data() {
    return {
      actions: [],
      editTitleDialog: false,
      deleteNoteDialog: false,
      shareNoteDialog: false,
      noteTitle: this.note.noteTitle,
      transferOwnership: false,
      sharedUserId: null,
      shareLoading: false,
      selectedUsers: [],
      searchResult: [],
    };
  },
  methods: {
    ...mapActions(["shareNoteByUserId", "deleteNoteAccessById", "editNoteTitleById"]),
    ...mapMutations(["updateNoteSharedUsers", "snackbarSuccess", "snackbarError", "snackbarInfo"]),
    async deleteNote() {
      if (this.$refs.ownershipForm.validate()) {
        await this.deleteNoteAccessById({
          ownerId: this.currentUser.userId,
          newOwnerId: this.sharedUserId,
          noteId: this.note.noteId,
        });
        this.snackbarInfo(`Notebook has been removed from your dashboard.`);
      } else {
        throw new Error("Form is not validated!");
      }
    },
    async editNoteTitle() {
      if (this.$refs.editNoteForm.validate()) {
        await this.editNoteTitleById({
          noteId: this.note.noteId,
          newNoteTitle: this.noteTitle,
        });
        this.snackbarSuccess(`Update notebook title successfull.`);
      } else {
        throw new Error("Form is not validated!");
      }
    },
    async shareNote() {
      try {
        const res = await this.shareNoteByUserId({
          noteId: this.note.noteId,
          userIds: this.selectedUsers,
        });
        this.note.sharedUsers = this.getUniqueSharedUsers([...this.note.sharedUsers, ...res.data]);
        this.searchResult = [];
        this.selectedUsers = [];
        this.snackbarSuccess("Note shared successfully!");
      } catch (e) {
        this.snackbarError("Error while sharing note!");
        console.error(e.message);
      }
    },
    closeDialogWithAction(action) {
      try {
        if (action) action();
        console.log("ASDADAd");
        this.noteMenu = false;
        this.editTitleDialog = false;
        this.deleteNoteDialog = false;
        this.shareNoteDialog = false;
        this.transferOwnership = false;
        this.sharedUserId = null;
        // this.$refs.editNoteForm.reset();
        // this.$refs.ownershipForm.reset();
      } catch (e) {
        console.log(e.message);
      }
    },
    getUniqueSharedUsers(users) {
      const userIds = {};
      return users.filter((user) => {
        if (userIds[user.userId]) {
          return false;
        }
        userIds[user.userId] = true;
        return true;
      });
    },
  },
  computed: {
    ...mapGetters(["currentUser"]),
    filteredSearchResult() {
      // filter users whose userId in note.sharedUsers
      return this.searchResult.filter((user) => {
        return (
          !this.note.sharedUsers.some((sharedUser) => sharedUser.userId === user.userId) &&
          user.userId !== this.currentUser.userId
        );
      });
    },
  },
  created() {
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
    const shareAction = {
      title: "Share Note",
      onClick: () => this.shareNote(),
      color: "warning",
    };

    if (this.currentUser.userId === this.note.ownerId) {
      this.actions.push(updateAction);
      this.actions.push(deleteAction);
      this.actions.push(shareAction);
    }
  },
};
</script>

<style>
.note-action-menu-list {
  min-width: none !important;
}
</style>
