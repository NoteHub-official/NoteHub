<template>
  <v-card
    class="ma-2 card pa-0 my-3 "
    :height="cardHeight"
    width="250"
    @click="enterCommunity"
    :elevation="4"
  >
    <v-img :src="community.photo" class="white--text align-start" height="170">
      <v-card-actions class="pa-0 text-center">
        <v-spacer></v-spacer>
        <v-menu offset-y v-model="menu" left>
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon>
              <v-icon color="white lighten-4" v-bind="attrs" v-on="on">more_horiz</v-icon>
            </v-btn>
          </template>
          <v-list class="pa-0">
            <v-list-item class="pa-0" v-for="action in actions" :key="action.title">
              <v-dialog v-model="dialog" persistent max-width="400">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    class="text-capitalize d-flex justify-start info--text"
                    text
                    v-bind="attrs"
                    v-on="on"
                    style="width: 100%;"
                  >
                    <v-icon left>exit_to_app</v-icon>
                    {{ action.title }}
                  </v-btn>
                </template>
                <v-card v-if="action.title === 'leave community'">
                  <v-card-title class="text-h6">
                    Are you sure to leave this community?
                  </v-card-title>
                  <v-card-text>This may cause irriversable data loss.</v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" text @click="closeDialogWithAction(action.onClick)">
                      Leave
                    </v-btn>
                    <v-btn color="error" text @click="closeDialogWithAction()">
                      Cancel
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-card-actions>
    </v-img>
    <v-divider></v-divider>
    <v-card-text class="pa-0">
      <v-card-title
        class="pt-1 pb-0 d-inline-block text-truncate text-cardtext"
        style="max-width: 250px;"
      >
        {{ community.name }}
      </v-card-title>
      <v-divider class="mx-3"></v-divider>
      <div class="d-flex px-3 pt-2">
        <v-spacer></v-spacer>
        <v-card-subtitle class="pa-0 font-weight-medium text-cardtext">
          Creator: {{ getFullName(community.owner) }}
        </v-card-subtitle>
      </div>
      <div class="d-flex flex-row px-2 align-center justify-end pt-0">
        <v-icon>groups</v-icon>
        <v-card-subtitle class="font-weight-medium pa-1 text-cardtext">
          Members: {{ community.memberCount }}
        </v-card-subtitle>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "CommunityCard",
  props: {
    active: {
      type: Boolean,
    },
    toggle: {
      type: Function,
    },
    community: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      actions: [{ title: "leave community", onClick: () => this.leaveCommunity(), color: "error" }],
      dialog: false,
      menu: false,
      cardHeight: 280,
    };
  },
  methods: {
    leaveCommunity() {
      this.$emit("leave-community", this.community);
    },
    enterCommunity() {
      this.$emit("enter-community", this.community);
    },
    closeDialogWithAction(action) {
      this.menu = false;
      this.dialog = false;
      if (action) action();
    },
    getFullName(owner) {
      return `${owner.firstName} ${owner.lastName}`;
    },
    getRandomColor() {
      var letters = "0123456789ABCDEF";
      var color = "#";
      for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    },
  },
};
</script>

<style>
.one-line {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  white-space: normal;
}

.card-background {
  opacity: 0.5;
}
</style>
