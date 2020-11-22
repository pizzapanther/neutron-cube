import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import localfile from "./local-files.js";

var Store = new Vuex.Store({
  state: {
    drawer: null,
    files: [],
    active_file: null,
    winsize: { width: 0, height: 0 },
  },
  mutations: {
    set_drawer(state, value) {
      state.drawer = value;
    },
    append_file(state, file) {
      state.files.push(file);
    },
    pop_file(state, index) {
      state.files.splice(index, 1);

      if (state.files.length == 0) {
        state.active_file = null;
      } else if (state.active_file >= state.files.length) {
        state.active_file = state.files.length - 1;
      }
    },
    increment_active(state) {
      state.active_file = state.files.length - 1;
    },
    set_active(state, value) {
      state.active_file = value;
    },
    set_winsize(state, size) {
      state.winsize.width = size.width;
      state.winsize.height = size.height;
    },
  },
  actions: {
    add_file(context, file) {
      context.commit("append_file", file);
      context.commit("increment_active");
    },
    save_current_file(context) {
      if (context.state.active_file !== null) {
        var active = context.state.files[context.state.active_file];
        active
          .save()
          .then(() => {
            // snack saved
          })
          .catch((e) => {
            console.log("Error", e);
            // snack error
          });
      }
    },
    save_all_files(context) {
      console.log("save all");
    },
  },
  modules: {
    localfile,
  },
});

export default Store;
