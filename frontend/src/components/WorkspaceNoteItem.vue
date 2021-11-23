<template>
  <div>
    <v-list-item link class="pa-0" two-line dense>
      <v-icon size="18" left class="ma-0 pa-2">mdi-file-document-outline</v-icon>
      <v-list-item-content>
        <v-list-item-title class="d-flex text-caption pr-2">
          <span class="d-inline-block text-truncate font-weight-medium" style="max-width: 120px">
            {{ note.noteTitle }}
          </span>
          <v-spacer></v-spacer>
          <p class="info--text lighten pa-0 ma-0">{{ unixTimeToDate(note.createdAt) }}</p>
        </v-list-item-title>
        <v-list-item-subtitle class="d-flex text-caption">
          {{ note.owner.firstName + " " + note.owner.lastName }}
        </v-list-item-subtitle>
      </v-list-item-content>

      <!-- <v-list-item-action class="pr-1">
      <v-btn icon>
        <v-icon size="20">more_horiz</v-icon>
      </v-btn>
    </v-list-item-action> -->
    </v-list-item>
    <v-divider class="ml-8"></v-divider>
  </div>
</template>

<script>
import { unixTimeToDate } from "@/includes/utils";

export default {
  name: "WorkspaceNoteItem",
  props: {
    note: {
      type: Object,
      required: true,
    },
  },
  methods: {
    unixTimeToDate,
  },
};
</script>

<style></style>
