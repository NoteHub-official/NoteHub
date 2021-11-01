<template>
  <v-card class="overflow-hidden rounded-0 background" v-if="community" elevation="0">
    <v-app-bar app color="primary" src="https://picsum.photos/1920/1080?random" :height="50">
      <template v-slot:img="{ props }">
        <v-img
          v-bind="props"
          gradient="to top right, rgba(79, 79, 79, 0.6), rgba(79, 79, 79, 0.6)"
        ></v-img>
      </template>
      <v-app-bar-nav-icon v-if="$vuetify.breakpoint.xs"></v-app-bar-nav-icon>
      <v-card-title class="white--text font-weight-bold">{{ community.name }}</v-card-title>
      <v-spacer></v-spacer>
      <!-- Light/Dark Mode -->
      <v-btn class="ma-2 mr-0" text icon color="white" @click="toggleTheme">
        <v-tooltip bottom v-if="!$vuetify.theme.dark">
          <template v-slot:activator="{ on, attrs }">
            <v-icon class="white--text mx-2" :size="20" v-on="on" v-bind="attrs"
              >brightness_medium</v-icon
            >
          </template>
          <span>dark mode</span>
        </v-tooltip>
        <v-tooltip bottom v-else>
          <template v-slot:activator="{ on, attrs }">
            <v-icon class="white--text mx-3" v-on="on" v-bind="attrs">
              brightness_high
            </v-icon>
          </template>
          <span>light mode</span>
        </v-tooltip>
      </v-btn>
      <template v-slot:extension>
        <v-tabs v-model="tab" align-with-title>
          <v-tab
            class="text-capitalize white--text font-weight-bold"
            v-for="tab in tabs"
            :key="tab.tabName"
          >
            {{ tab.tabName }}
          </v-tab>
        </v-tabs>
      </template>
    </v-app-bar>
    <v-container :style="{ paddingTop: '30px', height: '2000px', maxWidth: '1050px' }">
      <v-tabs-items v-model="tab">
        <v-tab-item v-for="item in items" :key="item">
          <CommunityNoteList />
        </v-tab-item>
      </v-tabs-items>
    </v-container>
  </v-card>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import CommunityNoteList from "@/components/CommunityNoteList.vue";

export default {
  name: "Community",
  components: { CommunityNoteList },
  data() {
    return {
      community: null,
      tab: 0,
      tabs: [{ tabName: "Notebooks" }, { tabName: "Top Ranking" }, { tabName: "Chat Channels" }],
      items: ["web", "shopping", "videos", "images", "news"],
    };
  },
  methods: {
    ...mapActions(["initCommunityState", "initCommunityNotes"]),
    toggleTheme() {
      // localStorage.setItem("darkTheme", this.$vuetify.theme.dark);
      const theme = this.$vuetify.theme.dark;
      this.$vuetify.theme.dark = !theme;
      this.$store.commit("toggleTheme");
      localStorage.setItem("darkTheme", !theme);
    },
  },
  async created() {
    if (!this.communitiesInitialized) {
      // get params from route
      await this.initCommunityState();
    }
    const { id } = this.$route.params;
    await this.initCommunityNotes(id);
    this.community = this.$store.state.community.communities.find(
      (community) => community.communityId === parseInt(this.$route.params.id)
    );
  },
  computed: {
    ...mapGetters(["communitiesInitialized", "communityNotes"]),
  },
};
</script>

<style></style>
