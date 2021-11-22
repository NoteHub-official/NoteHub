<template>
  <div>
    <!-- App Bar -->
    <v-app-bar app color="appbar" class="white--text" :height="48" clipped-left>
      <h2>NoteHub</h2>
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
    <v-navigation-drawer permanent app clipped>
      <v-row class="fill-height" no-gutters>
        <v-navigation-drawer dark mini-variant mini-variant-width="52" permanent>
          <v-list class="pa-0">
            <v-list-item-group v-model="model">
              <div v-for="item in leftDrawerTabs" :key="item.title">
                <v-tooltip right>
                  <template v-slot:activator="{ on, attrs }">
                    <v-list-item
                      link
                      :style="{ borderLeft: borderLeft(item.title) }"
                      @click="leftTabName = item.title"
                    >
                      <v-icon v-bind="attrs" v-on="on">{{ item.icon }}</v-icon>
                    </v-list-item>
                  </template>
                  <span class="info">{{ item.title }}</span>
                </v-tooltip>
              </div>
            </v-list-item-group>
          </v-list>
        </v-navigation-drawer>
        <v-list class="grow">
          <v-list-item v-for="link in links" :key="link" link>
            <v-list-item-title v-text="link"></v-list-item-title>
          </v-list-item>
          <v-list-item> dasda </v-list-item>
        </v-list>
      </v-row>
    </v-navigation-drawer>
  </div>
</template>

<script>
import UserAvatar from "./UserAvatar.vue";
import { mapActions } from "vuex";

export default {
  name: "WorkspaceBar",
  components: { UserAvatar },
  data() {
    return {
      model: 0,
      leftDrawerTabs: [
        { title: "Note", icon: "description" },
        { title: "Invite", icon: "groups" },
        { title: "Table of Content", icon: "toc" },
        { title: "Components", icon: "grid_view" },
      ],
      links: ["Home", "Contacts", "Settings"],
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
      return name === this.leftDrawerTabs[this.model].title
        ? `2px solid ${this.$vuetify.theme.dark ? "#2ed573" : "#1e90ff"}`
        : `2px solid #2c2c2c`;
    },
  },
  computed: {
    user() {
      return this.$store.state.auth.currentUser;
    },
    theme() {
      return this.$vuetify.theme.dark ? "dark" : "light";
    },
    value() {
      let index = 0;
      this.links.forEach((link, idx) => {
        if (link.name === this.$route.name) index = idx;
      });
      return index;
    },
    leftDrawerWidth() {
      return this.$vuetify.breakpoint.width < 800 ? 56 : 256;
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
</style>
