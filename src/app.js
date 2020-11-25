import "regenerator-runtime/runtime";

import Vue from "vue";
import Vuetify from "vuetify";
import VueRouter from "vue-router";
import Vuex from "vuex";

import "vuetify/dist/vuetify.min.css";
import "@mdi/font/css/materialdesignicons.css";
import "typeface-roboto/index.css";

import Router from "./pages/routing.js";
import Store from "./store/index.js";

Vue.use(Vuetify);
Vue.use(VueRouter);

if (process.env.NODE_ENV == "development") {
  Vue.config.devtools = true;
  console.log("Development Mode");
} else {
  Vue.config.devtools = false;
}

var app = new Vue({
  el: "#app",
  vuetify: new Vuetify(),
  router: Router,
  store: Store,
});
