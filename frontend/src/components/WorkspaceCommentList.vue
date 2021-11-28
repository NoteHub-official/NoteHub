<template>
  <div width="300" class="fill-height listBackground pt-1">
    <WorkspaceHeadline icon="comment" title="comment" />

    <v-list class="fill-height pa-0 overflow-auto workspace-comment-list">
      <div v-for="comment in comments" :key="comment.commentId">
        <v-list-item class="d-flex flex-column px-3" style="min-height: 0 !important">
          <div class="d-flex" style="width: 100%">
            <div class="d-flex align-start" style="width: 100%">
              <UserAvatar
                class="mt-2"
                :firstname="currentUser.firstname"
                :lastname="currentUser.lastname"
                :avatarUrl="currentUser.avatarUrl"
                :size="36"
              />
              <v-list-item two-line dense class="pl-3 pr-0">
                <v-list-item-content class="py-0">
                  <v-list-item-title class="primary--text ma-0 pa-0">
                    {{ currentUser.firstname + " " + currentUser.lastname }}
                  </v-list-item-title>
                  <div class="d-flex align-center">
                    <v-list-item-subtitle class="d-inline-block">
                      {{ unixTimeToDate(comment.createdAt) }}
                    </v-list-item-subtitle>
                    <div class="d-flex">
                      <div class="d-flex align-center text-caption pr-1">
                        <v-btn icon small>
                          <v-icon size="14">thumb_up</v-icon>
                        </v-btn>
                        {{ comment.likeCount }}
                      </div>
                      <div class="d-flex align-center text-caption">
                        <v-btn icon small> <v-icon size="14">comment</v-icon> </v-btn>
                        {{ comment.commentCount }}
                      </div>
                    </div>
                  </div>
                </v-list-item-content>
              </v-list-item>
            </div>
          </div>
          <div class="info--text" style="width: 100%; font-size: 0.8em">
            {{ comment.content }}
          </div>
          <div class="workspace-replies background pt-1 my-2" style="width: 100%; font-size: 0.8em">
            <v-list-item-content
              class="px-2 py-0"
              v-for="comment in comments.slice(0, 3)"
              :key="comment.commentId"
            >
              <p class="two-lines mb-0 pt-1 text-caption" style="line-height: 1.3">
                <span class="primary--text">Brian Yin:</span> {{ comment.content }}
              </p>
            </v-list-item-content>
            <div class="d-flex justify-center pb-1">
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn icon small style="width: 20px; height: 20px" v-on="on" v-bind="attrs">
                    <v-icon>arrow_drop_down</v-icon>
                  </v-btn>
                </template>
                <span>Show all replies</span>
              </v-tooltip>
            </div>
          </div>
        </v-list-item>
        <v-divider class="my-1"></v-divider>
      </div>
    </v-list>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { unixTimeToDate } from "@/includes/utils";
import UserAvatar from "./UserAvatar.vue";
import WorkspaceHeadline from "@/components/WorkspaceHeadline.vue";

export default {
  name: "WorkspaceCommentList",
  components: { UserAvatar, WorkspaceHeadline },
  data() {
    return {
      comments: [
        {
          commentId: 1,
          content:
            "Using the margin helper classes in a flexbox container, you can control the positioning of flex items on the x-axis or y-axis when using flex-row or flex-column respectively. Using the margin helper classes in a flexbox container, you can control the positioning of flex items on the x-axis or y-axis when using flex-row or flex-column respectively.",
          createdAt: 1638080880420,
          likeCount: 123,
          commentCount: 323,
        },
        {
          commentId: 2,
          content:
            "Using the margin helper classes in a flexbox container, you can control the positioning of flex items on the x-axis or y-axis when using flex-row or flex-column respectively.",
          createdAt: 1638080880420,
          likeCount: 123,
          commentCount: 323,
        },
        {
          commentId: 3,
          content:
            "Using the margin helper classes in a flexbox container, you can control the positioning of flex items on the x-axis or y-axis when using flex-row or flex-column respectively.",
          createdAt: 1638080880420,
          likeCount: 123,
          commentCount: 323,
        },
        {
          commentId: 4,
          content:
            "Using the margin helper classes in a flexbox container, you can control the positioning of flex items on the x-axis or y-axis when using flex-row or flex-column respectively.",
          createdAt: 1638080880420,
          likeCount: 123,
          commentCount: 323,
        },
        {
          commentId: 1,
          content:
            "Using the margin helper classes in a flexbox container, you can control the positioning of flex items on the x-axis or y-axis when using flex-row or flex-column respectively. Using the margin helper classes in a flexbox container, you can control the positioning of flex items on the x-axis or y-axis when using flex-row or flex-column respectively.",
          createdAt: 1638080880420,
          likeCount: 123,
          commentCount: 323,
        },
        {
          commentId: 2,
          content:
            "Using the margin helper classes in a flexbox container, you can control the positioning of flex items on the x-axis or y-axis when using flex-row or flex-column respectively.",
          createdAt: 1638080880420,
          likeCount: 123,
          commentCount: 323,
        },
        {
          commentId: 3,
          content:
            "Using the margin helper classes in a flexbox container, you can control the positioning of flex items on the x-axis or y-axis when using flex-row or flex-column respectively.",
          createdAt: 1638080880420,
          likeCount: 123,
          commentCount: 323,
        },
        {
          commentId: 4,
          content:
            "Using the margin helper classes in a flexbox container, you can control the positioning of flex items on the x-axis or y-axis when using flex-row or flex-column respectively.",
          createdAt: 1638080880420,
          likeCount: 123,
          commentCount: 323,
        },
        {
          commentId: 1,
          content:
            "Using the margin helper classes in a flexbox container, you can control the positioning of flex items on the x-axis or y-axis when using flex-row or flex-column respectively. Using the margin helper classes in a flexbox container, you can control the positioning of flex items on the x-axis or y-axis when using flex-row or flex-column respectively.",
          createdAt: 1638080880420,
          likeCount: 123,
          commentCount: 323,
        },
        {
          commentId: 2,
          content:
            "Using the margin helper classes in a flexbox container, you can control the positioning of flex items on the x-axis or y-axis when using flex-row or flex-column respectively.",
          createdAt: 1638080880420,
          likeCount: 123,
          commentCount: 323,
        },
        {
          commentId: 3,
          content:
            "Using the margin helper classes in a flexbox container, you can control the positioning of flex items on the x-axis or y-axis when using flex-row or flex-column respectively.",
          createdAt: 1638080880420,
          likeCount: 123,
          commentCount: 323,
        },
        {
          commentId: 4,
          content:
            "Using the margin helper classes in a flexbox container, you can control the positioning of flex items on the x-axis or y-axis when using flex-row or flex-column respectively.",
          createdAt: 1638080880420,
          likeCount: 123,
          commentCount: 323,
        },
      ],
    };
  },
  methods: {
    unixTimeToDate,
  },
  computed: {
    ...mapGetters(["getWorkspaceComments", "currentUser"]),
  },
};
</script>

<style>
.workspace-comment-list {
  height: calc(100% - 25px);
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
