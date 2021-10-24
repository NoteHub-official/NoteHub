<template>
  <v-container fluid>
    <div
      class="search-list-container mx-16"
      :style="{ width: searchWidth, left: searchPositionX, top: searchPositionY }"
      v-if="items.length && !lose"
    >
      <v-row dense>
        <v-col 
        style="padding-top:0; padding-bottom:0"
        v-for="(item, i) in items"
        :key="i"
        cols="12"
        >
          <v-card
            @click="getSelectItem(item)"
            :color = "getSearchListColor(i)"
            @mouseover="index = i"
            @mouseleave="index = -1"
            style="height:100px"
            class="rounded-0"
          >
            <div class="d-flex flex-no-wrap justify-space-between">
                <v-avatar
                  class="ma-3 mr-1"
                  size= "80"
                  tile
                ><v-img contain src="../assets/communities.jpeg"></v-img>
              </v-avatar>
              <div> 
                <v-card-title class="text-h6">{{item.name}}</v-card-title>
                <v-card-subtitle>
                  <span class="text-overflow">
                    {{item.description}}
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
      <h1 class="heading " :style="`top: ${$vuetify.breakpoint.smAndDown ? 90 : 140}px;`">
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
    <div style="font-size:20px;font-weight: bold;" class="mt-5" v-show="!inputLoad">{{cardAbout}}</div>
    <div v-if="!inputLoad">
    <v-row dense>
      <v-col
        v-for="card in communities"
        :key = "card.communityId"
        col = "12"
        xs="12"
        sm="6"
        md="4"
        lg="3"
        xl="3"
        >
      <communities-card
          class="ma-3"
          :info = "card"
          :phone = "$vuetify.breakpoint.smAndDown"
          style = "min-width: 150px"
        ></communities-card>
      </v-col>
    </v-row>
    </div>
    <div v-else class="d-flex justify-center align-center">
      <v-progress-circular
      indeterminate
      color="primary"
    ></v-progress-circular>
    </div>
  </v-container>
</template>

