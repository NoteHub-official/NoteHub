<template>
  <v-sheet class="notegrid-content" elevation="4" rounded="lg">
    <v-card width="100%">
      <v-toolbar class="px-1">
        <div
          class="px-4 pb-0"
          :style="!$vuetify.breakpoint.xs ? 'width: 30%; max-width: 350px;' : 'width: 100%;'"
        >
          <v-text-field
            v-model="searchContent"
            label="search title"
            prepend-inner-icon="search"
            outlined
            dense
            hide-details="auto"
            clear-icon="highlight_off"
            clearable
            @click:clear="searchContent = ''"
            rounded
          ></v-text-field>
        </div>
        <v-spacer v-if="!$vuetify.breakpoint.xs"></v-spacer>
        <div class="px-0 pb-0" v-show="!$vuetify.breakpoint.xs">
          <v-btn text class="text-capitalize" rounded>
            <v-icon left>share</v-icon>
            Share by Brian Yin
            <v-icon>arrow_drop_down</v-icon>
          </v-btn>
        </div>
        <v-spacer v-if="!$vuetify.breakpoint.xs"></v-spacer>
        <div class="px-0 pb-0" style="width: 30%; max-width: 350px;" v-if="!$vuetify.breakpoint.xs">
          <v-select
            label="filter by category"
            hide-details="auto"
            prepend-inner-icon="filter_list"
            outlined
            dense
            rounded
          ></v-select>
        </div>
      </v-toolbar>
      <v-card-text>
        <v-row justify="center" align="center">
          <v-col
            cols="12"
            xs="6"
            sm="6"
            md="4"
            lg="3"
            xl="3"
            v-for="note in notes"
            :key="note.noteTitle"
            class="d-flex justify-center"
          >
            <NotexCard :note="note" />
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-sheet>
</template>

<script>
import NotexCard from "@/components/NotexCard.vue";

export default {
  name: "NotebookGrid",
  components: { NotexCard },
  data() {
    return {
      searchContent: "",
      notes: [
        {
          nodeId: 1234,
          noteTitle: "Note Title",
          dataUrl: "https://www.google.com",
          createdAt: "2021-02-23",
          likeCount: 12,
          viewCount: 45,
          commentCount: 56,
          owner: "Brian Yin",
          ownerId: 123,
        },
        {
          nodeId: 1234,
          noteTitle: "Note Title",
          dataUrl: "https://www.google.com",
          createdAt: "2021-02-23",
          likeCount: 12,
          viewCount: 45,
          commentCount: 56,
          owner: "Brian Yin",
          ownerId: 123,
        },
        {
          nodeId: 1234,
          noteTitle: "Note Title",
          dataUrl: "https://www.google.com",
          createdAt: "2021-02-23",
          likeCount: 12,
          viewCount: 45,
          commentCount: 56,
          owner: "Brian Yin",
          ownerId: 123,
        },
        {
          nodeId: 1234,
          noteTitle: "Note Title",
          dataUrl: "https://www.google.com",
          createdAt: "2021-02-23",
          likeCount: 12,
          viewCount: 45,
          commentCount: 56,
          owner: "Brian Yin",
          ownerId: 123,
        },
        {
          nodeId: 1234,
          noteTitle: "Note Title",
          dataUrl: "https://www.google.com",
          createdAt: "2021-02-23",
          likeCount: 12,
          viewCount: 45,
          commentCount: 56,
          owner: "Brian Yin",
          ownerId: 123,
        },
        {
          nodeId: 1234,
          noteTitle: "Note Title",
          dataUrl: "https://www.google.com",
          createdAt: "2021-02-23",
          likeCount: 12,
          viewCount: 45,
          commentCount: 56,
          owner: "Brian Yin",
          ownerId: 123,
        },
        {
          nodeId: 1234,
          noteTitle: "Note Title",
          dataUrl: "https://www.google.com",
          createdAt: "2021-02-23",
          likeCount: 12,
          viewCount: 45,
          commentCount: 56,
          owner: "Brian Yin",
          ownerId: 123,
        },
        {
          nodeId: 1234,
          noteTitle: "Note Title",
          dataUrl: "https://www.google.com",
          createdAt: "2021-02-23",
          likeCount: 12,
          viewCount: 45,
          commentCount: 56,
          owner: "Brian Yin",
          ownerId: 123,
        },
        {
          nodeId: 1234,
          noteTitle: "Note Title",
          dataUrl: "https://www.google.com",
          createdAt: "2021-02-23",
          likeCount: 12,
          viewCount: 45,
          commentCount: 56,
          owner: "Brian Yin",
          ownerId: 123,
        },
        {
          nodeId: 1234,
          noteTitle: "Note Title",
          dataUrl: "https://www.google.com",
          createdAt: "2021-02-23",
          likeCount: 12,
          viewCount: 45,
          commentCount: 56,
          owner: "Brian Yin",
          ownerId: 123,
        },
        {
          nodeId: 1234,
          noteTitle: "Note Title",
          dataUrl: "https://www.google.com",
          createdAt: "2021-02-23",
          likeCount: 12,
          viewCount: 45,
          commentCount: 56,
          owner: "Brian Yin",
          ownerId: 123,
        },

        {
          nodeId: 1234,
          noteTitle: "Note Title",
          dataUrl: "https://www.google.com",
          createdAt: "2021-02-23",
          likeCount: 12,
          viewCount: 45,
          commentCount: 56,
          owner: "Brian Yin",
          ownerId: 123,
        },
        {
          nodeId: 1234,
          noteTitle: "Note Title",
          dataUrl: "https://www.google.com",
          createdAt: "2021-02-23",
          likeCount: 12,
          viewCount: 45,
          commentCount: 56,
          owner: "Brian Yin",
          ownerId: 123,
        },
        {
          nodeId: 1234,
          noteTitle: "Note Title",
          dataUrl: "https://www.google.com",
          createdAt: "2021-02-23",
          likeCount: 12,
          viewCount: 45,
          commentCount: 56,
          owner: "Brian Yin",
          ownerId: 123,
        },
        {
          nodeId: 1234,
          noteTitle: "Note Title",
          dataUrl: "https://www.google.com",
          createdAt: "2021-02-23",
          likeCount: 12,
          viewCount: 45,
          commentCount: 56,
          owner: "Brian Yin",
          ownerId: 123,
        },
      ],
    };
  },
};
</script>

<style>
.notegrid-toolbar {
  height: 60px !important;
}

.notegrid-content {
  min-height: 450px;
}
</style>
