<template>
  <v-card class="notex-card card" @click="enterWorkspace" :elevation="4">
    <v-responsive :aspect-ratio="16 / 9">
      <!-- Note Card Header -->
      <div class="d-flex overflow-hidden">
        <v-card-title class="pt-2 pb-2">
          <UserAvatar
            :size="40"
            :firstname="note.owner.firstName"
            :lastname="note.owner.lastName"
            :avatarUrl="note.owner.avatarUrl"
          />
        </v-card-title>
        <div style="width: 100%">
          <v-card-title class="info--text px-0 pt-1 pb-0 pr-1 text-h6 d-flex flex-nowrap">
            <v-tooltip top transition="all 0.25s">
              <template v-slot:activator="{ on, attrs }">
                <span
                  class="d-inline-block text-truncate font-weight-medium"
                  style="max-width: 130px; font-size: 1rem"
                  v-on="on"
                  v-bind="attrs"
                >
                  {{ note.noteTitle }}
                </span>
              </template>
              <span> {{ note.noteTitle }}</span>
            </v-tooltip>
            <v-spacer></v-spacer>
            <v-menu
              offset-y
              left
              bottom
              v-model="noteMenu"
              v-if="currentUser.userId === note.ownerId"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-btn icon small>
                  <v-icon v-bind="attrs" v-on="on" class="pa-0 ma-0">more_vert</v-icon>
                </v-btn>
              </template>
              <NoteActionMenu :note="note" />
            </v-menu>
          </v-card-title>
          <v-card-subtitle
            class="px-0 py-0 info--text d-inline-block text-truncate"
            style="max-width: 130px"
            >Owner: {{ `${note.owner.firstName} ${note.owner.lastName}` }}</v-card-subtitle
          >
        </div>
      </div>
      <v-divider></v-divider>
      <!-- Note Preview Image -->
      <v-card-text class="pa-3">
        <v-img class="note-card-preview grey darken-3 d-flex align-end justify-end rounded">
          <p class="pl-2 pb-1 ma-0 mr-2 white--text">Created: {{ timeToDate(note.createdAt) }}</p>
        </v-img>
      </v-card-text>
      <v-divider></v-divider>
      <!-- Like, Comment, View Count -->
      <v-card-text class="py-2 d-flex justify-space-between text-truncate">
        <div style="width: 70px"></div>
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
    </v-responsive>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";
import UserAvatar from "./UserAvatar.vue";
import { unixTimeToDate } from "@/includes/utils.js";
import NoteActionMenu from "./NoteActionMenu.vue";

export default {
  name: "NotexCard",
  props: {
    note: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      noteMenu: false,
    };
  },
  components: {
    UserAvatar,
    NoteActionMenu,
  },
  methods: {
    enterWorkspace() {
      this.$router.push({ name: "workspace", params: { id: this.note.noteId } });
    },
    timeToDate(unixTime) {
      return unixTimeToDate(unixTime);
    },
  },
  computed: {
    ...mapGetters(["currentUser"]),
  },
};
</script>

<style>
.notex-card {
  width: 240px !important;
}

.notex-card .note-card-preview {
  width: 100%;
  height: 200px;
}
</style>
