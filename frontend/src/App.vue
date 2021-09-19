<template>
  <v-app :style="{ background: $vuetify.theme.themes[theme].background }">
    <v-main class="mx-0 mb-0">
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",

  data() {
    return {};
  },
  computed: {
    theme() {
      return this.$vuetify.theme.dark ? "dark" : "light";
    },
  },
};
</script>

<style></style>
