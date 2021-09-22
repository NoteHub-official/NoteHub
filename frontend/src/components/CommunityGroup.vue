<template>
  <v-sheet elevation="4" rounded="lg">
    <div class="px-8 pt-4 d-flex justify-center align-center">
      <div class="px-0 pb-0" style="width: 250px;">
        <v-text-field
          v-model="searchContent"
          label="search community"
          prepend-inner-icon="search"
          outlined
          dense
          hide-details="auto"
          clear-icon="highlight_off"
          clearable
        ></v-text-field>
      </div>
      <v-spacer v-show="!$vuetify.breakpoint.xs"></v-spacer>
      <v-btn outlined color="primary" v-show="!$vuetify.breakpoint.xs" @click="handleJoinCommunity">
        <v-icon left>add</v-icon>
        Join New
      </v-btn>
    </div>
    <v-slide-group class="pa-0 community-group" show-arrows>
      <v-slide-item
        v-for="(community, idx) in matchedCommunities"
        :key="idx"
        v-slot="{ active, toggle }"
      >
        <CommunityCard
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

export default {
  name: "CommunityGroup",
  components: { CommunityCard },
  data() {
    return {
      searchContent: "",
      communities: [
        {
          communityId: 12345,
          name: "Community Name",
          description:
            " Lorem ipsum dolor sit amet, consectetur adip Lorem ips Lorem Lorem ipsum dolor sit amet, consectetur adip Lorem ips Lorem Lorem ipsum dolor sit amet, consectetur adip Lorem ips Lorem Lorem ipsum dolor sit amet, consectetur adip Lorem ips Lorem",
          createdAt: "2021-02-24",
          members: 543,
          owner: "John Smith",
          photo: "https://cdn.vuetifyjs.com/images/cards/house.jpg",
        },
        {
          communityId: 67890,
          name: "ABC",
          description:
            " Lorem ipsum dolor sit amet, consectetur adip Lorem ips Lorem Lorem ipsum dolor sit amet, consectetur adip Lorem ips Lorem Lorem ipsum dolor sit amet, consectetur adip Lorem ips Lorem Lorem ipsum dolor sit amet, consectetur adip Lorem ips Lorem",
          createdAt: "2021-02-24",
          members: 543,
          owner: "John Smith",
          photo: "https://cdn.vuetifyjs.com/images/cards/house.jpg",
        },
        {
          communityId: 12345,
          name: "CDE",
          description:
            " Lorem ipsum dolor sit amet, consectetur adip Lorem ips Lorem Lorem ipsum dolor sit amet, consectetur adip Lorem ips Lorem Lorem ipsum dolor sit amet, consectetur adip Lorem ips Lorem Lorem ipsum dolor sit amet, consectetur adip Lorem ips Lorem",
          createdAt: "2021-02-24",
          members: 543,
          owner: "John Smith",
          photo: "https://cdn.vuetifyjs.com/images/cards/house.jpg",
        },
        {
          communityId: 12345,
          name: "DEF",
          description:
            " Lorem ipsum dolor sit amet, consectetur adip Lorem ips Lorem Lorem ipsum dolor sit amet, consectetur adip Lorem ips Lorem Lorem ipsum dolor sit amet, consectetur adip Lorem ips Lorem Lorem ipsum dolor sit amet, consectetur adip Lorem ips Lorem",
          createdAt: "2021-02-24",
          members: 543,
          owner: "John Smith",
          photo: "https://cdn.vuetifyjs.com/images/cards/house.jpg",
        },
        {
          communityId: 12345,
          name: "Community Name",
          description:
            " Lorem ipsum dolor sit amet, consectetur adip Lorem ips Lorem Lorem ipsum dolor sit amet, consectetur adip Lorem ips Lorem Lorem ipsum dolor sit amet, consectetur adip Lorem ips Lorem Lorem ipsum dolor sit amet, consectetur adip Lorem ips Lorem",
          createdAt: "2021-02-24",
          members: 543,
          owner: "John Smith",
          photo: "https://cdn.vuetifyjs.com/images/cards/house.jpg",
        },
        {
          communityId: 12345,
          name: "Community Name",
          description:
            " Lorem ipsum dolor sit amet, consectetur adip Lorem ips Lorem Lorem ipsum dolor sit amet, consectetur adip Lorem ips Lorem Lorem ipsum dolor sit amet, consectetur adip Lorem ips Lorem Lorem ipsum dolor sit amet, consectetur adip Lorem ips Lorem",
          createdAt: "2021-02-24",
          members: 543,
          owner: "John Smith",
          photo: "https://cdn.vuetifyjs.com/images/cards/house.jpg",
        },
        {
          communityId: 12345,
          name: "Community Name",
          description:
            " Lorem ipsum dolor sit amet, consectetur adip Lorem ips Lorem Lorem ipsum dolor sit amet, consectetur adip Lorem ips Lorem Lorem ipsum dolor sit amet, consectetur adip Lorem ips Lorem Lorem ipsum dolor sit amet, consectetur adip Lorem ips Lorem",
          createdAt: "2021-02-24",
          members: 543,
          owner: "John Smith",
          photo: "https://cdn.vuetifyjs.com/images/cards/house.jpg",
        },
        {
          communityId: 12345,
          name: "Community Name",
          description:
            " Lorem ipsum dolor sit amet, consectetur adip Lorem ips Lorem Lorem ipsum dolor sit amet, consectetur adip Lorem ips Lorem Lorem ipsum dolor sit amet, consectetur adip Lorem ips Lorem Lorem ipsum dolor sit amet, consectetur adip Lorem ips Lorem",
          createdAt: "2021-02-24",
          members: 543,
          owner: "John Smith",
          photo: "https://cdn.vuetifyjs.com/images/cards/house.jpg",
        },
      ],
    };
  },
  methods: {
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
    matchedCommunities() {
      return this.communities.filter((community) =>
        community.name.toLowerCase().includes(this.searchContent.toLowerCase())
      );
    },
  },
};
</script>

<style>
.community-group {
  height: 475px;
}

.v-slide-group__next,
.v-slide-group__prev {
  min-width: 30px !important;
  padding: 5px !important;
}
</style>
