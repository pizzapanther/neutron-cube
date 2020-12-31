import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import localfile from "./local-files.js";
import settings from "./settings.js";

function find_id(id, items) {
  for (var i = 0; i < items.length; i++) {
    if (items[i].id == id) {
      return items[i];
    }
  }
}

var Store = new Vuex.Store({
  state: {
    drawer: null,
    files: [],
    directories: [],
    opened_dirs: [],
    active_file: null,
    winsize: { width: 0, height: 0 },
    snack_text: null,
    snack_timeout: 3000,
    snack_attrs: { top: true, center: true },
    release: null,
    needs_update: false,
    editor: null,
    dialog: null,
  },
  mutations: {
    show_dialog(state, d) {
      state.dialog = d;
    },
    close_dialog(state) {
      state.dialog = null;
    },
    set_release(state, release) {
      state.release = release;
    },
    set_needs_update(state) {
      state.needs_update = true;
    },
    set_drawer(state, value) {
      state.drawer = value;
    },
    set_editor(state, editor) {
      state.editor = editor;
    },
    append_file(state, file) {
      state.files.push(file);
    },
    append_dir(state, dir) {
      state.directories.push(dir);
    },
    set_opened_dirs(state, dirs) {
      state.opened_dirs = dirs;
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
    set_snack(state, kwargs) {
      state.snack_text = kwargs.text;
      if (kwargs.timeout) {
        state.snack_timeout = kwargs.timeout;
      }

      if (kwargs.attrs) {
        state.snack_attrs = kwargs.attrs;
      } else {
        state.snack_attrs = { top: true, center: true };
      }
    },
    set_file_attrs(state, kwargs) {
      var file = find_id(kwargs.id, state.files);
      if (file) {
        delete kwargs.id;
        for (var key in kwargs) {
          file[key] = kwargs[key];
        }
      }
    },
    save_editor_state(state) {
      if (state.editor && state.active_file !== null) {
        state.files[state.active_file].state = state.editor.saveViewState();
      }
    },
    restore_editor_state(state, fid) {
      var current = Store.state.files[Store.state.active_file];
      if (current.id == fid) {
        state.editor.restoreViewState(state.files[state.active_file].state);
      }
    },
    focus_editor(state) {
      if (state.editor) {
        state.editor.focus();
      }
    },
  },
  actions: {
    force_update(context) {},
    add_file(context, file) {
      context.commit("append_file", file);
      context.commit("increment_active");
    },
    add_directory(context, dir) {
      context.commit("append_dir", dir);
    },
    save_current_file(context) {
      if (context.state.active_file !== null) {
        var active = context.state.files[context.state.active_file];
        active
          .save()
          .then(() => {
            context.commit("set_snack", {
              text: `Saved: ${active.name}`,
              timeout: 500,
              attrs: { top: true, right: true },
            });
          })
          .catch((e) => {
            console.log("Error", e);
            context.commit("set_snack", {
              text: `Error saving: ${active.name}`,
              timeout: 2500,
            });
          });
      }
    },
    save_all_files(context) {
      var promises = [];
      context.state.files.forEach((file) => {
        promises.push(file.save());
      });

      Promise.all(promises)
        .then(() => {
          context.commit("set_snack", {
            text: "All Files Saved",
            timeout: 500,
          });
        })
        .catch((e) => {
          console.log("Error", e);
          context.commit("set_snack", {
            text: "Error Saving Files",
            timeout: 2500,
          });
        });
    },
  },
  modules: {
    localfile,
    settings,
  },
});

export default Store;
