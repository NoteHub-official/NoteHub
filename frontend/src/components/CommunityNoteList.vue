<template>
  <div>
    <CommunityNote v-for="note in communityNotes" :key="note" />
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
