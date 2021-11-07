<template>
  <div>
    <v-card elevation="2" class="community-note-card" width="900">
      <div class="d-flex align-center">
        <v-card-title class="text-h6 pa-4 py-2 font-weight-medium info--text one-line">
          {{ note.noteTitle }}
        </v-card-title>
        <v-spacer></v-spacer>
        <v-menu offset-y left bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon large v-if="currentUser.userId === note.owner.userId"
              ><v-icon v-bind="attrs" v-on="on">more_horiz</v-icon>
            </v-btn>
          </template>
          <v-list dense class="pa-0">
            <v-list-item class="pa-0">
              <v-btn
                class="text-capitalize d-flex justify-start info--text"
                text
                style="width: 100%;"
                @click="removeNote()"
              >
                <v-icon left>delete</v-icon>
                Remove Note
              </v-btn>
            </v-list-item>
          </v-list>
        </v-menu>
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
        <v-window
          class="mx-2"
          show-arrows
          :style="{ width: '100%', height: '100%' }"
          v-if="note.comments.length > 0"
        >
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
        <v-card
          color="d-flex justify-center align-center flex-column background px-10 py-3 mx-2"
          :height="226.66"
          :style="{ width: '100%' }"
          elevation="0"
          v-else
        >
          <v-icon size="50">
            comments_disabled
          </v-icon>
          <span class="subheading">
            No comments yet
          </span>
        </v-card>
      </div>
      <v-divider></v-divider>
      <div class="d-flex justify-space-between align-center">
        <div class="d-flex align-center">
          <UserAvatar
            class="ml-3 mr-2"
            :firstname="note.owner.firstName"
            :lastname="note.owner.lastName"
            :size="35"
          />
          <v-list-item-content>
            <v-list-item-title>
              {{ `${note.owner.firstName} ${note.owner.lastName}` }}
            </v-list-item-title>
            <v-list-item-subtitle>{{ note.owner.subtitle }}</v-list-item-subtitle>
          </v-list-item-content>
        </div>
        <v-spacer></v-spacer>
        <div class="d-flex ma-0 px-3 pb-2 pt-2 align-center">
          <v-btn icon>
            <v-icon :size="21" @click="incrementLike()">
              thumb_up_off_alt
            </v-icon>
          </v-btn>
          <span class="subheading mr-3">{{ note.likeCount || 0 }}</span>
          <v-btn icon>
            <v-icon :size="23">
              visibility
            </v-icon>
          </v-btn>
          <span class="subheading mr-3">{{ note.viewCunt || 0 }}</span>
          <v-btn icon>
            <v-icon :size="20">
              insert_comment
            </v-icon>
          </v-btn>
          <span class="subheading">{{ note.commentCount || 0 }}</span>
        </div>
        <v-btn class="mx-3" color="primary" elevation="0" @click="openNotebook">Open</v-btn>
      </div>
    </v-card>
  </div>
</template>

<script>
import { unixTimeToDate } from "@/includes/utils";
import CommentCard from "@/components/CommentCard.vue";
import UserAvatar from "@/components/UserAvatar.vue";
import { mapGetters, mapActions, mapMutations } from "vuex";

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
    ...mapActions(["removeNoteFromCommunityById", "incrementLikeByNoteId"]),
    ...mapMutations(["snackbarInfo", "snackbarError"]),
    unixTimeToDate,
    openNotebook() {
      this.$router.push({
        name: "workspace",
        params: {
          id: this.note.dataId,
        },
      });
    },
    async removeNote() {
      try {
        await this.removeNoteFromCommunityById(this.note.noteId);
        this.snackbarInfo("Note removed");
      } catch (e) {
        console.log(e.message);
        this.snackbarError("Error removing note");
      }
    },
    async incrementLike() {
      try {
        await this.incrementLikeByNoteId(this.note.noteId);
        this.snackbarInfo("Like incremented");
      } catch (e) {
        console.log(e.message);
        this.snackbarError("Error incrementing like");
      }
    },
  },
  computed: {
    ...mapGetters(["currentUser"]),
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

.one-line {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  white-space: normal;
}
</style>
