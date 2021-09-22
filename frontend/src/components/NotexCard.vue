<template>
  <v-card class="notex-card card" @click="a = 1">
    <div class="d-flex">
      <v-card-title class="pt-2 pb-2"
        ><v-avatar color="primary" size="42">
          <h1 class="white--text text-h6">BY</h1>
        </v-avatar>
      </v-card-title>
      <div style="width: 100%;">
        <v-card-title class="info--text px-0 pt-2 pb-3 pr-1 text-h6">
          {{ note.noteTitle }}
          <v-spacer></v-spacer>
          <v-btn icon><v-icon>more_vert</v-icon></v-btn>
        </v-card-title>
        <v-card-subtitle class="px-0 pb-2 info--text">Owner: {{ note.owner }}</v-card-subtitle>
      </div>
    </div>
    <v-divider></v-divider>
    <v-card-text class="pa-3">
      <div class="note-preview grey darken-3 d-flex align-end justify-end rounded">
        <p class="font-weight-medium ma-0 mr-2 white--text">Created: {{ note.createdAt }}</p>
      </div>
    </v-card-text>
    <v-divider></v-divider>
    <v-card-text class="py-2 d-flex justify-space-between text-truncate">
      <div style="width: 70px;"></div>
      <div>
        <v-icon size="18">favorite_border</v-icon>
        {{ note.likeCount }}
      </div>
      <div>
        <v-icon size="18">remove_red_eye</v-icon>
        {{ note.viewCount }}
      </div>
      <div>
        <v-icon size="18">notes</v-icon>
        {{ note.commentCount }}
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "NotexCard",
  props: {
    note: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style>
.notex-card {
  width: 280px !important;
}

.note-preview {
  width: 100%;
  height: 250px;
}
</style>
