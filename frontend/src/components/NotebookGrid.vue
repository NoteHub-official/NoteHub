<template>
  <v-sheet class="notegrid-content" elevation="4" rounded="lg">
    <v-card class="grey lighten-1" width="100%">
      <v-card-actions class="px-7 d-flex align-center justify-space-between">
        <div class="px-0 pb-0" style="width: 220px;">
          <v-text-field
            v-model="searchContent"
            label="search keyword"
            prepend-inner-icon="search"
            outlined
            dense
            hide-details="auto"
            clear-icon="highlight_off"
            clearable
            @click:clear="searchContent = ''"
          ></v-text-field>
        </div>
        <div class="px-0 pb-0" style="width: 220px;">
          <v-select
            color="pink"
            label="filter by category"
            hide-details="auto"
            prepend-inner-icon="filter_list"
            outlined
            dense
          ></v-select>
        </div>
        <div class="px-0 pb-0" style="width: 220px;">
          <v-btn text class="text-capitalize">
            Share by Brian Yin
            <v-icon>arrow_drop_down</v-icon>
          </v-btn>
        </div>
      </v-card-actions>
    </v-card>
  </v-sheet>
</template>

<script>
export default {
  name: "NotebookGrid",
  data() {
    return {
      searchContent: "",
    };
  },
};
</script>

<style>
.notegrid-toolbar {
  height: 60px !important;
}

.notegrid-content {
  min-height: 300px;
}
</style>
