<template>
  <div>
    <v-card style="width: 100%">
      <v-img src="../assets/profile-background.png">
        <UserAvatar
        :firstname="user.firstname"
        :lastname="user.lastname"
        :avatarUrl="user.avatarUrl"
        :size="50"
        />
        <p>{{ `${user.firstname} ${user.lastname}` }}</p>
        <p>{{ currentLevel }}</p>
      </v-img>
    </v-card>
  </div>
</template>

<script>
import UserAvatar from "../components/UserAvatar.vue";
import { mapActions, mapGetters} from "vuex";
export default {
  components: {
    UserAvatar
  },
  computed: {
    ...mapGetters(['currentLevel']),
    user() {
      return this.$store.state.auth.currentUser;
    },
  },
  data(){
    return {
      //userLevel: 0
    }
  },
  methods: {
    ...mapActions(['getLevel'])
  },
  mounted(){
    this.getLevel(this.$store.state.auth.currentUser.userId)
  }
};
</script>

<style></style>
