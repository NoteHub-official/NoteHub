<template>
  <div>
    <!-- App Bar -->
    <v-app-bar app color="appbar" class="white--text" :height="48" clipped-left clipped-right>
      <v-btn text class="pa-0">
        <h2 class="pa-2 white--text" @click="enterDashboard()">NoteHub</h2>
      </v-btn>
      <v-spacer></v-spacer>
      <!-- light/dark mode switch -->
      <v-btn class="ma-2 ml-0" text icon color="white" @click="toggleTheme">
        <v-tooltip bottom v-if="theme !== 'dark'">
          <template v-slot:activator="{ on, attrs }">
            <v-icon class="white--text mx-2" :size="20" v-on="on" v-bind="attrs"
              >brightness_medium</v-icon
            >
          </template>
          <span>dark mode</span>
        </v-tooltip>
        <v-tooltip bottom v-else>
          <template v-slot:activator="{ on, attrs }">
            <v-icon class="white--text mx-2" :size="20" v-on="on" v-bind="attrs">
              brightness_high
            </v-icon>
          </template>
          <span>light mode</span>
        </v-tooltip>
      </v-btn>
      <v-menu bottom min-width="200px" rounded offset-y v-if="user">
        <template v-slot:activator="{ on }">
          <v-btn icon x-large v-on="on">
            <UserAvatar
              :firstname="user.firstname"
              :lastname="user.lastname"
              :avatarUrl="user.avatarUrl"
              :size="32"
            />
          </v-btn>
        </template>
      </v-menu>
      <v-btn v-else outlined color="primary" rounded small @click="authenticateUser">Login</v-btn>
    </v-app-bar>

    <!-- Left Drawer -->
    <v-navigation-drawer
      permanent
      app
      clipped
      :width="288"
      :mini-variant.sync="mini"
      :mini-variant-width="48"
    >
      <v-row class="fill-height" no-gutters>
        <v-navigation-drawer dark mini-variant :mini-variant-width="48" permanent>
          <v-list class="pa-0">
            <v-list-item-group v-model="leftTabIdx">
              <div v-for="(item, idx) in leftDrawerTabs" :key="item.title">
                <v-tooltip right>
                  <template v-slot:activator="{ on, attrs }">
                    <v-list-item
                      link
                      :style="{ borderLeft: borderLeft(item.title) }"
                      @click="leftTabName = item.title"
                    >
                      <v-icon
                        v-bind="attrs"
                        v-on="on"
                        :class="{ transparent: leftTabIdx !== idx }"
                        :size="20"
                        >{{ item.icon }}</v-icon
                      >
                    </v-list-item>
                  </template>
                  <span>{{ item.title }}</span>
                </v-tooltip>
              </div>
            </v-list-item-group>
          </v-list>
        </v-navigation-drawer>
        <v-navigation-drawer permanent :width="240">
          <component :is="leftTabIdx !== undefined ? leftDrawerComponent : 'WorkspaceNoteList'" />
        </v-navigation-drawer>
      </v-row>
    </v-navigation-drawer>

    <!-- Right Drawer -->
    <v-navigation-drawer permanent app clipped right :width="rightTabIdx !== undefined ? 348 : 48">
      <div class="d-flex fill-height" no-gutters>
        <component
          :is="rightDrawerTabs[rightTabIdx] && rightDrawerTabs[rightTabIdx].component"
          v-show="rightTabIdx !== undefined"
        />
        <v-list class="pa-0" :style="{ background: '#2c2c2c' }" :width="48">
          <v-list-item-group v-model="rightTabIdx">
            <div v-for="(item, idx) in rightDrawerTabs" :key="item.title">
              <v-tooltip left>
                <template v-slot:activator="{ on, attrs }">
                  <v-list-item
                    link
                    :style="{ borderRight: borderRight(item.title) }"
                    @click="leftTabName = item.title"
                  >
                    <v-icon
                      color="white"
                      :class="{ transparent: rightTabIdx !== idx }"
                      v-bind="attrs"
                      v-on="on"
                      :size="20"
                    >
                      {{ item.icon }}
                    </v-icon>
                  </v-list-item>
                </template>
                <span>{{ item.title }}</span>
              </v-tooltip>
            </div>
          </v-list-item-group>
        </v-list>
      </div>
    </v-navigation-drawer>
  </div>
