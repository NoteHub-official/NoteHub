<template>
  <div>
    <div v-if="!show">
      <v-progress-circular 
      indeterminate
      color="primary"
      ></v-progress-circular>
    </div>
    <div class="d-flex justify-center flex-wrap" v-else>
      <div class="d-flex justify-center flex-wrap">
        <div v-for="(value,i) in pieSeries" :key="i">
          <apexchart type = "donut" :options="chartOption(i)" :series="value" width="400px" height="400px" class="mt3"></apexchart>
          <h3 style="position:relative; left:120px">{{pieCategories[i]}}</h3>
        </div>
        <h1>User Level Percent in Top 5 Popular Category</h1>
      </div>
      <div class="d-flex justify-center">
        <apexchart type="line" height="600px" :options="mixOption()" :series="mixSeries" width="1000px"></apexchart>
      </div>
      <h1 style="display: block">Notes Data in Top 10 Popular Category</h1>
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
      mixSeries: [],
      mixLabel: [],
    }
  },
  computed: {
    
  },
   methods: {
    ...mapActions(['getChartData']),
    chartOption(idx){
      return this.options[idx]
    },
    // formatter(y){
    //   if (typeof y !== "undefined") {
    //     return y.toFixed(0) + " points";
    //   }
    //     return y;
    // },
    mixOption(){
      console.log(this.mixLabel)
      return {
      mixOptions: {
        chart: {
          height: 350,
          type: 'line',
          stacked: false,
        },
        stroke: {
          width: [0, 2, 5],
          curve: 'smooth'
        },
        plotOptions: {
          bar: {
            columnWidth: '50%'
          }
        },
        fill: {
          opacity: [0.85, 0.25, 1],
          gradient: {
            inverseColors: false,
            shade: 'light',
            type: "vertical",
            opacityFrom: 0.85,
            opacityTo: 0.55,
            stops: [0, 100, 100, 100]
          }
        },
        labels: ['a', 'b', 'c', '04/01/2003', '05/01/2003', '06/01/2003', '07/01/2003',
              '08/01/2003', '09/01/2003', '10/01/2003'
        ],
        markers: {
          size: 0
        },
        xaxis: {
          // type: 'datetime'
        },
        yaxis: {
          title: {
            text: 'Points',
          },
          min: 0
        },
        tooltip: {
              shared: true,
              intersect: false,
              y: {
                formatter: function (y) {
                  if (typeof y !== "undefined") {
                    return y.toFixed(0) + " points";
                  }
                  return y;
            
                }
              }
            }
        }
      }
    }
  },
  async mounted(){
    await this.getChartData();
    this.pieSeries= this.$store.state.chart.pieSeries
    this.pieCategories = this.$store.state.chart.pieCategories
    this.pieLabels = this.$store.state.chart.pieLabels
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
      this.mixLabel = this.$store.state.chart.mixCategories
      this.mixSeries = this.$store.state.chart.mixData
    setTimeout(() => {
      show = true
    }, 1000)
  },
}
</script>

<style>

</style>