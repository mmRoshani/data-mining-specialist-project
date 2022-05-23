module.exports = {
  /*
   ** Headers of the page
   */
  head: {
    title: "client",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: "frontend for DK-API",
      },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
  },
  plugins: ["~plugins/vuetify.js"],
  /*
   ** Customize the progress bar color
   */
  loading: { color: "#3B8070" },
  axios: {
    baseURL: "http://localhost:4000",
  },
  modules: ["@nuxtjs/axios"],
  /*
   ** Build configuration
   */
  build: {
    /*
     ** Run ESLint on save
     */
    extend(config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: "pre",
          test: /\.(js|vue)$/,
          loader: "eslint-loader",
          exclude: /(node_modules)/,
        });
      }
    },
  },
};
