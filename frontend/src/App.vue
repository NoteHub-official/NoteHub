<template>
  <v-app :style="{ background: $vuetify.theme.themes[theme].background }">
    <v-content class="mx-0 mb-0">
      <router-view></router-view>
    </v-content>
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
