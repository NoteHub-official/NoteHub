<template>
  <div>
    <v-container class="trans main-container" fluid>
      <div class="d-flex flex-column">
        <h1 class="special-text text-h4 info--text mb-2">Dashboard</h1>
        <v-divider></v-divider>
        <CommunityGroup class="mt-4" />
      </div>
    </v-container>
  </div>
</template>

<script>
import CommunityGroup from "@/components/CommunityGroup.vue";

export default {
  name: "Dashboard",
  components: { CommunityGroup },
  data() {
    return {};
  },
};
</script>

<style>
.main-container {
  max-width: 1450px;
}
.special-text {
  font-family: "Open Sans", sans-serif !important;
}

.trans {
  transition: all 0.3s linear;
}
</style>
