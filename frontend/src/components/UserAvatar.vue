<template>
  <v-avatar color="primary" :size="size">
    <v-img
      :src="avatarUrl"
      v-if="avatarUrl && avatarUrl !== 'null' && avatarUrl !== 'undefined'"
    ></v-img>
    <h4 class="white--text" v-else>{{ initial }}</h4>
  </v-avatar>
</template>

<script>
// Conditionally render either user initials or avatar image,
// depending on whether user upload an avatar photo
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
      console.log(this.firstname[0].toUpperCase() + this.lastname[0].toUpperCase());
      return this.firstname[0].toUpperCase() + this.lastname[0].toUpperCase();
    },
  },
};
</script>

<style></style>
