import Vue from "vue";
import Vuetify from "vuetify";

import "vuetify/dist/vuetify.min.css";
import "@mdi/font/css/materialdesignicons.css";
import "typeface-roboto/index.css";

Vue.use(Vuetify);

if (process.env.NODE_ENV == 'development') {
  Vue.config.devtools = true;
  console.log('Development Mode');
} else {
  Vue.config.devtools = false;
}

var app = new Vue({
  el: '#app',
  vuetify: new Vuetify(),
});
