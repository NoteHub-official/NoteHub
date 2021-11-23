<template>
  <v-list width="300" class="fill-height listBackground">
    <v-list-item v-for="link in links" :key="link" link>
      <v-list-item-title v-text="link"></v-list-item-title>
    </v-list-item>
    <v-list-item> Chat </v-list-item>
  </v-list>
</template>

<script>
/* eslint-disable */
import { mapActions, mapGetters } from "vuex";

export default {
  name: "WorkspaceChatList",
  data() {
    return {
      links: ["Home", "Contacts", "Settings"],
    };
  },
};
</script>

<style></style>
