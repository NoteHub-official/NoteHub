<template>
  <v-sheet elevation="4" rounded="lg">
    <v-card width="100%">
      <v-toolbar class="notegrid-toolbar px-1 d-flex align-center justify-center">
        <div class="px-4 pb-0" :style="'width: 100%;'" v-if="!$vuetify.breakpoint.xs">
          <v-text-field
            v-model="searchContent"
            label="search title"
            prepend-inner-icon="search"
            outlined
            hide-details="auto"
            clear-icon="highlight_off"
            clearable
            dense
            @click:clear="searchContent = ''"
          ></v-text-field>
        </div>
        <v-spacer v-if="!$vuetify.breakpoint.smAndDown"></v-spacer>
        <div class="px-0 pb-0">
          <v-menu offset-y>
            <template v-slot:activator="{ on, attrs }">
              <v-btn text class="text-capitalize" v-bind="attrs" v-on="on">
                <v-icon left>share</v-icon>
                {{ shareInfo() }}
                <v-icon right size="30">arrow_drop_down</v-icon>
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
        <v-spacer v-if="!$vuetify.breakpoint.smAndDown"></v-spacer>
        <div class="px-4 pb-0" style="width: 100%;" v-if="!$vuetify.breakpoint.smAndDown">
          <v-select
            offset-y
            v-model="selectedCategories"
            :items="categories"
            multiple
            label="filter by category"
            hide-details="auto"
            prepend-inner-icon="filter_list"
            outlined
            dense
          >
            <template v-slot:selection="{ item, index }">
              <div class="overflow-hidden text-truncate" v-if="index === 0">
                <v-chip small>
                  <span>{{ item }}</span>
                </v-chip>
                <span class="grey--text text-caption">
                  (+{{ selectedCategories.length - 1 }} others)
                </span>
              </div>
            </template>
          </v-select>
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
            v-for="(note, idx) in filteredNotes()"
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
          categories: ["Computer Science"],
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
          categories: ["Computer Science"],
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
          categories: ["Computer Science"],
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
          categories: ["Computer Science"],
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
          categories: ["Computer Science"],
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
          categories: ["Computer Science"],
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
          categories: ["Computer Science"],
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
          categories: ["Computer Science"],
        },
      ],
      sharedUsers: [
        { ownerId: 104, name: "Brian Yin" },
        { ownerId: 102, name: "Boquan Yin" },
        { ownerId: 103, name: "Toubat Brian" },
        { ownerId: 105, name: "Lucheng Qing" },
      ],
      sharedIdx: 0,
      categories: ["Physics", "Math", "Computer Science", "Chemistry"],
      selectedCategories: ["Computer Science"],
    };
  },
  computed: {
    ...mapGetters(["currentUser"]),
  },
  methods: {
    shareInfo() {
      return this.currentUser.userId === this.sharedUsers[this.sharedIdx].ownerId
        ? "Owned by " + this.sharedUsers[this.sharedIdx].name
        : "Shared by " + this.sharedUsers[this.sharedIdx].name;
    },
    intersect(categories) {
      if (this.selectedCategories.length == 0) return true;
      for (let category of this.selectedCategories) {
        if (categories.includes(category)) return true;
      }
      return false;
    },
    filteredNotes() {
      return this.notes
        .filter((note) => note.noteTitle.toLowerCase().includes(this.searchContent.toLowerCase()))
        .filter((note) => this.intersect(note.categories));
    },
  },
};
</script>

<style>
.notegrid-row {
  min-height: 408px;
}

.notegrid-toolbar .v-toolbar__content {
  width: 100%;
  display: flex;
  justify-content: center;
}

.notegrid-toolbar {
  height: 60px !important;
  width: 100%;
}
</style>
