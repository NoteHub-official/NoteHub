<template>
  <v-container fluid>
    <!-- more-infomation -->
    <!-- pc -->
    <v-dialog
      v-if="!$vuetify.breakpoint.xs"
      v-model="dialog"
      transition="dialog-top-transition"
      :max-width="$vuetify.breakpoint.smAndDown ? 600 : 700"
      height="500"
    >
      <v-card>
        <div class="d-flex flex-no-wrap">
          <div class="d-flex align-center">
            <v-avatar :size="$vuetify.breakpoint.smAndDown ? 150 : 200" class="ma-3 mt-7">
              <v-img :src="moreInfo.photo"> </v-img>
            </v-avatar>
          </div>
          <div>
            <v-icon @click="dialog = false" class="float-right ma-2">mdi-close </v-icon>
            <v-card-title style="font-size: 45px" class="mt-3">
              {{ moreInfo.name }}
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text style="font-size: 16px">
              {{ moreInfo.description }}
            </v-card-text>
            <div class="d-flex align-center mb-3">
              <v-avatar color="primary" size="36" class="ma-1"></v-avatar>
              <v-avatar color="primary" size="36" class="ma-1"></v-avatar>
              <v-avatar color="primary" size="36" class="ma-1"></v-avatar>
              <span class="ma-1">+999</span>
              <v-btn
                depressed
                color="primary"
                :style="`margin-left: ${$vuetify.breakpoint.smAndDown ? 130 : 200}px;`"
                >JION</v-btn
              >
            </div>
          </div>
        </div>
      </v-card>
    </v-dialog>

    <!-- mobile -->
    <v-dialog v-else v-model="dialog" fullscreen hide-overlay transition="dialog-top-transition">
      <v-card>
        <div :style="{ backgroundColor: colorOfbackground }">
          <v-icon @click="dialog = false" class="mt-2" large>mdi-arrow-left-thick </v-icon>
        </div>
        <div
          class="d-flex justify-center"
          :class="{ light: !this.$vuetify.theme.dark, dark: this.$vuetify.theme.dark }"
        >
          <v-avatar size="150">
            <v-img src="https://cdn.vuetifyjs.com/images/parallax/material2.jpg"> </v-img>
          </v-avatar>
        </div>
        <div class="d-flex justify-center">
          <v-card-title style="font-size: 45px" class="mt-3">
            {{ moreInfo.name }}
          </v-card-title>
        </div>
        <div class="d-flex justify-center">
          <v-card-text style="font-size: 18px">
            {{ moreInfo.description }}
          </v-card-text>
        </div>
        <div class="d-flex justify-center align-center">
          <v-avatar color="primary" size="36" class="ma-1"></v-avatar>
          <v-avatar color="primary" size="36" class="ma-1"></v-avatar>
          <v-avatar color="primary" size="36" class="ma-1"></v-avatar>
          <v-avatar color="primary" size="36" class="ma-1"></v-avatar>
          <v-avatar color="primary" size="36" class="ma-1"></v-avatar>
          <span class="ma-1">+999</span>
        </div>
        <div class="d-flex justify-center">
          <v-btn depressed color="primary mt-5" large>JION</v-btn>
        </div>
      </v-card>
    </v-dialog>

    <!-- search list-->
    <div
      class="search-list-container mx-16 mt-1"
      :style="{ width: searchWidth, left: searchPositionX, top: searchPositionY }"
      v-if="items.length && !lose"
    >
      <v-row dense>
        <v-col
          style="padding-top: 0; padding-bottom: 0"
          v-for="(item, i) in items"
          :key="i"
          cols="12"
        >
          <v-card
            @click="getSelectItem(item)"
            :color="getSearchListColor(i)"
            @mouseover="index = i"
            @mouseleave="index = -1"
            style="height: 100px"
            class="rounded-0"
          >
            <div class="d-flex">
              <v-avatar class="ma-3 mr-1" size="80" tile
                ><v-img contain :src="item.photo"></v-img>
              </v-avatar>
              <div>
                <v-card-title class="text-h6">{{ item.name }}</v-card-title>
                <v-card-subtitle>
                  <span class="text-overflow">
                    {{ item.description }}
                  </span>
                </v-card-subtitle>
              </div>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </div>
    <div
      class="d-flex flex-column justify-center align-center search-background"
      :style="`max-height: ${$vuetify.breakpoint.smAndDown ? 250 : 350}px;`"
    >
      <h1 class="heading" :style="`top: ${$vuetify.breakpoint.smAndDown ? 90 : 140}px;`">
        Explore Your World
      </h1>
      <div
        class="search-bar-container justify-center align-center"
        :style="`width: ${$vuetify.breakpoint.smAndDown ? 100 : 70}%;`"
      >
        <v-text-field
          class="mx-16 mt-16 search-bar"
          :loading="loading"
          solo
          append-icon="search"
          label="Find things you love"
          flat
          v-model="input"
          :items="items"
          ref="searching"
          @blur="blurFn"
          @keydown.enter="getSearchingResult"
        >
        </v-text-field>
      </div>
    </div>

    <!-- search result cards-->
    <div style="font-size: 20px; font-weight: bold" class="mt-5" v-show="!inputLoad">
      {{ cardAbout }}
    </div>
    <div v-if="!inputLoad">
      <v-row dense>
        <v-col
          v-for="(card, idx) in communities"
          :key="card.communityId"
          col="12"
          xs="12"
          sm="6"
          md="4"
          lg="3"
          xl="3"
          style="padding: 0"
        >
          <communities-card
            class="ma-3"
            :info="card"
            :phone="$vuetify.breakpoint.xs"
            :num="idx"
            style="min-width: 150px"
            @getinfo="showMoreInfo"
          ></communities-card>
        </v-col>
      </v-row>
    </div>
    <div v-else class="d-flex justify-center align-center">
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
    </div>
  </v-container>
