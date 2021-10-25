<template>
  <v-avatar :color="getRandomColor()" :size="size">
    <v-img
      :src="avatarUrl"
      v-if="avatarUrl && avatarUrl !== 'null' && avatarUrl !== 'undefined'"
    ></v-img>
    <h4 class="white--text font-weight-medium text-h6" v-else>{{ initial }}</h4>
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
      return this.firstname[0].toUpperCase();
    },
  },
  methods: {
    getRandomColor() {
      const colors = [
        "#feca57",
        "#fa983a",
        "#38ada9",
        "#2e86de",
        "#ee5253",
        "#2ed573",
        "#8395a7",
        "#FDA7DF",
      ];
      // choose a random color from the array
      return colors[Math.floor(Math.random() * colors.length)];
    },
  },
};
</script>
