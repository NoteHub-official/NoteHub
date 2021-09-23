<template>
  <v-sheet elevation="4" rounded="lg">
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
          <v-menu offset-y>
            <template v-slot:activator="{ on, attrs }">
              <v-btn text class="text-capitalize" rounded v-bind="attrs" v-on="on">
                <v-icon left>share</v-icon>
                Share by {{ sharedUser ? sharedUser : "All users" }}
                <v-icon>arrow_drop_down</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item
                v-for="(item, index) in sharedUsers"
                :key="index"
                @click="sharedUser = item.userName"
              >
                <v-list-item-title>{{
                  item.userName ? item.userName : "All users"
                }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
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
        <v-row justify="center" align="center" class="notegrid-row">
          <v-col
            cols="12"
            xs="6"
            sm="6"
            md="4"
            lg="3"
            xl="3"
            v-for="(note, idx) in notes"
            :key="idx"
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
          noteId: 1234,
          noteTitle: "Note Title",
          dataUrl: "https://www.google.com",
          createdAt: "2021-02-23",
          likeCount: 12,
          viewCount: 45,
          commentCount: 56,
          owner: "Brian Yin",
          ownerId: 104,
        },
        {
          noteId: 1234,
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
          noteId: 1234,
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
          noteId: 1234,
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
          noteId: 1234,
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
          noteId: 1234,
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
          noteId: 1234,
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
          noteId: 1234,
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
          noteId: 1234,
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
          noteId: 1234,
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
          noteId: 1234,
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
          noteId: 1234,
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
          noteId: 1234,
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
          noteId: 1234,
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
          noteId: 1234,
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
      sharedUsers: [
        {},
        { userId: 100, userName: "Brian Yin", type: "Shared by" },
        { userId: 100, userName: "ASD ASD", type: "Shared by" },
        { userId: 100, userName: "ASD ACACCSA", type: "Shared by" },
      ],
      sharedUser: "",
    };
  },
};
</script>

<style>
.notegrid-row {
  min-height: 408px;
}

.notegrid-toolbar {
  height: 60px !important;
}
</style>
