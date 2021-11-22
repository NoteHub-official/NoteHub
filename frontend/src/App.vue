<template>
  <!-- :style="{ background: $vuetify.theme.themes[theme].background }" -->
  <v-app>
    <component :is="navbarName"></component>
    <v-main class="mx-0 mb-0 background">
      <router-view></router-view>
    </v-main>
    <!-- Use globally defined snackbar (see store/index.js) -->
    <v-snackbar v-model="snackbarShow" :timeout="3000" min-height="60" multi-line>
      {{ snackbarMessage }}
      <template v-slot:action="{ attrs }">
        <v-btn outlined v-bind="attrs" @click="setSnackbarShow(false)" :color="snackbarColor">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-app>
</template>

<script>
import NavigationBar from "@/components/NavigationBar.vue";
import CommunityBar from "@/components/CommunityBar.vue";
import WorkspaceBar from "@/components/WorkspaceBar.vue";
import { mapMutations, mapState } from "vuex";

export default {
  name: "App",
  components: {
    NavigationBar,
    CommunityBar,
    WorkspaceBar,
  },
  data() {
    return {
      app: null,
    };
  },
  methods: {
    ...mapMutations(["snackbarInfo", "setSnackbarShow"]),
  },
  computed: {
    ...mapState(["snackbarMessage", "snackbarColor"]),
    snackbarShow: {
      get() {
        return this.$store.state.snackbarShow;
      },
      set(value) {
        this.setSnackbarShow(value);
      },
    },
    theme() {
      return this.$vuetify.theme.dark ? "dark" : "light";
    },
    navbarName() {
      return this.$route.meta.navbar;
    },
  },
  mounted() {
    this.$store.dispatch("initialLogin", this.$router);
  },
};
</script>

<style></style>
