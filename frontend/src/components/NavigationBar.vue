<template>
  <div>
    <!-- App Bar -->
    <v-app-bar app color="appbar" class="white--text" :height="60">
      <v-icon class="white--text" @click="showDrawer = !showDrawer" :size="32">menu</v-icon>
      <v-spacer></v-spacer>
      <!-- light/dark mode switch -->
      <v-btn
        class="ma-4"
        text
        icon
        color="white"
        @click="$vuetify.theme.dark = !$vuetify.theme.dark"
      >
        <v-tooltip bottom v-if="theme !== 'dark'">
          <template v-slot:activator="{ on, attrs }">
            <v-icon class="white--text mx-5" :size="22" v-on="on" v-bind="attrs"
              >brightness_medium</v-icon
            >
          </template>
          <span>dark mode</span>
        </v-tooltip>
        <v-tooltip bottom v-else>
          <template v-slot:activator="{ on, attrs }">
            <v-icon class="white--text mx-5" :size="22" v-on="on" v-bind="attrs"
              >brightness_high</v-icon
            >
          </template>
          <span>light mode</span>
        </v-tooltip>
      </v-btn>
      <v-menu bottom min-width="200px" rounded offset-y>
        <template v-slot:activator="{ on }">
          <v-btn icon x-large v-on="on">
            <UserAvatar :firstname="user.firstname" :lastname="user.lastname" :size="42" />
          </v-btn>
        </template>
        <!-- Avatar Dropdown -->
        <v-card>
          <div class="justify-center pt-4">
            <div class="mx-auto text-center">
              <UserAvatar :firstname="user.firstname" :lastname="user.lastname" :size="50" />
              <h3 class="mt-3">{{ `${user.firstname} ${user.lastname}` }}</h3>
              <p class="text-caption mt-1">
                {{ user.email }}
              </p>
              <v-divider></v-divider>
              <v-btn text width="100%">
                <v-icon left>exit_to_app</v-icon>
                Logout
              </v-btn>
            </div>
          </div>
        </v-card>
      </v-menu>
    </v-app-bar>
    <!-- Drawer -->
    <v-navigation-drawer color="drawer" app v-model="showDrawer">
      <div class="d-flex flex-column justify-center align-center py-5">
        <div class="d-flex flex-row align-center">
          <v-img
            :src="'https://cdn.vuetifyjs.com/images/cards/sunshine.jpg'"
            class="white--text align-end"
            height="50px"
            width="50px"
          >
          </v-img>
          <div class="text-h4 ml-2" :style="{ fontWeight: 405 }">NoteHub</div>
        </div>
      </div>
      <v-divider></v-divider>
      <!-- Personal Info -->
      <v-list three-line>
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
        <v-list-item v-for="link in links" :key="link.text" router :to="{ name: link.name }">
          <v-list-item-icon>
            <v-icon>{{ link.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ link.text }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
import UserAvatar from "./UserAvatar.vue";

export default {
  name: "NavigationBar",
  components: { UserAvatar },
  data() {
    return {
      showDrawer: false,
      user: {
        avatar: "https://cdn.vuetifyjs.com/images/lists/2.jpg",
        firstname: "Brian",
        lastname: "Yin",
        email: "boquany2@illinois.edu",
        subtitle: "Student at University of Illinois Urbana-Champaign",
      },
      links: [
        { icon: "dashboard", text: "Dashboard", name: "dashboard" },
        { icon: "groups", text: "Explore Community", name: "communities" },
        { icon: "person", text: "My Profile", name: "profile" },
      ],
    };
  },
  computed: {
    theme() {
      return this.$vuetify.theme.dark ? "dark" : "light";
    },
  },
};
</script>

<style></style>
