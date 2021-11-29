<template>
  <div>
    <v-progress-circular v-if="!show"
      indeterminate
      color="primary"
    ></v-progress-circular>
    <div v-for="(value,i) in pieSeries" :key="i" v-else>
      <apexchart type = "donut" :options="chartOption(i)" :series="value" width="300px" height="300px"></apexchart>
    </div>
  </div>
</template>

<script>
import {mapActions} from "vuex";
import VueApexCharts from 'vue-apexcharts'
export default {
  components: {
    apexchart: VueApexCharts
  },
  data(){
    return {
      show: false,
      pieCategories: [],
      pieLabels: [],
      pieSeries: [],
      options: [],
      chartOptions: {
        labels: ["Apple", "Mango", "Banana", "Papaya", "Orange", "hhh"],
        chart: {
          type: 'donut',
        },
      }
    }
  },
  computed: {
    
  },
   methods: {
    ...mapActions(['getChartData']),
    chartOption(idx){
      return this.options[idx]
    }
  },
  mounted(){
    this.getChartData();
    this.pieSeries= this.$store.state.chart.pieSeries
    this.pieCategories = this.$store.state.chart.pieCategories
    this.pieLabels = this.$store.state.chart.pieLabels
    setTimeout(() => {
      this.show = true
      for (let i=0; i<5; i++){
        const chart = {
          chart: {
            type: 'donut',
          },
          labels: this.pieLabels[i]
        }
        this.options.push(chart)
      }
    }, 3000)
  },
}
</script>

<style>

</style>