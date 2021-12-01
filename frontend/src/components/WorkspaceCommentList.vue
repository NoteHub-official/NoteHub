<template>
  <div class="fill-height listBackground pt-1" style="width: 320px">
    <WorkspaceHeadline icon="comment" title="comment" v-if="!reply" />
    <template v-else>
      <v-card elevation="0">
        <v-card-title class="pa-0 pl-1 info--text" style="font-size: 1em">
          <v-btn icon @click="resetReply()">
            <v-icon>first_page</v-icon>
          </v-btn>
          Reply to {{ repliedComment.user.firstName + " " + repliedComment.user.lastName }}
        </v-card-title>
      </v-card>
      <v-divider></v-divider>
    </template>
    <v-list
      ref="listRef"
      :class="`fill-height pa-0 overflow-auto workspace-comment-list${reply ? '-reply' : ''}`"
    >
      <div v-for="comment in computedComments" :key="comment.commentId">
        <WorkspaceCommentItem
          :comment="comment"
          :reply.sync="reply"
          :repliedComment.sync="repliedComment"
        />
        <v-divider class="mt-2"></v-divider>
      </div>
    </v-list>
    <v-divider></v-divider>
    <v-card :elevation="0" c>
      <v-card-text class="pa-3">
        <v-textarea
          dense
          v-model="commentMessage"
          class="text-body1"
          filled
          :label="commentLabel"
          rows="3"
          placeholder="Anything want to share?"
          no-resize
          hide-details
        ></v-textarea>
        <v-btn
          class="mt-3 primary--text"
          block
          outlined
          @click="submitCommentMessage()"
          :disabled="commentMessage.length === 0"
          :loading="submitting"
        >
          <v-icon left>send</v-icon>
          Send Message
        </v-btn>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from "vuex";
import WorkspaceHeadline from "@/components/WorkspaceHeadline.vue";
import WorkspaceCommentItem from "@/components/WorkspaceCommentItem.vue";

export default {
  name: "WorkspaceCommentList",
  components: { WorkspaceHeadline, WorkspaceCommentItem },
  data() {
    return {
      commentMessage: "",
      submitting: false,
      listRef: null,
      commentLabel: "Write a comment...",
      defaultCommentLabel: "Write a comment...",
      reply: false,
      repliedComment: null,
    };
  },
  methods: {
    ...mapActions(["addCommentById", "getWorkspaceComments"]),
    ...mapMutations(["snackbarSuccess", "snackbarError", "updateComment"]),
    async submitCommentMessage() {
      this.submitting = true;
      try {
        await this.addCommentById({
          noteId: this.$route.params.id,
          userId: this.currentUser.user.userId,
          content: this.commentMessage,
          parentId: this.reply ? this.repliedComment.commentId : null,
          likeCount: 0,
        });
        this.commentMessage = "";

        await this.getWorkspaceComments(this.$route.params.id);
        // update replied comments if necessary
        if (this.repliedComment !== null) {
          this.repliedComment = this.workspaceComments.find(
            (comment) => comment.commentId === this.repliedComment.commentId
          );
        }
        this.snackbarSuccess("Comment added!");
        // TODO: scroll list to the bottom of the list (deprecated)
        // this.$refs.listRef.scrollTop = this.$refs.listRef.scrollHeight;
      } catch (e) {
        console.log(e);
        this.snackbarError("Failed to add comment!");
      }
      this.submitting = false;
    },
    resetReply() {
      this.reply = false;
      this.commentLabel = this.defaultCommentLabel;
      this.repliedComment = null;
    },
  },
  computed: {
    ...mapGetters(["currentUser", "workspaceComments"]),
    computedComments() {
      return this.reply ? this.repliedComment.replies : this.workspaceComments;
    },
  },
  watch: {
    reply(newVal) {
      if (newVal) {
        this.commentLabel =
          "Reply to " +
          this.repliedComment.user.firstName +
          " " +
          this.repliedComment.user.lastName;
      } else {
        this.commentLabel = this.defaultCommentLabel;
      }
    },
  },
};
</script>

<style>
.workspace-comment-list {
  height: calc(100% - 205px);
}

.workspace-comment-list-reply {
  height: calc(100% - 218px);
}

.workspace-replies {
  border-radius: 5px;
}

.two-lines {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  white-space: normal;
}
</style>
