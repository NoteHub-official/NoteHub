<template>
  <div>
    <div class="py-4 px-2 background" v-for="note in communityNotes" :key="note.noteId">
      <CommunityNote :note="note" />
    </div>
  </div>
</template>

<script>
import CommunityNote from "@/components/CommunityNote.vue";
import { mapGetters } from "vuex";

export default {
  name: "CommunityNoteList",
  components: { CommunityNote },
  data() {
    return {};
  },
  methods: {},
  computed: {
    ...mapGetters(["communityNotes"]),
  },
};
</script>

<style></style>