</template>

<script>
import UserAvatar from "./UserAvatar.vue";
import WorkspaceNoteList from "./WorkspaceNoteList.vue";
import WorkspaceInviteList from "./WorkspaceInviteList.vue";
import WorkspaceChatList from "./WorkspaceChatList.vue";
import WorkspaceCommentList from "./WorkspaceCommentList.vue";
import { mapActions } from "vuex";

export default {
  name: "WorkspaceBar",
  components: {
    UserAvatar,
    WorkspaceNoteList,
    WorkspaceInviteList,
    WorkspaceChatList,
    WorkspaceCommentList,
  },
  data() {
    return {
      leftTabIdx: 0,
      rightTabIdx: undefined,
      leftDrawerTabs: [
        { title: "Note", icon: "description", component: "WorkspaceNoteList" },
        { title: "Invite", icon: "groups", component: "WorkspaceInviteList" },
        {
          title: "Table of Content",
          icon: "toc",
          component: "WorkspaceNoteList",
        },
        {
          title: "Components",
          icon: "grid_view",
          component: "WorkspaceNoteList",
        },
        {
          title: "Save Checkpoint",
          icon: "save_as",
          component: "WorkspaceNoteList",
        },
      ],
      rightDrawerTabs: [
        { title: "Comment", icon: "chat", component: "WorkspaceCommentList" },
        {
          title: "Chat",
          icon: "question_answer",
          component: "WorkspaceChatList",
        },
        { title: "Import", icon: "publish", component: "WorkspaceChatList" },
        {
          title: "Export",
          icon: "file_download",
          component: "WorkspaceChatList",
        },
      ],
      leftTabName: "Note",
    };
  },
  methods: {
    ...mapActions(["logout", "initCommunityState", "initNoteState", "rootStateReset"]),
    async logoutUser() {
      await this.logout({ router: this.$router, route: this.$route });
      this.rootStateReset();
      console.log("Logout...");
    },
    authenticateUser() {
      this.$router.push({ name: "auth" });
    },
    toggleTheme() {
      // localStorage.setItem("darkTheme", this.$vuetify.theme.dark);
      const theme = this.$vuetify.theme.dark;
      this.$vuetify.theme.dark = !theme;
      this.$store.commit("toggleTheme");
      localStorage.setItem("darkTheme", !theme);
      console.log(this.$route);
    },
    async syncData() {
      this.initCommunityState();
      this.initNoteState();
      console.log("Syncing Data...");
    },
    borderLeft(name) {
      return this.leftTabIdx !== undefined && name === this.leftDrawerTabs[this.leftTabIdx].title
        ? `2px solid ${this.$vuetify.theme.dark ? "#2ed573" : "#1e90ff"}`
        : `2px solid #2c2c2c`;
    },
    borderRight(name) {
      return this.rightTabIdx !== undefined && name === this.rightDrawerTabs[this.rightTabIdx].title
        ? `2px solid ${this.$vuetify.theme.dark ? "#2ed573" : "#1e90ff"}`
        : `2px solid #2c2c2c`;
    },
    enterDashboard() {
      this.$router.push({ name: "dashboard" });
    },
  },
  computed: {
    user() {
      return this.$store.state.auth.currentUser;
    },
    theme() {
      return this.$vuetify.theme.dark ? "dark" : "light";
    },
    leftDrawerComponent() {
      return this.leftDrawerTabs[this.leftTabIdx].component;
    },
    mini: {
      get() {
        return this.leftTabIdx === undefined;
      },
      set() {},
    },
    openRightDrawer: {
      get() {
        return this.rightTabIdx === undefined;
      },
      set() {},
    },
  },
  mounted() {
    const theme = localStorage.getItem("darkTheme");
    if (theme) {
      if (theme === "true") {
        this.$vuetify.theme.dark = true;
      } else {
        this.$vuetify.theme.dark = false;
      }
    }
  },
};
</script>

<style>
.brand-name {
  font-size: 1.8rem !important;
  font-weight: 400;
  color: white;
}
.transparent {
  opacity: 0.7;
}

::-webkit-scrollbar {
  display: none;
}
</style>