</template>

<script>
import CommunitiesCard from "../components/CommunitiesCard.vue";
import { mapActions, mapGetters } from "vuex";
export default {
  components: {
    CommunitiesCard,
  },
  data() {
    return {
      moreInfo: {},
      dialog: false,
      inputLoad: false,
      cardAbout: "Recommend For You",
      communities: [
        {
          communityId: 0,
          name: "Statistic",
          description:
            "A statistic (singular) or sample statistic is any quantity computed from values in a sample which is considered for a statistical purpose. Statistical purposes include estimating a population parameter, describing a sample, or evaluating a hypothesis. The average (or mean) of sample values is a statistic. ",
          createdAt: 123073884967844,
          photo: "",
          memberCount: 366,
        },
        {
          communityId: 1,
          name: "Database",
          description:
            "A database is an organized collection of structured information, or data, typically stored electronically in a computer system. A database is usually controlled by a database management system (DBMS). Together, the data and the DBMS, along with the applications that are associated with them, are referred to as a database system, often shortened to just database.",
          createdAt: 123073884967844,
          photo: "",
          memberCount: 366,
        },
        {
          communityId: 2,
          name: "Frontend",
          description:
            "The frontend refers to the part of the synthesis system that converts the input text into a symbolic phonetic representation, and the backend converts the symbolic phonetic representation into actual sounds.",
          createdAt: 123073884967844,
          photo: "",
          memberCount: 366,
        },
        {
          communityId: 9,
          name: "Backend",
          description:
            "The back-end is the code that runs on the server, that receives requests from the clients, and contains the logic to send the appropriate data back to the client. The back-end also includes the database, which will persistently store all of the data for the application. ",
          createdAt: 123073884967844,
          photo: "",
          memberCount: 366,
        },
      ],
      index: 0,
      lose: false,
      input: "",
      loading: false,
      items: [],
      selected: "",
      searchWidth: 0,
      searchPositionX: 0,
      searchPositionY: 0,
    };
  },
  computed: {
    ...mapGetters(["searchResult"]),
    colorOfbackground() {
      if (this.$vuetify.theme.dark) {
        return "rgb(105, 209, 125)";
      }
      return "rgb(77, 166, 255)";
    },
  },
  watch: {
    input(val) {
      this.searchResultTest(val);
      this.querySelections();
      this.lose = false;
      if (val == "") {
        this.items = [];
      }
    },
  },
  methods: {
    ...mapActions(["getSearchResult"]),
    async searchResultTest(input) {
      await this.getSearchResult(input);
    },
    showMoreInfo(info) {
      this.moreInfo = info;
      this.dialog = true;
    },
    getSearchingResult() {
      this.inputLoad = true;
      this.lose = true;
      this.communities = this.items.map((x) => x);
      setTimeout(() => {
        this.inputLoad = false;
      }, 1000);
    },
    getSearchListColor(i) {
      if (this.index == i) {
        return "rgba(218, 216, 216, 1)";
      }
      return "";
    },
    blurFn() {
      setTimeout(() => {
        this.lose = true;
      }, 200);
    },
    getSelectItem(val) {
      this.index = 0;
      this.selected = val.name;
      this.input = val.name;
      this.inputLoad = true;
      this.communities = [val];
      this.cardAbout = "Searching Result";
      setTimeout(() => {
        this.inputLoad = false;
      }, 500);
    },
    getSearchStyle() {
      let width = this.$refs.searching.$el.clientWidth;
      let left = this.$refs.searching.$el.offsetLeft;
      let top = this.$refs.searching.$el.offsetTop;
      this.searchWidth = width + "px";
      this.searchPositionX = left - 64 + "px";
      this.searchPositionY = top + 50 + "px";
    },
    querySelections() {
      this.loading = true;
      // Simulated ajax query
      setTimeout(() => {
        this.items = this.searchResult;
        if (this.items.length > 10) {
          this.items = this.items.slice(0, 10);
        }
        this.loading = false;
      }, 1000);
    },
  },
  mounted() {
    this.getSearchStyle();
  },
  created() {
    window.addEventListener("resize", this.getSearchStyle);
  },
};
</script>

<style>
.dark {
  background-color: rgb(30, 30, 30);
  box-shadow: 0 80px 0px 0px rgb(105, 209, 125) inset;
}
.light {
  background-color: white;
  box-shadow: 0 80px 0px 0px rgb(77, 166, 255) inset;
}
.search-list-container {
  border-radius: 5px;
  padding: 0px;
  z-index: 999;
  position: absolute;
}

.heading {
  color: white;
  position: relative;
}

.search-bar {
  opacity: 0.7;
}

.search-bar-container {
  height: 400px;
  display: flex;
  align-items: center;
}
.search-background {
  border-radius: 15px;
  background-image: url("../assets/search-background.png");
  background-size: cover;
}
.text-overflow {
  text-overflow: ellipsis;
  overflow: hidden;
  letter-spacing: 0;
  white-space: normal;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}
</style>
