<template>
<div>
  <div class="d-flex justify-center align-center">
    <div class="head-line" style="width:80px"></div>
    <div class="pl-1 text-caption1" style="white-space: nowrap;">{{ title }}</div>
    <div class="head-line"></div>
    <v-btn icon @click="toggleUsers">
      <v-icon>
        {{icon}}
      </v-icon>
    </v-btn>
  </div>
  <!-- list of users-->
  <div style="width: 240px;" v-show="show">
    <v-list dense>
      <v-list-item-group
        no-action
      >
        <v-list-item 
          v-for="(user, i) in users"
          :key="i"
        >
          <v-list-item-avatar>
            <v-img src="../assets/testAvatar.png"></v-img>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>{{user.firstName + " " + user.lastName}}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </div>
</div>
</template>

<script>
export default {
  name: "WorkspaceUserGroup",
  props: {
    users : {
      type: Array,
      required: true
    },
    title: {
      type: String,
      required: true,
    },
  },
  data(){
    return {
      show: true,
      icon: "mdi-chevron-up"
    }
  },
  methods: {
    toggleUsers(){
      this.show = !this.show
      this.icon = this.show ? "mdi-chevron-up":"mdi-chevron-down"
    }
  }
}
</script>

<style>
.down{
  max-height: calc(100vh - 288px);
  transition: all 0.6s ease-in-out;
}
.up{
  max-height: 0;
  transition: max-height .5s;
}
.head-line {
  width: 100%;
  height: 1px;
  background-color: #d1d1d1;
  margin-left: 10px;
  margin-right: 5px;
}
</style>