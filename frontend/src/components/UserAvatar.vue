<template>
  <v-avatar class="darken-1" :color="getRandomColor()" :size="size">
    <v-img
      :src="avatarUrl"
      v-if="avatarUrl && avatarUrl !== 'null' && avatarUrl !== 'undefined'"
    ></v-img>
    <h4 class="white--text font-weight-medium text-h6" v-else>{{ initial }}</h4>
  </v-avatar>
</template>

<script>
import { getRandomColor } from "@/includes/utils";

export default {
  name: "UserAvatar",
  props: {
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    size: {
      type: Number,
      required: true,
    },
    avatarUrl: {
      type: String,
    },
  },
  computed: {
    fullname() {
      return `${this.firstname} ${this.lastname}`;
    },
    initial() {
      return this.firstname[0].toUpperCase();
    },
  },
  methods: {
    getRandomColor,
  },
};
</script>
