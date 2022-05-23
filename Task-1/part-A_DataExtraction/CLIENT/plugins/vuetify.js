import Vue from "vue";
import Vuetify from "vuetify";

// import colors from "./../config/colors";

import "vuetify/dist/vuetify.min.css";
import "@mdi/font/css/materialdesignicons.css";

Vue.use(Vuetify);

export default (ctx) => {
  const vuetify = new Vuetify({
    theme: {
      themes: {
        light: {
          "custom-color-one": "#b71c1c",
          "custom-color-two": "#3B8070",
        },
        dark: {
          // colors
        },
      },
    },
  });
  ctx.app.vuetify = vuetify;
  ctx.$vuetify = vuetify.framework;
};
