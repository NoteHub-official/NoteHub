<template>
  <v-card class="ma-2 card pa-0 my-3" height="428" width="270" @click="toggle">
    <v-card-title class="pt-2 pr-2 info--text">
      {{ community.name }}
      <v-spacer></v-spacer>
      <v-card-actions class="pa-0 text-center">
        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon>
              <v-icon v-bind="attrs" v-on="on">more_vert</v-icon>
            </v-btn>
          </template>
          <v-list class="pa-0">
            <v-list-item class="pa-0" v-for="action in actions" :key="action.title">
              <v-dialog v-model="dialog" persistent max-width="400">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn :color="action.color" text v-bind="attrs" v-on="on"
                    >{{ action.title }}
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
                    <v-btn color="error" text @click="dialog = false">
                      Cancel
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-card-actions>
    </v-card-title>
    <v-card-subtitle class="pb-2">Creator: {{ community.owner }}</v-card-subtitle>
    <v-img :src="community.photo" class="white--text align-end"> </v-img>
    <div class="d-flex flex-row px-2 align-center justify-end">
      <v-icon>groups</v-icon>
      <v-card-subtitle class="font-weight-medium pa-2">
        Members: {{ community.members }}
      </v-card-subtitle>
    </div>
    <v-card-text class="pt-0 pb-0">
      <v-divider></v-divider>
      <div class="three-lines pt-1">
        {{ community.description }}
      </div>
      <div class="d-flex justify-end">
        <v-btn text class="pa-0" color="primary" @click="enterCommunity">Enter</v-btn>
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
      this.dialog = false;
      action();
    },
  },
};
</script>

<style>
.three-lines {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  white-space: normal;
}
</style>
