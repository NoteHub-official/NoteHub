<template>
  <v-list-item
    class="d-flex flex-column px-3 workspace-comment-item"
    style="min-height: 0 !important"
  >
    <div class="d-flex" style="width: 100%">
      <div class="d-flex align-start" style="width: 100%">
        <UserAvatar
          class="mt-2"
          :firstname="comment.user.firstName"
          :lastname="comment.user.lastName"
          :avatarUrl="comment.user.avatarUrl"
          :size="36"
        />
        <v-list-item two-line dense class="pl-3 pr-0">
          <v-list-item-content class="py-0">
            <v-list-item-title class="primary--text ma-0 pa-0">
              {{ comment.user.firstName + " " + comment.user.lastName }}
            </v-list-item-title>
            <div class="d-flex align-center">
              <v-list-item-subtitle class="d-inline-block">
                {{ unixTimeToDate(comment.createdAt) }}
              </v-list-item-subtitle>
              <div class="d-flex">
                <div class="d-flex align-center text-caption">
                  <v-menu offset-y>
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn icon small v-bind="attrs" v-on="on">
                        <v-icon size="14">more_horiz</v-icon>
                      </v-btn>
                    </template>
                    <v-list dense class="pa-0">
                      <v-list-item
                        class="py-0"
                        link
                        dense
                        v-for="(action, index) in actions"
                        :key="`${comment.commentId}-${action.title}-${index}`"
                        @click="action.click()"
                      >
                        <v-list-item-title>{{ action.title }}</v-list-item-title>
                      </v-list-item>
                    </v-list>
                  </v-menu>
                </div>
                <div class="d-flex align-center text-caption pr-1">
                  <v-btn icon small>
                    <v-icon size="14">thumb_up</v-icon>
                  </v-btn>
                  {{ comment.likeCount }}
                </div>
                <div class="d-flex align-center text-caption" v-if="!reply">
                  <v-btn icon small>
                    <v-icon size="14">comment</v-icon>
                  </v-btn>
                  {{ comment.replies.length }}
                </div>
                <div class="d-flex align-center text-caption" v-if="!reply">
                  <v-btn icon small @click="replyToComment(comment)">
                    <v-icon size="14">reply</v-icon>
                  </v-btn>
                </div>
              </div>
            </div>
          </v-list-item-content>
        </v-list-item>
      </div>
    </div>
    <!-- Content -->
    <div style="width: 100%; overflow: hidden; margin-bottom: -1em">
      <p class="info--text" style="font-size: 0.8em" v-show="!editingContent">{{ content }}</p>
      <v-textarea
        class="mt-1 mb-4"
        v-model="content"
        v-show="editingContent"
        outlined
        hide-details
        dense
        auto-grow
        style="font-size: 0.8em"
        @keydown.enter="updateCommentConent()"
      />
    </div>
    <!-- Replies -->
    <div
      class="workspace-replies background py-1 mt-2 mb-1"
      style="width: 100%; font-size: 0.8em"
      v-if="!reply && comment.replies.length !== 0"
    >
      <v-list-item-content
        class="px-2 py-0"
        v-for="reply in comment.replies.slice(0, 3)"
        :key="reply.commentId"
      >
        <p class="two-lines mb-0 pt-1 text-caption" style="line-height: 1.3">
          <span class="primary--text">Brian Yin:</span> {{ reply.content }}
        </p>
      </v-list-item-content>
      <div class="d-flex justify-center" v-if="comment.replies.length > 3">
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              icon
              small
              style="width: 20px; height: 20px"
              v-on="on"
              v-bind="attrs"
              @click="replyToComment()"
            >
              <v-icon>arrow_drop_down</v-icon>
            </v-btn>
          </template>
          <span>Show all replies</span>
        </v-tooltip>
      </div>
    </div>
  </v-list-item>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from "vuex";
import UserAvatar from "./UserAvatar.vue";
import { unixTimeToDate } from "@/includes/utils";

export default {
  name: "WorkspaceCommentItem",
  props: {
    comment: {
      type: Object,
      required: true,
    },
    reply: {
      type: Boolean,
      required: true,
    },
    repliedComment: {
      required: true,
    },
  },
  data() {
    return {
      actions: [{ title: "Edit Content", click: this.editContent }],
      content: this.comment.content,
      editingContent: false,
    };
  },
  components: {
    UserAvatar,
  },
  methods: {
    ...mapActions(["updateCommentContentById"]),
    ...mapMutations(["snackbarSuccess", "snackbarError"]),
    unixTimeToDate,
    async replyToComment() {
      this.$emit("update:reply", true);
      this.$emit("update:repliedComment", this.comment);
    },
    editContent() {
      this.editingContent = true;
    },
    async updateCommentConent() {
      // remove trailing spaces
      if (this.content.trim() === "") {
        this.snackbarError("Content cannot be empty");
        return;
      }
      try {
        await this.updateCommentContentById({
          commentId: this.comment.commentId,
          content: this.content,
        });
        this.comment.content = this.content;
        this.snackbarSuccess("Comment updated");
      } catch (error) {
        this.content = this.comment.content;
        this.snackbarError("Failed to update comment");
        console.log(error);
      }
      this.editingContent = false;
    },
  },
  computed: {
    ...mapGetters(["currentUser"]),
  },
};
</script>

<style></style>
