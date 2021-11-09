<template>
  <div>
    <div class="py-4 px-2 background" v-for="note in notes" :key="note.noteId">
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
  props: {
    popular: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    ...mapGetters(["communityNotes", "topRankingNotes"]),
    notes() {
      return this.popular ? this.topRankingNotes : this.communityNotes;
    },
  },
};
</script>

<style></style>
