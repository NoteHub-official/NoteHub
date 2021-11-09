<template>
  <v-container style="background-color:white">
    <v-row dense v-if="!loading">
      <v-col v-for="(user, i) in users" :key="i" cols="6">
        <v-card>
          <div class="d-flex">
            <div class="ma-2">
              <v-avatar size="100">
                <v-img :src="user.avatarUrl"></v-img>
              </v-avatar>
            </div>
            <div>
              <v-card-title class="text-h5 ma-0"
                >{{ user.firstName }} {{ user.lastName }}</v-card-title
              >

              <v-card-subtitle class="text-h7" v-text="user.subtitle"></v-card-subtitle>
              <v-icon class="ml-3">mdi-thumb-up</v-icon><span>{{ user.likeCount }}</span>
              <v-icon class="ml-6">mdi-eye</v-icon><span>{{ user.commentCount }}</span>

              <v-card-actions>
                <v-btn
                  v-if="user.artist === 'Ellie Goulding'"
                  class="ml-2 mt-3"
                  fab
                  icon
                  height="40px"
                  right
                  width="40px"
                >
                  <v-icon>mdi-play</v-icon>
                </v-btn>

                <v-btn v-else class="ml-2 mt-5" outlined rounded small>
                  Follow
                </v-btn>
              </v-card-actions>
            </div>
          </div>
        </v-card>
      </v-col>
    </v-row>
    <div class="text-center" v-else>
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
    </div>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      loading: true,
      users: [],
    };
  },
  computed: {
    ...mapGetters(["returnPopularUser"]),
  },
  methods: {
    ...mapActions(["getPopularUser"]),
    fetchData() {
      this.getPopularUser();
      setTimeout(() => {
        this.loading = false;
        this.users = this.returnPopularUser;
      }, 1000);
    },
  },
  created() {
    this.fetchData();
  },
};
</script>

<style></style>
