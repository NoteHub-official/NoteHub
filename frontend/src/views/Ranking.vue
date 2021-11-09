<template>
  <v-container class="background" :style="{ minHeight: '100%' }">
    <v-row dense v-if="!loading">
      <v-col v-for="(user, i) in users" :key="i" cols="6">
        <v-card>
          <div class="d-flex">
            <div class="ma-5 mr-0">
              <UserAvatar
                :firstname="user.firstName"
                :lastname="user.lastName"
                :avatarUrl="user.avatarUrl"
                :size="50"
              />
            </div>
            <div>
              <v-card-title class="text-h5 ma-0"
                >{{ user.firstName }} {{ user.lastName }}</v-card-title
              >
              <v-card-subtitle class="text-h7" v-text="user.subtitle"></v-card-subtitle>
              <v-icon left class="ml-3" size="20">mdi-thumb-up</v-icon>
              <span>{{ user.likeCount }}</span>
              <v-icon left class="ml-6" size="20">mdi-eye</v-icon>
              <span>{{ user.commentCount }}</span>
              <v-card-actions>
                <v-btn class="my-2" block outlined small>
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
import UserAvatar from "@/components/UserAvatar.vue";

export default {
  data() {
    return {
      loading: true,
      users: [],
    };
  },
  components: {
    UserAvatar,
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
