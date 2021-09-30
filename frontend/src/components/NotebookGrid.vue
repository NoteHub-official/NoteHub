<template>
  <v-sheet elevation="4" rounded="lg">
    <v-card width="100%">
      <v-toolbar class="notegrid-toolbar px-1 d-flex align-center justify-center" elevation="1">
        <!-- Keyword Search Filter -->
        <div class="pr-4 pb-0" :style="'width: 100%;'" v-if="!$vuetify.breakpoint.xs">
          <v-text-field
            v-model="searchContent"
            label="Search Title"
            append-icon="search"
            outlined
            hide-details="auto"
            clear-icon="highlight_off"
            clearable
            dense
            @click:clear="searchContent = ''"
          ></v-text-field>
        </div>
        <v-spacer v-if="!$vuetify.breakpoint.smAndDown"></v-spacer>
        <!-- Shared Person Filter -->
        <div class="px-0 pb-0">
          <v-menu offset-y>
            <template v-slot:activator="{ on, attrs }">
              <v-btn text class="text-capitalize" v-bind="attrs" v-on="on">
                <v-icon left>share</v-icon>
                {{ sharedIdx !== null ? shareMessage : "All Documents" }}
                <v-icon right size="30">arrow_drop_down</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item class="font-weight-medium" @click="sharedIdx = null">
                <v-icon left>apps</v-icon>
                <v-list-item-title> All Documents</v-list-item-title>
              </v-list-item>
              <v-divider></v-divider>
              <v-list-item
                v-for="(user, index) in sharedUsers"
                :key="index"
                @click="sharedIdx = index"
              >
                <v-icon left>account_circle</v-icon>
                <v-list-item-title>{{ getFullName(user) }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </div>
        <v-spacer v-if="!$vuetify.breakpoint.smAndDown"></v-spacer>
        <!-- Category Filter -->
        <div class="pl-4 pb-0" style="width: 100%;" v-if="!$vuetify.breakpoint.smAndDown">
          <v-select
            offset-y
            v-model="selectedCategories"
            :items="categories"
            multiple
            label="Filter Category"
            hide-details="auto"
            append-icon="filter_list"
            outlined
            dense
          >
            <template v-slot:selection="{ item, index }">
              <div class="overflow-hidden text-truncate" v-if="index === 0">
                <v-chip small close @click:close="selectedCategories.shift()">
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
      <!-- Notebook Grid -->
      <v-card-text>
        <v-row justify="center" align="center" class="notegrid-row" v-if="initializing">
          <v-col
            cols="12"
            xs="6"
            sm="6"
            md="4"
            lg="3"
            xl="3"
            v-for="(note, idx) in [1, 2, 3, 4]"
            :key="`note-loader-${idx}`"
            class="d-flex justify-center"
          >
            <v-skeleton-loader
              type="list-item-avatar-two-line, card, text"
              width="250"
              height="384"
            >
            </v-skeleton-loader>
          </v-col>
        </v-row>
        <v-row justify="center" align="center" class="notegrid-row" v-else>
          <v-col
            cols="12"
            xs="6"
            sm="6"
            md="4"
            lg="3"
            xl="3"
            v-for="(note, idx) in filteredNotes"
            :key="idx"
            class="d-flex justify-center"
          >
            <NotexCard :note="note" @delete-note="deleteNote" @edit-note-title="editNoteTitle" />
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-sheet>
</template>

<script>
import NotexCard from "@/components/NotexCard.vue";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "NotebookGrid",
  components: { NotexCard },
  data() {
    return {
      initializing: true,
      searchContent: "",
      sharedIdx: 0,
      categories: ["Physics", "Math", "Computer Science", "Chemistry"],
      selectedCategories: [],
    };
  },
  computed: {
    ...mapGetters(["currentUser", "sharedUsers", "notes"]),
    shareMessage() {
      if (this.sharedUsers.length === 0)
        return `Owned By ${this.currentUser.firstname} ${this.currentUser.lastname}`;
      return this.currentUser.userId === this.sharedUsers[this.sharedIdx].userId
        ? "Owned by " + this.getFullName(this.sharedUsers[this.sharedIdx])
        : "Shared by " + this.getFullName(this.sharedUsers[this.sharedIdx]);
    },
    filteredNotes() {
      return this.notes
        .filter((note) => note.noteTitle.toLowerCase().includes(this.searchContent.toLowerCase()))
        .filter((note) => this.intersect(note.categories))
        .filter(
          (note) =>
            this.sharedIdx === null || note.ownerId === this.sharedUsers[this.sharedIdx].userId
        );
    },
  },
  methods: {
    ...mapActions(["initNoteState", "editNoteTitleById", "deleteNoteAccessById"]),
    intersect(categories) {
      if (this.selectedCategories.length == 0) return true;
      for (let category of this.selectedCategories) {
        if (!categories.includes(category)) return false;
      }
      return true;
    },
    getFullName(user) {
      return `${user.firstName} ${user.lastName}`;
    },
    async deleteNote(payload) {
      await this.deleteNoteAccessById(payload);
    },
    async editNoteTitle(payload) {
      await this.editNoteTitleById(payload);
    },
  },
  mounted() {
    setTimeout(() => {
      this.initNoteState();
      this.initializing = false;
    }, 1000);
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
