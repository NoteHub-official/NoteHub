<template>
  <div>
    <v-card elevation="2" class="community-note-card">
      <div class="d-flex direction-column">
        <v-card-title class="text-h6 pa-4 py-2 font-weight-medium info--text">
          {{ note.noteTitle }}
        </v-card-title>
      </div>
      <v-divider></v-divider>
      <div class="d-flex direction-column py-2">
        <v-responsive :aspect-ratio="3 / 3.4" class="ml-3" v-if="!$vuetify.breakpoint.xs">
          <v-img class="note-preview grey darken-3 d-flex align-end justify-end rounded">
            <v-card-text class="pl-2 pb-1 ma-0 mr-2 white--text" style="width: 200px;">
              Created: {{ unixTimeToDate(note.createdAt) }}
            </v-card-text>
          </v-img>
        </v-responsive>
        <v-window class="mx-2" show-arrows :style="{ width: '100%', height: '100%' }">
          <template v-slot:prev="{ on, attrs }">
            <v-btn small icon color="white" v-bind="attrs" v-on="on">
              <v-icon>arrow_left</v-icon>
            </v-btn>
          </template>
          <template v-slot:next="{ on, attrs }">
            <v-btn small icon color="white" v-bind="attrs" v-on="on">
              <v-icon>arrow_right</v-icon>
            </v-btn>
          </template>
          <v-window-item v-for="(comment, idx) in note.comments" :key="`comment-card-${idx}`">
            <v-card color="d-flex justify-center background px-10 py-3" :height="226.66">
              <CommentCard :comment="comment" />
            </v-card>
          </v-window-item>
        </v-window>
      </div>
      <v-divider></v-divider>
      <div class="d-flex justify-space-between align-center">
        <div class="d-flex align-center">
          <UserAvatar class="ml-3 mr-2" :firstname="'Brian'" :lastname="'Yin'" :size="35" />
          <v-list-item-content>
            <v-list-item-title>{{
              `${note.owner.firstName} ${note.owner.lastName}`
            }}</v-list-item-title>
            <v-list-item-subtitle>{{ note.owner.subtitle }}</v-list-item-subtitle>
          </v-list-item-content>
        </div>
        <v-btn class="mr-3" color="primary">Open</v-btn>
      </div>
    </v-card>
  </div>
</template>

<script>
import { unixTimeToDate } from "@/includes/utils";
import CommentCard from "@/components/CommentCard.vue";
import UserAvatar from "@/components/UserAvatar.vue";

export default {
  name: "CommunityNote",
  components: { CommentCard, UserAvatar },
  props: {
    note: {
      type: Object,
      required: true,
    },
  },
  methods: {
    unixTimeToDate,
  },
};
</script>

<style>
.note-preview {
  max-width: 200px;
  width: 100%;
  height: 100%;
}

.community-note-card .v-window__prev,
.community-note-card .v-window__next {
  margin: 5px !important;
}
</style>
