<template>
  <v-container style="background-color:white">
    <v-row dense>
        <v-col
          v-for="(user, i) in users"
          :key="i"
          cols="6"
        >
          <v-card>
            <div class="d-flex">
                <div class="ma-2">
                    <v-avatar
                        size="125"
                    >
                        <v-img :src="user.avatarUrl"></v-img>
                    </v-avatar>
                </div>
              <div>
                <v-card-title
                  class="text-h5 ma-0"
                >{{user.firstName}} {{user.lastName}}</v-card-title>


                <v-card-subtitle class="text-h7" v-text="user.subtitle"></v-card-subtitle>

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

                  <v-btn
                    v-else
                    class="ml-2 mt-5"
                    outlined
                    rounded
                    small
                  >
                    Follow
                  </v-btn>
                </v-card-actions>
              </div>
            </div>
          </v-card>
        </v-col>
      </v-row>
  </v-container>
</template>

<script>
export default {
    data(){
        return {
            users: [
                {   userId: "AAawffLCZRLOcknyKUZzFgGhHiaY",
                    firstName: "William",
                    lastName: "Adams",
                    subtitle: "Civil engineer, consulting",
                    email: "xhart@yahoo.com",
                    avatarUrl: "https://cdn.vuetifyjs.com/images/parallax/material2.jpg",
                },
                {   userId: "AAawffLCZRLOcknyKUZzFgGhHiaY",
                    firstName: "William",
                    lastName: "Adams",
                    subtitle: "Civil engineer, consulting",
                    email: "xhart@yahoo.com",
                    avatarUrl: "https://cdn.vuetifyjs.com/images/parallax/material2.jpg",
                },
                {   userId: "AAawffLCZRLOcknyKUZzFgGhHiaY",
                    firstName: "William",
                    lastName: "Adams",
                    subtitle: "Civil engineer, consulting",
                    email: "xhart@yahoo.com",
                    avatarUrl: "https://cdn.vuetifyjs.com/images/parallax/material2.jpg",
                },
                {   userId: "AAawffLCZRLOcknyKUZzFgGhHiaY",
                    firstName: "William",
                    lastName: "Adams",
                    subtitle: "Civil engineer, consulting",
                    email: "xhart@yahoo.com",
                    avatarUrl: "https://cdn.vuetifyjs.com/images/parallax/material2.jpg",
                },
                {   userId: "AAawffLCZRLOcknyKUZzFgGhHiaY",
                    firstName: "William",
                    lastName: "Adams",
                    subtitle: "Civil engineer, consulting",
                    email: "xhart@yahoo.com",
                    avatarUrl: "https://cdn.vuetifyjs.com/images/parallax/material2.jpg",
                },
                {   userId: "AAawffLCZRLOcknyKUZzFgGhHiaY",
                    firstName: "William",
                    lastName: "Adams",
                    subtitle: "Civil engineer, consulting",
                    email: "xhart@yahoo.com",
                    avatarUrl: "https://cdn.vuetifyjs.com/images/parallax/material2.jpg",
                },
                {   userId: "AAawffLCZRLOcknyKUZzFgGhHiaY",
                    firstName: "William",
                    lastName: "Adams",
                    subtitle: "Civil engineer, consulting",
                    email: "xhart@yahoo.com",
                    avatarUrl: "https://cdn.vuetifyjs.com/images/parallax/material2.jpg",
                },
                {   userId: "AAawffLCZRLOcknyKUZzFgGhHiaY",
                    firstName: "William",
                    lastName: "Adams",
                    subtitle: "Civil engineer, consulting",
                    email: "xhart@yahoo.com",
                    avatarUrl: "https://cdn.vuetifyjs.com/images/parallax/material2.jpg",
                },
                {   userId: "AAawffLCZRLOcknyKUZzFgGhHiaY",
                    firstName: "William",
                    lastName: "Adams",
                    subtitle: "Civil engineer, consulting",
                    email: "xhart@yahoo.com",
                    avatarUrl: "https://cdn.vuetifyjs.com/images/parallax/material2.jpg",
                },
                {   userId: "AAawffLCZRLOcknyKUZzFgGhHiaY",
                    firstName: "William",
                    lastName: "Adams",
                    subtitle: "Civil engineer, consulting",
                    email: "xhart@yahoo.com",
                    avatarUrl: "https://cdn.vuetifyjs.com/images/parallax/material2.jpg",
                },
            ]
        }
    }

}
</script>

<style>

</style>