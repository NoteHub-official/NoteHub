<template>
  <div>
    <v-container class="trans main-container">
      <div>
        <h1 class="info--text font-weight-regular">Dashboard</h1>
        <v-divider></v-divider>
        <CommunityGroup class="mt-3" />
        <NotebookGrid class="mt-4" />
      </div>
    </v-container>
    <div :class="{ 'action-button-container': $vuetify.breakpoint.xs }">
      <v-speed-dial
        :fixed="!$vuetify.breakpoint.xs"
        v-model="fab"
        :bottom="true"
        :right="true"
        :direction="'top'"
        :transition="'slide-y-reverse-transition'"
        :open-on-hover="true"
      >
        <template v-slot:activator>
          <v-btn v-model="fab" color="primary" dark fab large>
            <v-icon large>
              {{ fab ? "close" : "add" }}
            </v-icon>
          </v-btn>
        </template>
        <v-tooltip left transition="all 0.2s">
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              fab
              dark
              color="orange"
              v-bind="attrs"
              v-on="on"
              :size="actionSize"
              @click.stop="createNotebookDialog = true"
            >
              <v-icon>edit_note</v-icon>
            </v-btn>
          </template>
          <span>Create New Notebook</span>
        </v-tooltip>
        <v-tooltip left transition="all 0.2s">
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              fab
              dark
              color="red"
              v-bind="attrs"
              v-on="on"
              :size="actionSize"
              @click.stop="createCommunityDialog = true"
            >
              <v-icon>group_add</v-icon>
            </v-btn>
          </template>
          <span>Create New Community</span>
        </v-tooltip>
      </v-speed-dial>
    </div>
    <!-- Create Notebook Dialog -->
    <CreateNotebookDialog :createNotebookDialog.sync="createNotebookDialog" />
    <!-- Create Community Dialog -->
    <CreateCommunityDialog :createCommunityDialog.sync="createCommunityDialog" />
  </div>
</template>

<script>
import CommunityGroup from "@/components/CommunityGroup.vue";
import NotebookGrid from "@/components/NotebookGrid.vue";
import CreateNotebookDialog from "@/components/CreateNotebookDialog.vue";
import CreateCommunityDialog from "@/components/CreateCommunityDialog.vue";

import { mapGetters } from "vuex";

export default {
  name: "Dashboard",
  components: {
    CommunityGroup,
    NotebookGrid,
    CreateNotebookDialog,
    CreateCommunityDialog,
  },
  data() {
    return {
      actionSize: 40,
      fab: false,
      createNotebookDialog: false,
      createCommunityDialog: false,
      communityName: "",
      loading: false,
    };
  },
  methods: {},
  computed: {
    ...mapGetters(["currentUser"]),
  },
};
</script>

<style>
.test {
  position: fixed;
}
.main-container {
  max-width: 1150px;
}
.special-text {
  font-family: "Open Sans", sans-serif !important;
  font-size: 1.7rem !important;
  font-weight: 500;
}

.trans {
  transition: all 0.3s linear;
}

/* This is for documentation purposes and will not be needed in your application */
.action-button-container {
  position: fixed;
  bottom: 0;
  right: 0;
  width: 70px;
  height: 125px;
}
</style>
