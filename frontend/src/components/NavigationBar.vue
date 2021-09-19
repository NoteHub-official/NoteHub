<template>
  <div>
    <!-- App Bar -->
    <v-app-bar app color="appbar" class="white--text" :height="60">
      <v-icon class="white--text" @click="showDrawer = !showDrawer" :size="35">menu</v-icon>
      <v-spacer></v-spacer>
      <v-btn
        class="ma-4"
        text
        icon
        color="white"
        @click="$vuetify.theme.dark = !$vuetify.theme.dark"
      >
        <v-icon class="white--text mx-5">brightness_medium</v-icon>
      </v-btn>
      <v-avatar :size="40">
        <v-img :src="user.avatar"></v-img>
      </v-avatar>
    </v-app-bar>
    <!-- Sidebar -->
    <v-navigation-drawer color="drawer" app v-model="showDrawer">
      <div class="d-flex flex-column justify-center align-center py-5">
        <div class="d-flex flex-row align-center">
          <v-img
            :src="'https://cdn.vuetifyjs.com/images/cards/sunshine.jpg'"
            class="white--text align-end"
            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
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
          <v-list-item-avatar>
            <v-img :src="user.avatar"></v-img>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>{{ user.name }}</v-list-item-title>
            <v-list-item-subtitle>{{ user.subtitle }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-divider></v-divider>
      <!-- Buttons-->
      <v-list>
        <v-list-item v-for="link in links" :key="link.text" router :to="link.route">
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
export default {
  name: "NavigationBar",
  data() {
    return {
      showDrawer: false,
      user: {
        avatar: "https://cdn.vuetifyjs.com/images/lists/2.jpg",
        name: "John Smith",
        subtitle: "Student at University of Illinois Urbana-Champaign",
      },
      links: [
        { icon: "dashboard", text: "Dashboard", route: "/" },
        { icon: "folder", text: "MyProject", route: "/projects" },
        { icon: "person", text: "Team", route: "/team" },
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
