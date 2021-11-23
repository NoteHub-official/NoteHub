<template>
  <div>
    <v-menu v-model="menu" offset-x min-width="100">
      <!-- eslint-disable -->
      <template v-slot:activator="{ on, attrs }">
        <v-list-item
          link
          class="pa-0"
          two-line
          dense
          @contextmenu.prevent="handleRightClick()"
          @click="enterWorkspace()"
        >
          <v-icon size="18" left class="ma-0 pa-2">mdi-file-document-outline</v-icon>
          <v-list-item-content>
            <v-list-item-title class="d-flex text-caption pr-2">
              <span
                class="d-inline-block text-truncate font-weight-medium"
                style="max-width: 140px"
              >
                {{ note.noteTitle }}
              </span>
              <v-spacer></v-spacer>
              <p class="info--text lighten pa-0 ma-0">{{ unixTimeToDate(note.createdAt) }}</p>
            </v-list-item-title>
            <v-list-item-subtitle
              class="d-inline-block text-truncate text-caption"
              style="max-width: 200px"
            >
              Owned by: {{ note.owner.firstName + " " + note.owner.lastName }}
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </template>
      <NoteActionMenu :note="note" />
    </v-menu>

    <v-divider class="ml-8"></v-divider>
  </div>
</template>

<script>
import { unixTimeToDate } from "@/includes/utils";
import NoteActionMenu from "./NoteActionMenu.vue";

export default {
  name: "WorkspaceNoteItem",
  components: {
    NoteActionMenu,
  },
  props: {
    note: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      menu: false,
      items: [
        { title: "Click Me" },
        { title: "Click Me" },
        { title: "Click Me" },
        { title: "Click Me 2" },
      ],
    };
  },
  methods: {
    unixTimeToDate,
    handleRightClick() {
      console.log("asdasda");
      this.menu = true;
    },
    enterWorkspace() {
      this.$router.push({ name: "workspace", params: { id: this.note.dataId } });
    },
  },
};
</script>

<style></style>
