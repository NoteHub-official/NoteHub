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
        secondary: "#ff7f50",
        error: "#FF5252",
        info: "#4F4F4F",
        success: "#2ed573",
        warning: "#FFC107",
        appbar: "#2c2c2c",
        drawer: "#1e1e1e",
        background: "#f3f3f3",
        card: colors.white,
        cardtext: colors.grey,
        code: "#1e1e1e",
        notexBackground: "#f3f3f3",
        listBackground: "white",
      },
      dark: {
        primary: "#2ed573",
        secondary: "#FFC107",
        error: "#FF5252",
        info: colors.white,
        success: "#2ed573",
        warning: "#FFC107",
        appbar: "#2c2c2c",
        drawer: "#1e1e1e",
        background: "#292929",
        card: "#2f2f2f",
        cardtext: colors.white,
        code: "#1e1e1e",
        notexBackground: "#292929",
        listBackground: "#1e1e1e",
      },
    },
  },
});
