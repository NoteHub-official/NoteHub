<template>
  <v-container>
    <v-toolbar flat height="72">
      <v-switch
        v-model="$vuetify.theme.dark"
        hint="This toggles the global state of the Vuetify theme"
        inset
        label="Vuetify Theme Dark"
        persistent-hint
      ></v-switch>
    </v-toolbar>
    <v-card>
      <v-card-title>
        New Project
      </v-card-title>
      <v-vard-text class="pl-4">
        Test Project
      </v-vard-text>
    </v-card>
    <div style="height: 1000px;"></div>
  </v-container>
</template>

<script>
export default {
  name: "HelloWorld",
  data() {
    return {};
  },
};
</script>
