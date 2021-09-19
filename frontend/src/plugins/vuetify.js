import Vue from "vue";
import Vuetify from "vuetify/lib/framework";
import colors from "vuetify/lib/util/colors";

Vue.use(Vuetify, {});

export default new Vuetify({
  iconfont: "md",
  theme: {
    options: {
      customProperties: true,
    },
    themes: {
      light: {
        primary: "#1e90ff",
        secondary: "#ffa502",
        error: "#FF5252",
        info: "#ff7f50",
        success: "#2ed573",
        warning: "#FFC107",
        appbar: "#2c2c2c",
        drawer: "white",
        background: colors.grey.lighten4,
      },
      dark: {
        primary: "#1e90ff",
        secondary: "#ffa502",
        error: "#FF5252",
        info: "#ff7f50",
        success: "#2ed573",
        warning: "#FFC107",
        appbar: "#232323",
        drawer: "#232323",
        background: "#171717",
      },
    },
  },
});
