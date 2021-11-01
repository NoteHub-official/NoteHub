<template>
  <v-sheet elevation="4" rounded="lg">
    <v-toolbar class="notegrid-toolbar d-flex align-center justify-center" :elevation="1">
      <div class="px-0 pb-0" :style="'width: 100%;'">
        <v-text-field
          v-model="searchContent"
          label="Search Community"
          append-icon="search"
          outlined
          dense
          hide-details="auto"
          clear-icon="highlight_off"
          clearable
          @click:clear="searchContent = ''"
        ></v-text-field>
      </div>
      <v-spacer v-show="!$vuetify.breakpoint.xs"></v-spacer>
      <v-btn
        outlined
        color="primary"
        class="ml-3"
        v-show="!$vuetify.breakpoint.xs"
        @click="handleJoinCommunity"
      >
        <v-icon left>add</v-icon>
        Join New
      </v-btn>
    </v-toolbar>

    <v-slide-group class="pa-0 pb-1 community-group" show-arrows v-if="initializing">
      <v-slide-item v-for="(loader, idx) in [1, 2, 3, 4]" :key="`loader-${idx}`">
        <v-sheet class="pa-3 ma-3" rounded>
          <v-skeleton-loader
            width="270"
            height="330"
            type="card-heading, image, list-item-two-line"
          ></v-skeleton-loader>
        </v-sheet>
      </v-slide-item>
    </v-slide-group>
    <v-slide-group
      class="pa-0 pb-1 community-group"
      show-arrows
      v-else-if="!$vuetify.breakpoint.xs"
    >
      <v-slide-item
        v-for="(community, idx) in matchedCommunities"
        :key="idx"
        v-slot="{ active, toggle }"
      >
        <CommunityCard
          class="ml-4"
          :active="active"
          :toggle="toggle"
          :community="community"
          @leave-community="handleDeleteCommunity"
          @enter-community="handleEnterCommunity"
        />
      </v-slide-item>
    </v-slide-group>
    <v-window
      class="pa-0 pb-1 community-group"
      show-arrows
      :style="{ width: '100%', height: '100%' }"
      v-else
    >
      <template v-slot:prev="{ on, attrs }">
        <v-btn icon color="white" v-bind="attrs" v-on="on">
          <v-icon>arrow_left</v-icon>
        </v-btn>
      </template>
      <template v-slot:next="{ on, attrs }">
        <v-btn icon color="white" v-bind="attrs" v-on="on">
          <v-icon>arrow_right</v-icon>
        </v-btn>
      </template>
      <v-window-item v-for="(community, idx) in matchedCommunities" :key="idx">
        <div class="d-flex justify-center">
          <CommunityCard
            :active="active"
            :toggle="toggle"
            :community="community"
            @leave-community="handleDeleteCommunity"
            @enter-community="handleEnterCommunity"
          />
        </div>
      </v-window-item>
    </v-window>
  </v-sheet>
</template>

<script>
import CommunityCard from "@/components/CommunityCard.vue";
import { mapGetters, mapActions, mapMutations } from "vuex";

export default {
  name: "CommunityGroup",
  components: { CommunityCard },
  data() {
    return {
      searchContent: "",
    };
  },
  methods: {
    ...mapMutations(["snackbarInfo"]),
    ...mapActions(["initCommunityState", "leaveCommunityById"]),
    async handleDeleteCommunity(community) {
      // delete community by id
      await this.leaveCommunityById({
        communityId: community.communityId,
        userId: this.currentUser.userId,
      });
      this.snackbarInfo(`You are no longer be the member of ${community.name}`);
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
    ...mapGetters(["communities", "currentUser", "communitiesInitialized"]),
    matchedCommunities() {
      return this.communities.filter((community) =>
        community.name.toLowerCase().includes(this.searchContent.toLowerCase())
      );
    },
    initializing() {
      return !this.communitiesInitialized;
    },
  },
  async mounted() {
    if (!this.communitiesInitialized) {
      console.log("Initializing Communities...");
      await this.initCommunityState();
    }
  },
};
</script>

<style>
.community-group {
  min-height: 290px;
}
.v-slide-group__next,
.v-slide-group__prev {
  min-width: 30px !important;
  padding: 5px !important;
  flex: none;
}

.notegrid-toolbar .v-toolbar__content {
  width: 100%;
  display: flex;
  justify-content: center;
}
</style>
