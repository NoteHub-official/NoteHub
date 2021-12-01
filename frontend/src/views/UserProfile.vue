<template>
  <div class="d-flex justify-center">
    <v-card style="width: 80%">
      <div
          class="pt-8"
          style="height: 200px"
          :class="{ light: !this.$vuetify.theme.dark, dark: this.$vuetify.theme.dark }"
        >
        <div class="d-flex justify-center">
          <UserAvatar 
          :firstname="user.firstname"
          :lastname="user.lastname"
          :avatarUrl="user.avatarUrl"
          :size="100"
        />
        </div>
        <div class="d-flex justify-center">
          <div>{{ `${user.firstname} ${user.lastname}`}} </div>
          <div class="ml-3">  User Level: {{ currentLevel }}</div>
        </div>
      </div>
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

<style>

.dark {
  background-color: rgb(30, 30, 30);
  box-shadow: 0 80px 0px 0px rgb(105, 209, 125) inset;
}
.light {
  background-color: white;
  box-shadow: 0 80px 0px 0px rgb(77, 166, 255) inset;
}

</style>
