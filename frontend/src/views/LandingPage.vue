<template>
  <div>
    <v-progress-circular v-if="!show"
      indeterminate
      color="primary"
    ></v-progress-circular>
    <div v-for="(value,i) in pieSeries" :key="i" v-else>
      <apexchart type = "donut" :options="chartOptions" :series="value" width="300px" height="300px"></apexchart>
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
      const str = "label" + `${idx + 1}`
      console.log("here "+ this[str] )
      return {
        chartOption: {
          chart: {
            type: 'donut',
          },
          labels: this.label1
        }
      }
    }
  },
  mounted(){
    this.getChartData();
    this.pieSeries= this.$store.state.chart.pieSeries
    this.pieCategories = this.$store.state.chart.pieCategories
    setTimeout(() => {
      this.show = true
    }, 3000)
  },
}
</script>

<style>

</style>