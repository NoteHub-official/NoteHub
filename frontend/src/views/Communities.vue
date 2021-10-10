<template>
  <v-container>
    <div class="search-list-container mx-16" 
    :style="{width: searchWidth, left: searchPositionX, top: searchPositionY}" v-if="items.length && !lose"
      >
      <ul style="padding: 0px">
        <li v-for="item,i in items" :key="item" :class="{selectList: i == index}" @click="getSelectItem(item)" @mouseover="index = i"
        >{{item}}</li>
      </ul>
    </div>
    <div class="d-flex flex-column justify-center align-center search-background"
      :style= "`max-height: ${$vuetify.breakpoint.smAndDown ? 250 : 350}px;`">  
      <h1 class="heading "
            :style="`top: ${$vuetify.breakpoint.smAndDown ? 100 : 150}px;`"
        >Explore Your World</h1>
      <div class="search-bar-container justify-center align-center"
          :style="`width: ${$vuetify.breakpoint.smAndDown ? 100 : 70}%;`"
      >
        <v-text-field
          class = "mx-16 mt-16 search-bar"
          :loading = "loading"
          solo
          append-icon="search"
          label="Find things you love"
          flat
          v-model="input"
          :items = "items"
          ref="searching"
          @blur="blurFn"
        >
        </v-text-field>
      </div>
    </div>
  </v-container>
</template>

<script>

export default {
  data () {
      return {
        index : 0,
        lose: false,
        input:"",
        loading: false,
        items: [],
        selected: "",
        searchWidth: 0,
        searchPositionX: 0,
        searchPositionY: 0,
        states: [
          'Alabama',
          'Alaska',
          'American Samoa',
          'Arizona',
          'Arkansas',
          'California',
          'Colorado',
          'Connecticut',
          'Delaware',
          'District of Columbia',
          'Federated States of Micronesia',
          'Florida',
          'Georgia',
          'Guam',
          'Hawaii',
          'Idaho',
          'Illinois',
          'Indiana',
          'Iowa',
          'Kansas',
          'Kentucky',
          'Louisiana',
          'Maine',
          'Marshall Islands',
          'Maryland',
          'Massachusetts',
          'Michigan',
          'Minnesota',
          'Mississippi',
          'Missouri',
          'Montana',
          'Nebraska',
          'Nevada',
          'New Hampshire',
          'New Jersey',
          'New Mexico',
          'New York',
          'North Carolina',
          'North Dakota',
          'Northern Mariana Islands',
          'Ohio',
          'Oklahoma',
          'Oregon',
          'Palau',
          'Pennsylvania',
          'Puerto Rico',
          'Rhode Island',
          'South Carolina',
          'South Dakota',
          'Tennessee',
          'Texas',
          'Utah',
          'Vermont',
          'Virgin Island',
          'Virginia',
          'Washington',
          'West Virginia',
          'Wisconsin',
          'Wyoming',
        ],
      }
    },
    watch: {
      input (val) {
        val && val !== this.select && this.querySelections(val)
        this.lose = false
      }
    },
    methods: {
      blurFn(){
        setTimeout(() => {
          this.lose = true
        }, 200)
      },
      getSelectItem(val){
        this.selected = val
        this.input = val
        console.log("selected")
        console.log(val)
      },
      getSearchStyle(){
        let width = this.$refs.searching.$el.clientWidth
        let left = this.$refs.searching.$el.offsetLeft
        let top = this.$refs.searching.$el.offsetTop
        this.searchWidth = width + "px"
        this.searchPositionX = left - 64 + "px"
        this.searchPositionY = top + 50 + "px"
      },
      querySelections (v) {
        this.loading = true
        // Simulated ajax query
        setTimeout(() => {
          this.items = this.states.filter(e => {
            return (e || '').toLowerCase().indexOf((v || '').toLowerCase()) > -1
          })
          if (this.items.length > 10){
            this.items = this.items.slice(0,10)
          }
          this.loading = false
        }, 500)
      }
    },
    mounted(){
      this.getSearchStyle();
    },
    created(){
      window.addEventListener('resize', this.getSearchStyle)
    }
  
};
</script>

<style>
li{
  padding: 0;
  display: block;
  height: 45px;
  line-height: 45px;
  list-style-type: none;
  padding-left: 10px;
}

.selectList{
  background-color: rgba(218, 216, 216, 0.253);
}

.search-list{
  padding: 0px;
  margin: 0;
}

.search-list-container{
  /* height: 200px; */
  border-radius: 5px;
  padding: 0px;
  background-color: white;
  position: absolute;
}

.heading{
  color:white;
  position: relative;
}

.search-bar{
  opacity:0.7;
}

.search-bar-container{
  height: 400px;
  display: flex;
  align-items: center;
  
}
.search-background{
  border-radius: 15px;
  background-image: url("../assets/search_background.jpeg");
  background-size: cover;
}
</style>
