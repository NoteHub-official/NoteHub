<template>
  <div>
    <!-- Left Drawer -->
    <v-navigation-drawer
      color="drawer"
      dark
      app
      permanent
      :mini-variant="true"
      mini-variant-width="65"
      v-if="!$vuetify.breakpoint.xs"
    >
      <v-list-item class="py-3">
        <UserAvatar
          class="text-h6"
          :size="44"
          :firstname="currentUser.firstname"
          :lastname="currentUser.lastname"
          :avatarUrl="currentUser.avatarUrl"
        />
      </v-list-item>
      <div class="border"></div>
      <v-row class="flex-column left-drawer-height" justify="space-between">
        <v-list class="mt-4">
          <v-list-item v-for="action in actions" :key="action.title" class="py-2">
            <v-tooltip right transition="all 0.3s" color="info">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  outlined
                  class="action-button"
                  fab
                  elevation="5"
                  v-bind="attrs"
                  v-on="on"
                  :color="action.color"
                  @click="action.click"
                >
                  <v-icon :size="20">{{ action.icon }}</v-icon>
                </v-btn>
              </template>
              <span>{{ action.title }}</span>
            </v-tooltip>
          </v-list-item>
        </v-list>
        <v-list class="py-0">
          <div class="border"></div>
          <v-list-item class="py-2" v-for="setting in settings" :key="setting.title">
            <v-tooltip right transition="all 0.3s" color="info">
              <template v-slot:activator="{ on, attrs }">
                <v-btn icon v-bind="attrs" v-on="on" @click="setting.click()">
                  <v-icon size="27">{{ setting.icon }}</v-icon>
                </v-btn>
              </template>
              <span>{{ setting.title }}</span>
            </v-tooltip>
          </v-list-item>
        </v-list>
      </v-row>
    </v-navigation-drawer>
    <!-- Right Drawer -->
    <v-navigation-drawer
      stateless
      color="drawer"
      :value="!$vuetify.breakpoint.smAndDown"
      dark
      app
      right
    >
      <v-list-item>
        <v-list-item-content class="ma-1">
          <v-list-item-title class="d-flex font-weight-medium justify-center">
            <v-icon left size="18">people_alt</v-icon>
            Community Members
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-divider></v-divider>
      <div class="pa-2">
        <v-text-field
          solo
          dense
          hide-details
          background-color="appbar"
          append-icon="search"
          placeholder="search members"
        ></v-text-field>
      </div>
      <v-divider></v-divider>
      <MemberList />
    </v-navigation-drawer>
    <!-- Import Note Dialog -->
    <v-dialog v-model="importNoteDialog" width="800">
      <v-card :loading="importLoading">
        <v-card-title class="py-2 px-3 info--text">
          <v-icon left color="primary">file_upload</v-icon>
          Import Notebook
        </v-card-title>
        <v-divider></v-divider>
        <v-card class="ma-3">
          <NoteTable
            :selectedNotes.sync="selectedNotes"
            @select-note="(newNotes) => (selectedNotes = newNotes)"
          />
        </v-card>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error" text @click="importNoteDialog = false" :disabled="importLoading">
            Cancel
          </v-btn>
          <v-btn
            color="primary"
            text
            @click="importNotebooks()"
            :loading="importLoading"
            :disabled="selectedNotes.length === 0"
          >
            Import
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- Invite Members Dialog -->
    <v-dialog v-model="inviteDialog" width="800">
      <v-card :loading="inviteLoading">
        <v-card-title class="py-2 px-3 info--text">
          <v-icon left color="primary">group_add</v-icon>
          Invite New Member
        </v-card-title>
        <v-divider></v-divider>
        <v-card-actions class="mt-3">
          <UserSearchField
            :searchResult="searchResult"
            :selectedUsers="selectedUsers"
            :loading="inviteLoading"
            @change-selected-users="(newUsers) => (selectedUsers = newUsers)"
            @search-complete="(v) => (searchResult = [...v, ...searchResult])"
          />
        </v-card-actions>
        <v-card-actions>
          <v-btn elevation="1" block color="primary" large @click="shareCommunityToUser()">
            <v-icon left>share</v-icon>
            Share
          </v-btn>
        </v-card-actions>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error" text @click="inviteDialog = false" :disabled="inviteLoading">
            Cancel
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import MemberList from "@/components/MemberList.vue";
import UserAvatar from "@/components/UserAvatar.vue";
import NoteTable from "@/components/NoteTable.vue";
import UserSearchField from "@/components/UserSearchField.vue";

