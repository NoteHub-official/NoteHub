<template>
  <v-card class="ma-4" height="300" width="300" @click="toggle">
    <v-row class="fill-height" align="center" justify="center">
      <h1>ASDADA</h1>
    </v-row>
  </v-card>
</template>

<script>
export default {
  name: "CommunityCard",
  props: {
    active: {
      type: Boolean,
      required: true,
    },
    toggle: {
      type: Function,
      required: true,
    },
  },
};
</script>

<style></style>
