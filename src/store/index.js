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
    append_file(state, file) {
      state.files.push(file);
    },
    increment_active(state) {
      state.active_file = state.files.length - 1;
    },
  },
  actions: {
    add_file(context, file) {
      context.commit("append_file", file);
      context.commit("increment_active");
    },
  },
  modules: {
    localfile,
  },
});

export default Store;
