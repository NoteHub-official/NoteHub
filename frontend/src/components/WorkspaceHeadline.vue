<template>
  <div class="d-flex justify-center align-center">
    <div class="head-line"></div>
    <v-icon :size="16">{{ icon }}</v-icon>
    <div class="pl-1 text-caption1">{{ title }}</div>
    <div class="head-line"></div>
  </div>
</template>

<script>
export default {
  name: "WorkspaceHeadline",
  props: {
    title: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      required: true,
    },
  },
};
</script>

<style>
.head-line {
  width: 100%;
  height: 1px;
  background-color: #d1d1d1;
  margin-left: 8px;
  margin-right: 8px;
}
</style>
