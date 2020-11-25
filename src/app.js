import "regenerator-runtime/runtime";

import Vue from "vue";
import Vuetify from "vuetify";
import VueRouter from "vue-router";
import Vuex from "vuex";

import axios from "axios";

import "vuetify/dist/vuetify.min.css";
import "@mdi/font/css/materialdesignicons.css";
import "typeface-roboto/index.css";

import Router from "./pages/routing.js";
import Store from "./store/index.js";

Vue.use(Vuetify);
Vue.use(VueRouter);

var DEBUG = false;
var CHECK_RELEASE_TIMEOUT = 1000 * 5 * 60;
var SWREG;

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

function check_release() {
  axios
    .get("release.json", { timeout: 5000 })
    .then((response) => {
      if (response.data.release != RELEASE) {
        Store.commit("set_needs_update");
      }
    })
    .catch((e) => {});

  setTimeout(check_release, CHECK_RELEASE_TIMEOUT);
}

function clear_all_cache() {
  return new Promise(function (resolve, reject) {
    if (
      "serviceWorker" in navigator &&
      navigator.serviceWorker.controller &&
      navigator.serviceWorker.controller.postMessage
    ) {
      var msg_chan = new MessageChannel();
      msg_chan.port1.onmessage = function (event) {
        console.log("Cache:", event.data);
        resolve();
      };

      navigator.serviceWorker.controller.postMessage({ task: "clear" }, [
        msg_chan.port2,
      ]);
    } else {
      resolve();
    }
  });
}

function force_update() {
  console.log("force update");

  if (SWREG) {
    clear_all_cache()
      .then(() => {
        return SWREG.unregister();
      })
      .then((result) => {
        setTimeout(() => {
          location.reload();
        }, 100);
      })
      .catch((e) => {
        console.error(e);
        alert("Error updating app.");
      });
  }
}

if ("serviceWorker" in navigator) {
  window.addEventListener("load", function () {
    navigator.serviceWorker.register("service-worker.js").then(
      function (registration) {
        // Registration was successful
        SWREG = registration;
        console.log(
          "ServiceWorker registration successful with scope: ",
          registration.scope
        );

        Store.commit("set_release", RELEASE);
        Store.subscribeAction((action, state) => {
          if (action.type == "force_update") {
            force_update();
          }
        });
        setTimeout(check_release, 1000 * 5);
      },
      function (err) {
        // registration failed :(
        console.log("ServiceWorker registration failed: ", err);
      }
    );
  });
}
