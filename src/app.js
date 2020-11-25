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

var DEBUG = false;
if (process.env.NODE_ENV == "development") {
  Vue.config.devtools = true;
  console.log("Development Mode");
  DEBUG = true;
} else {
  Vue.config.devtools = false;
}

var app = new Vue({
  el: "#app",
  vuetify: new Vuetify(),
  router: Router,
  store: Store,
});

if ("serviceWorker" in navigator) {
  window.addEventListener("load", function() {
    navigator.serviceWorker.register("service-worker.js").then(
      function(registration) {
        // Registration was successful
        console.log(
          "ServiceWorker registration successful with scope: ",
          registration.scope
        );
      },
      function(err) {
        // registration failed :(
        console.log("ServiceWorker registration failed: ", err);
      }
    );
  });
}
