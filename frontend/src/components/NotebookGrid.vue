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
              <v-btn text class="text-capitalize" v-bind="attrs" v-on="on">
                <v-icon left>share</v-icon>
                {{
                  `${
                    currentUser.userId === sharedUsers[sharedIdx].ownerId ? "Owned by" : "Shared by"
                  } ${sharedUsers[sharedIdx].name}`
                }}
                <v-icon>arrow_drop_down</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item
                v-for="(item, index) in sharedUsers"
                :key="index"
                @click="sharedIdx = index"
              >
                <v-list-item-title>{{ item.name }}</v-list-item-title>
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
import { mapGetters } from "vuex";

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
        { ownerId: 104, name: "Brian Yin" },
        { ownerId: 102, name: "Boquan Yin" },
        { ownerId: 103, name: "Toubat Brian" },
        { ownerId: 105, name: "Lucheng Qing" },
      ],
      sharedIdx: 0,
    };
  },
  computed: {
    ...mapGetters(["currentUser"]),
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
