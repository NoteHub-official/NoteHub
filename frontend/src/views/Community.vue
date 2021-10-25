<template>
  <v-card class="overflow-hidden rounded-0 background" v-if="community" elevation="0">
    <v-app-bar app color="primary" dark src="https://picsum.photos/1920/1080?random" :height="50">
      <template v-slot:img="{ props }">
        <v-img
          v-bind="props"
          gradient="to top right, rgba(79, 79, 79, 0.6), rgba(79, 79, 79, 0.6)"
        ></v-img>
      </template>
      <v-app-bar-nav-icon v-if="$vuetify.breakpoint.xs"></v-app-bar-nav-icon>
      <v-card-title>{{ community.name }}</v-card-title>
      <v-spacer></v-spacer>
      <!-- Light/Dark Mode -->
      <v-btn class="ma-2 mr-0" text icon color="white" @click="toggleTheme">
        <v-tooltip bottom v-if="theme !== 'dark'">
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
          <v-tab class="text-capitalize" v-for="tab in tabs" :key="tab.tabName">
            {{ tab.tabName }}
          </v-tab>
        </v-tabs>
      </template>
    </v-app-bar>
    <v-container :style="{ paddingTop: '30px', height: '2000px', maxWidth: '1050px' }">
      <v-tabs-items v-model="tab">
        <v-tab-item v-for="item in items" :key="item">
          <v-card flat>
            <v-card-text v-text="text"></v-card-text>
          </v-card>
        </v-tab-item>
      </v-tabs-items>
    </v-container>
  </v-card>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "Community",
  data() {
    return {
      community: null,
      tab: 0,
      tabs: [{ tabName: "Notebooks" }, { tabName: "Top Ranking" }, { tabName: "Chat Channels" }],
      items: ["web", "shopping", "videos", "images", "news"],
      text:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    };
  },
  methods: {
    ...mapActions(["initCommunityState"]),
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
      await this.initCommunityState();
    }
    this.community = this.$store.state.community.communities.find(
      (community) => community.communityId === parseInt(this.$route.params.id)
    );
  },
  computed: {
    ...mapGetters(["communitiesInitialized"]),
  },
};
</script>

<style></style>
