import http from "@/includes/http";

export default {
    state: {
        mixData: [],
        pieCategories: [],
        pieSeries: [],
        pieLabels: [],
    },
    actions: {
        async getChartData({state, rootGetters }){
            try {
                const token = await rootGetters.rootIdToken;
                const requestHeader = {
                  headers: { authorization: `Bearer ${token}` },
                };
                const res = await http.get(
                  "user/get-notehub-statistics/",
                  requestHeader
                );
                const allData = res.data;
                let count = 0;
                for (const [, info] of Object.entries(allData)){
                    if (count > 4){
                        break;
                    }
                    state.mixData.push(info.NoteStatistics);
                    state.pieCategories.push(info.UserStatistics[count].categoryName)
                    let labels = [];
                    let series = [];
                    for (const obj of Object.entries(info.UserStatistics)){
                        labels.push(("UserLevel: " + obj[1].userLevel))
                        series.push(obj[1].userLevelCounts)
                    }
                    state.pieLabels.push(labels);
                    state.pieSeries.push(series)
                    count ++;
                }
              } catch (e) {
                console.log("there is an error: " + e);
              }
        }
    }
   
};
  