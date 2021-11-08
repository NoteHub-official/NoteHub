<template>
  <div>
    <div class="py-4 px-2 background" v-for="note in notes" :key="note.noteId">
      <CommunityNote :note="note" />
    </div>
  </div>
</template>

<script>
import CommunityNote from "@/components/CommunityNote.vue";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "CommunityNoteList",
  components: { CommunityNote },
  props: {
    popular: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      topRankingNotes: [],
    };
  },
  methods: {},
  computed: {
    ...mapActions(["getTopRankingNotes"]),
    ...mapGetters(["communityNotes", "topRankingNotes"]),
    notes() {
      return this.popular ? this.topRankingNotes : this.communityNotes;
    },
  },
  mounted() {
    if (this.popular) {
      this.topRankingNotes = this.getTopRankingNotes();
    }
  },
};
</script>

<style></style>
