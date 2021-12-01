import http from "@/includes/http";

export default {
  state: {
    mixData: [],
    pieCategories: [],
    pieSeries: [],
    pieLabels: [],
    mixCategories: [],
  },
  actions: {
    async getChartData({ state, rootGetters }) {
      try {
        const token = await rootGetters.rootIdToken;
        const requestHeader = {
          headers: { authorization: `Bearer ${token}` },
        };
        const res = await http.get("user/get-notehub-statistics/", requestHeader);
        const allData = res.data;
        console.log("asd", allData);
        let count = 0;
        for (const [, info] of Object.entries(allData)) {
          if (count > 4) {
            break;
          }
          console.log("asdas", info.UserStatistics[count]);
          state.pieCategories.push(info.UserStatistics[count].categoryName);
          console.log(info.UserStatistics[count]);
          let labels = [];
          let series = [];
          for (const obj of Object.entries(info.UserStatistics)) {
            labels.push("UserLevel: " + obj[1].userLevel);
            series.push(obj[1].userLevelCounts);
          }
          state.pieLabels.push(labels);
          state.pieSeries.push(series);
          count++;
        }
        count = 0;
        let data1 = [];
        let data2 = [];
        let data3 = [];
        for (const [, info] of Object.entries(allData)) {
          if (count > 9) {
            break;
          }
          let temp = Object.entries(info.NoteStatistics);
          state.mixCategories.push(temp[0][1]);
          data1.push(temp[2][1]);
          data2.push(temp[3][1]);
          data3.push(temp[4][1]);
          count++;
        }
        state.mixData = [
          { name: "Average Like Counts", type: "column", data: data1 },
          { name: "Average View Counts", type: "area", data: data2 },
          { name: "Average Comment Counts", type: "line", data: data3 },
        ];
        console.log([
          { name: "Average Like Counts", type: "column", data: data1 },
          { name: "Average View Counts", type: "area", data: data2 },
          { name: "Average Comment Counts", type: "line", data: data3 },
        ]);
      } catch (e) {
        console.log("there is an error: " + e);
      }
    },
  },
};
