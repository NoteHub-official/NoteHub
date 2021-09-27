<template>
  <v-sheet elevation="4" rounded="lg">
    <div class="pl-7 pr-8 pt-4 pb-1 d-flex justify-center align-center">
      <div class="px-0 pb-0" :style="!$vuetify.breakpoint.xs ? 'width: 250px;' : 'width: 100%;'">
        <v-text-field
          v-model="searchContent"
          label="search community"
          prepend-inner-icon="search"
          outlined
          dense
          hide-details="auto"
          clear-icon="highlight_off"
          clearable
          @click:clear="searchContent = ''"
        ></v-text-field>
      </div>
      <v-spacer v-show="!$vuetify.breakpoint.xs"></v-spacer>
      <v-btn outlined color="primary" v-show="!$vuetify.breakpoint.xs" @click="handleJoinCommunity">
        <v-icon left>add</v-icon>
        Join New
      </v-btn>
    </div>

    <v-slide-group class="pa-0 pb-1 community-group" show-arrows v-if="initializing">
      <v-slide-item v-for="(loader, idx) in [1, 2, 3, 4, 5, 6, 7, 8, 9]" :key="`loader-${idx}`">
        <v-sheet class="pa-3 ma-3" rounded>
          <v-skeleton-loader
            width="270"
            height="330"
            type="card-heading, image, list-item-two-line"
          ></v-skeleton-loader>
        </v-sheet>
      </v-slide-item>
    </v-slide-group>
    <v-slide-group class="pa-0 pb-1 community-group" show-arrows v-else>
      <v-slide-item
        v-for="(community, idx) in matchedCommunities"
        :key="idx"
        v-slot="{ active, toggle }"
      >
        <CommunityCard
          class="mx-3"
          :active="active"
          :toggle="toggle"
          :community="community"
          @leave-community="handleDeleteCommunity"
          @enter-community="handleEnterCommunity"
        />
      </v-slide-item>
    </v-slide-group>
  </v-sheet>
</template>

<script>
import CommunityCard from "@/components/CommunityCard.vue";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "CommunityGroup",
  components: { CommunityCard },
  data() {
    return {
      initializing: true,
      searchContent: "",
    };
  },
  methods: {
    ...mapActions(["initCommunityState"]),
    handleDeleteCommunity(community) {
      // delete community by id
      console.log(community.communityId);
    },
    handleEnterCommunity(community) {
      // enter community by id
      this.$router.push({ name: "community", params: { id: community.communityId } });
    },
    handleJoinCommunity() {
      // simply direct user to search communities page
      this.$router.push({ name: "communities" });
    },
  },
  computed: {
    ...mapGetters(["communities"]),
    matchedCommunities() {
      return this.communities.filter((community) =>
        community.name.toLowerCase().includes(this.searchContent.toLowerCase())
      );
    },
  },
  mounted() {
    setTimeout(() => {
      this.initCommunityState();
      this.initializing = false;
    }, 2000);
  },
};
</script>

<style>
.community-group {
  min-height: 360px;
}
.v-slide-group__next,
.v-slide-group__prev {
  min-width: 30px !important;
  padding: 5px !important;
}
</style>
