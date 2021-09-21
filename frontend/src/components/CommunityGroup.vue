<template>
  <v-sheet elevation="4" rounded="lg">
    <div class="px-8 pt-4 d-flex justify-center align-center">
      <div class="px-0 pb-0" style="width: 250px;">
        <v-text-field
          v-model="searchContent"
          label="search community"
          prepend-inner-icon="search"
          outlined
          dense
          hide-details="auto"
          clear-icon="highlight_off"
          clearable
        ></v-text-field>
      </div>
      <v-spacer v-show="!$vuetify.breakpoint.xs"></v-spacer>
      <v-btn outlined color="primary" v-show="!$vuetify.breakpoint.xs">
        <v-icon left>add</v-icon>
        Join New
      </v-btn>
    </div>
    <v-slide-group class="pa-0" show-arrows>
      <v-slide-item v-for="n in 15" :key="n" v-slot="{ active, toggle }">
        <CommunityCard :active="active" :toggle="toggle" />
      </v-slide-item>
    </v-slide-group>
  </v-sheet>
</template>

<script>
import CommunityCard from "@/components/CommunityCard.vue";

export default {
  name: "CommunityGroup",
  components: { CommunityCard },
  data() {
    return {
      searchContent: "",
    };
  },
};
</script>

<style>
.v-slide-group__next,
.v-slide-group__prev {
  min-width: 30px !important;
  padding: 5px !important;
}
</style>
