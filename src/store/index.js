import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import localfile from "./local-files.js";

var Store = new Vuex.Store({
  state: {
    drawer: null,
    files: [],
    active_file: null,
  },
  mutations: {
    set_drawer(state, value) {
      state.drawer = value;
    },
  },
  actions: {
    add_file(context, file) {
      console.log(file.contents);
    },
  },
  modules: {
    localfile,
  },
});

export default Store;
