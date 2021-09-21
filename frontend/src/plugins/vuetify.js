import Vue from "vue";
import Vuetify from "vuetify/lib/framework";
import colors from "vuetify/lib/util/colors";

Vue.use(Vuetify, {});

export default new Vuetify({
  iconfont: "md",
  breakpoint: {
    thresholds: {
      xl: 1280,
    },
  },
  theme: {
    options: {
      customProperties: true,
    },
    themes: {
      light: {
        primary: "#1e90ff",
        secondary: "#ffa502",
        error: "#FF5252",
        info: "#4F4F4F",
        success: "#2ed573",
        warning: "#FFC107",
        appbar: "#2c2c2c",
        drawer: "white",
        background: colors.grey.lighten4,
      },
      dark: {
        primary: "#2ed573",
        secondary: "#1e90ff",
        error: "#FF5252",
        info: colors.white,
        success: "#2ed573",
        warning: "#FFC107",
        appbar: "#232323",
        drawer: "#232323",
        background: "#171717",
      },
    },
  },
});
