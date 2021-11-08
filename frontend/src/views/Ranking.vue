<template>

  <v-container style="background-color:white">
    <v-row dense v-if="!loading">
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
      <div class="text-center" v-else>
        <v-progress-circular
        indeterminate
        color="primary"
        ></v-progress-circular>
      </div>
  </v-container>
</template>

<script>
// import { mapActions, mapGetters } from "vuex";
export default {
    data(){
        return {
            loading: true,
            users: [
                {   userId: "AAawffLCZRLOcknyKUZzFgGhHiaY",
                    firstName: "William",
                    lastName: "Leach",
                    subtitle: "Civil engineer, consulting",
                    email: "xhart@yahoo.com",
                    avatarUrl: "https://cdn.vuetifyjs.com/images/parallax/material2.jpg",
                },
                {   userId: "AAawffLCZRLOcknyKUZzFgGhHiaY",
                    firstName: "Gary",
                    lastName: "Ward",
                    subtitle: "Museum/gallery exhibitions officer",
                    email: "xhart@yahoo.com",
                    avatarUrl: "https://cdn.vuetifyjs.com/images/parallax/material2.jpg",
                },
                {   userId: "AAawffLCZRLOcknyKUZzFgGhHiaY",
                    firstName: "Mark",
                    lastName: "Rosario",
                    subtitle: "Sales professional, IT",
                    email: "xhart@yahoo.com",
                    avatarUrl: "https://cdn.vuetifyjs.com/images/parallax/material2.jpg",
                },
                {   userId: "AAawffLCZRLOcknyKUZzFgGhHiaY",
                    firstName: "Michael",
                    lastName: "Wolfe",
                    subtitle: "Video editor",
                    email: "xhart@yahoo.com",
                    avatarUrl: "https://cdn.vuetifyjs.com/images/parallax/material2.jpg",
                },
                {   userId: "AAawffLCZRLOcknyKUZzFgGhHiaY",
                    firstName: "Christopher",
                    lastName: "Lee",
                    subtitle: "Event organiser",
                    email: "xhart@yahoo.com",
                    avatarUrl: "https://cdn.vuetifyjs.com/images/parallax/material2.jpg",
                },
                {   userId: "AAawffLCZRLOcknyKUZzFgGhHiaY",
                    firstName: "Nicole",
                    lastName: "Jarvis",
                    subtitle: "Surveyor, building",
                    email: "xhart@yahoo.com",
                    avatarUrl: "https://cdn.vuetifyjs.com/images/parallax/material2.jpg",
                },
                {   userId: "AAawffLCZRLOcknyKUZzFgGhHiaY",
                    firstName: "Tricia",
                    lastName: "Lawson",
                    subtitle: "Field seismologist",
                    email: "xhart@yahoo.com",
                    avatarUrl: "https://cdn.vuetifyjs.com/images/parallax/material2.jpg",
                },
                {   userId: "AAawffLCZRLOcknyKUZzFgGhHiaY",
                    firstName: "Keith",
                    lastName: "Young",
                    subtitle: "Waste management officer",
                    email: "xhart@yahoo.com",
                    avatarUrl: "https://cdn.vuetifyjs.com/images/parallax/material2.jpg",
                },
                {   userId: "AAawffLCZRLOcknyKUZzFgGhHiaY",
                    firstName: "Jonathan",
                    lastName: "Greene",
                    subtitle: "Teacher, music",
                    email: "xhart@yahoo.com",
                    avatarUrl: "https://cdn.vuetifyjs.com/images/parallax/material2.jpg",
                },
                {   userId: "AAawffLCZRLOcknyKUZzFgGhHiaY",
                    firstName: "Ashley",
                    lastName: "Walter",
                    subtitle: "Financial risk analyst",
                    email: "xhart@yahoo.com",
                    avatarUrl: "https://cdn.vuetifyjs.com/images/parallax/material2.jpg",
                },
            ]
        }
    },
    created(){
        setTimeout(() => {
            this.loading = false;
        },1000)
    }

}
</script>

<style>

</style>