<script>
import CommunitiesCard from "../components/CommunitiesCard.vue"
export default {
  components:{
    CommunitiesCard
  },
  data() {
    return {
      inputLoad: false,
      cardAbout: "Recommand For You",
      communities: [{
        communityId: 0,
        name: "keep",
        description: "Never range practice mind upon school worry ball. Statement pull hundred important.That production suddenly than husband list. Reality again talk save sit Mrs computer.Paper example single be over. Team show interview window. Never range practice mind upon school worry ball. Statement pull hundred important.That production suddenly than husband list. Reality again talk save sit Mrs computer.Paper example single be over. Team show interview window",
        createdAt: 123073884967844,
        photo: "",
        memberCount: 366,
      },
      {
        communityId: 1,
        name: "must",
        description: "Never range practice mind upon school worry ball. Statement pull hundred important.That production suddenly than husband list. Reality again talk save sit Mrs computer.Paper example single be over. Team show interview window.",
        createdAt: 123073884967844,
        photo: "",
        memberCount: 366,
      },
      {
        communityId: 2,
        name: "behind",
        description: "Never range practice mind upon school worry ball. Statement pull hundred important.That production suddenly than husband list. Reality again talk save sit Mrs computer.Paper example single be over. Team show interview window.",
        createdAt: 123073884967844,
        photo: "",
        memberCount: 366,
      },
      {
        communityId: 9,
        name: "south",
        description: "Never range practice mind upon school worry ball. Statement pull hundred important.That production suddenly than husband list. Reality again talk save sit Mrs computer.Paper example single be over. Team show interview window.",
        createdAt: 123073884967844,
        photo: "",
        memberCount: 366,
      },
      ],
      info: [{
        communityId: 0,
        name: "keep",
        description: "Never range practice mind upon school worry ball. Statement pull hundred important.That production suddenly than husband list. Reality again talk save sit Mrs computer.Paper example single be over. Team show interview window. Never range practice mind upon school worry ball. Statement pull hundred important.That production suddenly than husband list. Reality again talk save sit Mrs computer.Paper example single be over. Team show interview window",
        createdAt: 123073884967844,
        photo: "",
        memberCount: 366,
      },
      {
        communityId: 1,
        name: "must",
        description: "Never range practice mind upon school worry ball. Statement pull hundred important.That production suddenly than husband list. Reality again talk save sit Mrs computer.Paper example single be over. Team show interview window.",
        createdAt: 123073884967844,
        photo: "",
        memberCount: 366,
      },
      {
        communityId: 2,
        name: "behind",
        description: "Never range practice mind upon school worry ball. Statement pull hundred important.That production suddenly than husband list. Reality again talk save sit Mrs computer.Paper example single be over. Team show interview window.",
        createdAt: 123073884967844,
        photo: "",
        memberCount: 366,
      },
      {
        communityId: 3,
        name: "girl",
        description: "Never range practice mind upon school worry ball. Statement pull hundred important.That production suddenly than husband list. Reality again talk save sit Mrs computer.Paper example single be over. Team show interview window.",
        createdAt: 123073884967844,
        photo: "",
        memberCount: 366,
      },
      {
        communityId: 4,
        name: "case",
        description: "Never range practice mind upon school worry ball. Statement pull hundred important.That production suddenly than husband list. Reality again talk save sit Mrs computer.Paper example single be over. Team show interview window.",
        createdAt: 123073884967844,
        photo: "",
        memberCount: 366,
      },
      {
        communityId: 5,
        name: "under",
        description: "Never range practice mind upon school worry ball. Statement pull hundred important.That production suddenly than husband list. Reality again talk save sit Mrs computer.Paper example single be over. Team show interview window.",
        createdAt: 123073884967844,
        photo: "",
        memberCount: 366,
      },
      {
        communityId: 6,
        name: "party",
        description: "Never range practice mind upon school worry ball. Statement pull hundred important.That production suddenly than husband list. Reality again talk save sit Mrs computer.Paper example single be over. Team show interview window.",
        createdAt: 123073884967844,
        photo: "",
        memberCount: 366,
      },
      {
        communityId: 7,
        name: "participant",
        description: "Never range practice mind upon school worry ball. Statement pull hundred important.That production suddenly than husband list. Reality again talk save sit Mrs computer.Paper example single be over. Team show interview window.",
        createdAt: 123073884967844,
        photo: "",
        memberCount: 366,
      },
      {
        communityId: 8,
        name: "team",
        description: "Never range practice mind upon school worry ball. Statement pull hundred important.That production suddenly than husband list. Reality again talk save sit Mrs computer.Paper example single be over. Team show interview window.",
        createdAt: 123073884967844,
        photo: "",
        memberCount: 366,
      },
      {
        communityId: 9,
        name: "south",
        description: "Never range practice mind upon school worry ball. Statement pull hundred important.That production suddenly than husband list. Reality again talk save sit Mrs computer.Paper example single be over. Team show interview window.",
        createdAt: 123073884967844,
        photo: "",
        memberCount: 366,
      },
      {
        communityId: 10,
        name: "watch",
        description: "Never range practice mind upon school worry ball. Statement pull hundred important.That production suddenly than husband list. Reality again talk save sit Mrs computer.Paper example single be over. Team show interview window.",
        createdAt: 123073884967844,
        photo: "",
        memberCount: 366,
      },
      {
        communityId: 11,
        name: "firm",
        description: "Never range practice mind upon school worry ball. Statement pull hundred important.That production suddenly than husband list. Reality again talk save sit Mrs computer.Paper example single be over. Team show interview window.",
        createdAt: 123073884967844,
        photo: "",
        memberCount: 366,
      }
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
  watch: {
    input(val) {
      val && val !== this.select && this.querySelections(val);
      this.lose = false;
      if (val == ""){
        this.items = []
      }
    },
  },
  methods: {
    getSearchingResult(){
      this.inputLoad = true;
      this.lose = true;
      this.communities = this.items.map((x) => x);
      setTimeout(() => {
        this.inputLoad = false;
      },1000)
    }
    ,
     getSearchListColor(i){
      if (this.index == i){
        return "rgba(218, 216, 216, 1)"
      }
      return ""
    },
    blurFn() {
      setTimeout(() => {
        this.lose = true;
      }, 200);
    },
    getSelectItem(val) {
      this.index = 0
      this.selected = val.name;
      this.input = val.name;
      this.inputLoad = true;
      this.communities = [val];
      this.cardAbout = "Searching Result"
      setTimeout(() => {
        this.inputLoad = false;
      },500)
    },
    getSearchStyle() {
      let width = this.$refs.searching.$el.clientWidth;
      let left = this.$refs.searching.$el.offsetLeft;
      let top = this.$refs.searching.$el.offsetTop;
      this.searchWidth = width + "px";
      this.searchPositionX = left - 64 + "px";
      this.searchPositionY = top + 50 + "px";
    },
    querySelections(v) {
      this.loading = true;
      // Simulated ajax query
      setTimeout(() => {
        this.items = this.info.filter((obj) => {
          return (obj.name || "").toLowerCase().indexOf((v || "").toLowerCase()) > -1;
        })
        
        if (this.items.length > 10) {
          this.items = this.items.slice(0, 10);
        }
        this.loading = false;
      }, 500);
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
.text-overflow{
  text-overflow: ellipsis;
  overflow: hidden;
  letter-spacing: 0;
  white-space: normal;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}
</style>
