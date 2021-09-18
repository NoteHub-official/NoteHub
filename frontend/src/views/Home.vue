<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
    <div>{{res}}</div>
    <button @click="getStatus" class="button"></button>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import TestService from "@/services/testService";

export default {
  name: "Home",
  components: {
    HelloWorld,
  },
  data() {
    return {
      res: {},
    }
  },
  methods: {
    async getStatus() {
      const res = await TestService.register();

    }
  }
};
</script>

<style>
.button {
  width: 300px;
  height: 100px;
}
</style>
