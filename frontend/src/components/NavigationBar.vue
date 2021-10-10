<template>
  <div>
    <!-- App Bar -->
    <v-app-bar app color="appbar" class="white--text" :height="50">
      <v-icon
        v-show="!$vuetify.breakpoint.xs"
        class="white--text"
        @click="showDrawer = !showDrawer"
        :size="28"
        >menu</v-icon
      >
      <v-spacer></v-spacer>
      <!-- light/dark mode switch -->
      <v-btn class="ma-2" text icon color="white" @click="toggleTheme">
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
              :size="36"
            />
          </v-btn>
        </template>
        <!-- Avatar Dropdown -->
        <v-expand-transition>
          <v-card>
            <div class="justify-center pt-4">
              <div class="mx-auto text-center">
                <UserAvatar
                  :firstname="user.firstname"
                  :lastname="user.lastname"
                  :avatarUrl="user.avatarUrl"
                  :size="45"
                />
                <h3 class="mt-3 info--text">{{ `${user.firstname} ${user.lastname}` }}</h3>
                <p class="text-caption mt-1">
                  {{ user.email }}
                </p>
                <v-divider></v-divider>
                <v-btn text width="100%" @click="logoutUser">
                  <v-icon left>exit_to_app</v-icon>
                  Logout
                </v-btn>
              </div>
            </div>
          </v-card>
        </v-expand-transition>
      </v-menu>
      <v-btn v-else outlined color="primary" rounded small @click="authenticateUser">
        Login
      </v-btn>
    </v-app-bar>
    <!-- Drawer -->
    <v-navigation-drawer
      color="drawer"
      app
      dark
      v-model="showDrawer"
      v-if="!$vuetify.breakpoint.xs"
      width="220"
    >
      <div class="d-flex flex-column justify-center align-center py-5">
        <div class="d-flex flex-row align-center">
          <v-img
            :src="'https://cdn.vuetifyjs.com/images/cards/sunshine.jpg'"
            class="white--text align-end"
            height="36px"
            width="36px"
          >
          </v-img>
          <h3 class="ml-3 brand-name">
            NoteHub
          </h3>
        </div>
      </div>
      <v-divider></v-divider>
      <!-- Personal Info -->
      <v-list three-line v-if="user">
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>{{ `${user.firstname} ${user.lastname}` }}</v-list-item-title>
            <v-list-item-subtitle>{{ user.subtitle }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-divider></v-divider>
      <!-- Routing Buttons-->
      <v-list>
        <v-list-item
          v-for="link in links"
          :key="link.text"
          router
          :to="{ name: link.name }"
          exact
          :style="{ borderLeft: borderLeft(link.name) }"
        >
          <v-list-item-icon class="mr-6">
            <v-icon :color="link.name === $route.name ? 'primary' : 'white'">{{
              link.icon
            }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title
              :class="{ 'primary--text font-weight-bold': link.name === $route.name }"
              >{{ link.text }}</v-list-item-title
            >
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <!-- Bottom Navigation -->
    <v-bottom-navigation :value="value" color="primary" grow app v-if="$vuetify.breakpoint.xs">
      <v-btn
        v-for="link in links"
        :key="link.text + '-bottom-nav'"
        @click="$router.push({ name: link.name })"
      >
        <span>{{ link.text }}</span>
        <v-icon>{{ link.icon }}</v-icon>
      </v-btn>
    </v-bottom-navigation>
  </div>
</template>

<script>
import UserAvatar from "./UserAvatar.vue";
import { mapActions } from "vuex";

export default {
  name: "NavigationBar",
  components: { UserAvatar },
  data() {
    return {
      showDrawer: false,
      links: [
        { icon: "home", text: "Home", name: "home" },
        { icon: "dashboard", text: "Dashboard", name: "dashboard" },
        { icon: "groups", text: "Community", name: "communities" },
        { icon: "person", text: "My Profile", name: "profile" },
      ],
    };
  },
  methods: {
    ...mapActions(["logout"]),
    async logoutUser() {
      await this.logout({ router: this.$router, route: this.$route });
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
    borderLeft(name) {
      return name === this.$route.name
        ? `4px solid ${this.$vuetify.theme.dark ? "#2ed573" : "#1e90ff"}`
        : "none";
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
