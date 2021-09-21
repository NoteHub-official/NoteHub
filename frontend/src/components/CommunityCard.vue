<template>
  <v-card
    :color="active ? undefined : 'grey lighten-1'"
    class="ma-4"
    height="200"
    width="100"
    @click="toggle"
  >
    <v-row class="fill-height" align="center" justify="center">
      <v-scale-transition>
        <v-icon v-if="active" color="white" size="48" v-text="'mdi-close-circle-outline'"></v-icon>
      </v-scale-transition>
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
