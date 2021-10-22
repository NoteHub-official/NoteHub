<template>
  <div>
    <!-- App Bar -->
    <v-app-bar color="appbar" app class="white--text" :height="50" clipped-right>
      <v-spacer></v-spacer>
      <!-- light/dark mode switch -->
      <v-btn class="ma-2 mr-0" text icon color="white" @click="toggleTheme">
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
            <v-icon class="white--text mx-3" v-on="on" v-bind="attrs">
              brightness_high
            </v-icon>
          </template>
          <span>light mode</span>
        </v-tooltip>
      </v-btn>
    </v-app-bar>

    <!-- Left Drawer -->
    <v-navigation-drawer
      color="drawer"
      dark
      app
      permanent
      :mini-variant="true"
      mini-variant-width="65"
    >
      <v-list-item class="py-3">
        <UserAvatar
          class="text-h6"
          :size="45"
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
      :value="!$vuetify.breakpoint.xs"
      dark
      app
      right
      :mini-variant="true"
      mini-variant-width="240"
      clipped
    >
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h6">
            Application
          </v-list-item-title>
          <v-list-item-subtitle>
            subtext
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-divider></v-divider>
      <v-list dense nav>
        <v-list-item v-for="item in items" :key="item.title" link>
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import UserAvatar from "./UserAvatar.vue";

export default {
  name: "CommunityBar",
  components: { UserAvatar },
  data() {
    return {
      items: [
        { title: "Dashboard", icon: "mdi-view-dashboard" },
        { title: "Photos", icon: "mdi-image" },
        { title: "About", icon: "mdi-help-box" },
      ],
      actions: [
        { title: "Import", icon: "file_upload", color: "#1dd1a1", click: this.logoutUser },
        { title: "Invite", icon: "group_add", color: "#ff9f43", click: this.logoutUser },
        { title: "More", icon: "more_horiz", color: "#1e90ff", click: this.logoutUser },
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
    };
  },
  methods: {
    ...mapActions(["logout"]),
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
    toggleTheme() {
      // localStorage.setItem("darkTheme", this.$vuetify.theme.dark);
      const theme = this.$vuetify.theme.dark;
      this.$vuetify.theme.dark = !theme;
      this.$store.commit("toggleTheme");
      localStorage.setItem("darkTheme", !theme);
      console.log(this.$route);
    },
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
</style>
