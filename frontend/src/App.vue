<template>
  <v-app :style="{ background: $vuetify.theme.themes[theme].background }">
    <component :is="navbarName"></component>
    <v-main class="mx-0 mb-0">
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import NavigationBar from "@/components/NavigationBar.vue";

export default {
  name: "App",
  components: {
    NavigationBar,
  },
  data() {
    return {
      app: null,
    };
  },
  computed: {
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