export default {
  name: "CommunityBar",
  components: { MemberList, UserAvatar, NoteTable, UserSearchField },
  data() {
    return {
      community: null,
      actions: [
        {
          title: "Import",
          icon: "file_upload",
          color: "#1dd1a1",
          click: this.openImportNoteDialog,
        },
        { title: "Invite", icon: "group_add", color: "#ff9f43", click: this.openInviteDialog },
      ],
      settings: [
        {
          title: "Back to Dashboard",
          icon: "dashboard",
          click: this.enterDashboard,
        },
        { title: "Logout", icon: "exit_to_app", click: this.logoutUser },
        { title: "Settings", icon: "settings", click: this.logoutUser },
      ],
      mini: true,
      importNoteDialog: false,
      inviteDialog: false,
      selectedNotes: [],
      importLoading: false,
      inviteLoading: false,
      selectedUsers: [],
      searchResult: [],
    };
  },
  watch: {
    isUpdating(val) {
      if (val) {
        setTimeout(() => (this.isUpdating = false), 3000);
      }
    },
  },
  methods: {
    ...mapActions([
      "logout",
      "importNotesByNoteId",
      "initCommunityNotes",
      "shareCommunityToUserById",
      "getCommunityById",
      "initCommunityMembers",
    ]),
    ...mapMutations(["snackbarSuccess", "snackbarError"]),

    async logoutUser() {
      await this.logout({ router: this.$router, route: this.$route });
      console.log("Logout...");
    },
    enterDashboard() {
      this.$router.push({ name: "dashboard" });
    },
    authenticateUser() {
      this.$router.push({ name: "auth" });
    },
    openImportNoteDialog() {
      this.importNoteDialog = true;
    },
    openInviteDialog() {
      this.inviteDialog = true;
    },
    async importNotebooks() {
      const communityId = this.$route.params.id;
      this.importLoading = true;
      try {
        await this.importNotesByNoteId({ communityId, notes: this.selectedNotes });
        await this.initCommunityNotes(communityId);
        this.selectedNotes = [];
        setTimeout(() => {
          this.importLoading = false;
          this.importNoteDialog = false;
          this.snackbarSuccess("Notes imported successfully");
        }, 500);
      } catch (e) {
        console.log(e.message);
        this.importLoading = false;
        this.importNoteDialog = false;
        this.snackbarError(`Error importing notes`);
      }
    },
    async shareCommunityToUser() {
      const communityId = this.$route.params.id;
      this.inviteLoading = true;
      try {
        await this.shareCommunityToUserById({ communityId, userIds: this.selectedUsers });
        await this.initCommunityMembers(this.$route.params.id);
        this.selectedUsers = [];
        this.inviteLoading = false;
        this.inviteDialog = false;
        this.snackbarSuccess("Invitation sent successfully");
      } catch (e) {
        console.log(e.message);
        this.inviteLoading = false;
        this.inviteDialog = false;
        this.snackbarError(`Error inviting users`);
      }
    },
    async assignRole() {},
  },
  computed: {
    ...mapGetters(["currentUser"]),
    user() {
      return this.$store.state.auth.currentUser;
    },
    theme() {
      return this.$vuetify.theme.dark ? "dark" : "light";
    },
  },
  async mounted() {
    try {
      this.community = await this.getCommunityById(this.$route.params.id);
      await this.initCommunityMembers(this.$route.params.id);
    } catch (e) {
      this.$router.push({ name: "dashboard" });
    }
    const theme = localStorage.getItem("darkTheme");
    if (theme) {
      if (theme === "true") {
        this.$vuetify.theme.dark = true;
      } else {
        this.$vuetify.theme.dark = false;
      }
    }

    if (this.community.ownerId === this.currentUser.userId) {
      this.actions.push({
        title: "Assign Role",
        icon: "assignment_ind",
        color: "#1e90ff",
        click: this.assignRole,
      });
    }
  },
};
</script>

<style>
.three-lines {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  white-space: normal;
}

.brand-name {
  font-size: 1.8rem !important;
  font-weight: 400;
}

.action-button {
  height: 45px !important;
  width: 45px !important;
}

.border {
  border-top: 1px solid rgba(255, 255, 255, 0.519);
}

.left-drawer-height {
  height: calc(100vh - 65px) !important;
  min-height: 430px !important;
}

.v-list-group .v-list-group__header .v-list-item__icon.v-list-group__header__append-icon {
  min-width: 0px !important;
  padding: 0px;
  margin-left: 10px;
}
</style>
