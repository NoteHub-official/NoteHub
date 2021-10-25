<template>
  <v-list two-line dense>
    <div v-for="(role, idx) in roles" :key="role.role">
      <v-subheader class="ml-2">
        <v-icon left size="20">{{ role.icon }}</v-icon>
        {{ role.role }}
      </v-subheader>
      <div v-for="(user, idx1) in role.users" :key="`${user.name}-${idx}-${idx1}`">
        <v-list-group>
          <template v-slot:activator>
            <UserAvatar class="mr-3" :firstname="'Brian'" :lastname="'Yin'" :size="35" />
            <v-list-item-content>
              <v-list-item-title>{{ `${user.firstName} ${user.lastName}` }}</v-list-item-title>
              <v-list-item-subtitle>{{ user.subtitle }}</v-list-item-subtitle>
            </v-list-item-content>
          </template>
          <template v-slot:appendIcon>
            <v-icon>expand_more</v-icon>
          </template>
          <v-list-item>
            <v-list-item-content>
              <v-card class="appbar rounded-0">
                <v-card-text class="subtitle px-3 py-2 pb-0 white--text"
                  >User Information
                </v-card-text>
                <v-card-text class="px-3 pt-3">
                  <v-list-item-subtitle class="mb-2 d-flex three-lines align-start">
                    <v-icon left small>email</v-icon>
                    {{ user.email }}
                  </v-list-item-subtitle>
                  <v-list-item-subtitle class="d-flex three-lines align-start">
                    <v-icon left small>work</v-icon>
                    {{ user.subtitle }}
                  </v-list-item-subtitle>
                </v-card-text>
              </v-card>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
        <v-divider class="ml-15"></v-divider>
      </div>
    </div>
  </v-list>
</template>

<script>
import UserAvatar from "./UserAvatar.vue";

export default {
  name: "MemberList",
  components: { UserAvatar },
  data() {
    return {
      roles: [
        {
          role: "Owner",
          icon: "psychology",
          users: [
            {
              userId: 1,
              firstName: "Brian",
              lastName: "Yin",
              avatarUrl: "https://cdn.vuetifyjs.com/images/lists/5.jpg",
              subtitle: "Student at University of Illinois Urbana-Champaign",
              email: "toubatbrian@gmail.com",
            },
          ],
        },
        {
          role: "Manager",
          icon: "manage_accounts",
          users: [
            {
              userId: 1,
              firstName: "Brian",
              lastName: "Yin",
              avatarUrl: "https://cdn.vuetifyjs.com/images/lists/5.jpg",
              subtitle: "Software Developer adasdasdadad",
              email: "toubatbrian@gmail.com",
            },
            {
              userId: 1,
              firstName: "Brian",
              lastName: "Yin",
              avatarUrl: "https://cdn.vuetifyjs.com/images/lists/5.jpg",
              subtitle: "Software Developer adasdasdadad",
              email: "toubatbrian@gmail.com",
            },
            {
              userId: 1,
              firstName: "Brian",
              lastName: "Yin",
              avatarUrl: "https://cdn.vuetifyjs.com/images/lists/5.jpg",
              subtitle: "Software Developer adasdasdadad",
              email: "toubatbrian@gmail.com",
            },
          ],
        },
        {
          role: "Members",
          icon: "groups",
          users: [
            {
              userId: 1,
              firstName: "Brian",
              lastName: "Yin",
              avatarUrl: "https://cdn.vuetifyjs.com/images/lists/5.jpg",
              subtitle: "Software Developer adasdasdadad",
              email: "toubatbrian@gmail.com",
            },
            {
              userId: 1,
              firstName: "Brian",
              lastName: "Yin",
              avatarUrl: "https://cdn.vuetifyjs.com/images/lists/5.jpg",
              subtitle: "Software Developer adasdasdadad",
              email: "toubatbrian@gmail.com",
            },
            {
              userId: 1,
              firstName: "Brian",
              lastName: "Yin",
              avatarUrl: "https://cdn.vuetifyjs.com/images/lists/5.jpg",
              subtitle: "Software Developer adasdasdadad",
              email: "toubatbrian@gmail.com",
            },
            {
              userId: 1,
              firstName: "Brian",
              lastName: "Yin",
              avatarUrl: "https://cdn.vuetifyjs.com/images/lists/5.jpg",
              subtitle: "Software Developer adasdasdadad",
              email: "toubatbrian@gmail.com",
            },
            {
              userId: 1,
              firstName: "Brian",
              lastName: "Yin",
              avatarUrl: "https://cdn.vuetifyjs.com/images/lists/5.jpg",
              subtitle: "Software Developer adasdasdadad",
              email: "toubatbrian@gmail.com",
            },
          ],
        },
      ],
    };
  },
};
</script>

<style></style>
