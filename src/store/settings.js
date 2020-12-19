import deepcopy from "deepcopy";

import { DEFAULT_PREFS as default_editor_prefs } from "../defaults/editor.js";

import EditorPrefsDialog from "../dialogs/editor_prefs.vue";

export default {
  namespaced: true,
  state: {
    editor: null,
  },
  mutations: {
    init_prefs(state) {
      var ret = localStorage.getItem("settings_editor") || null;
      if (ret) {
        try {
          ret = JSON.parse(ret);
        } catch (e) {
          ret = deepcopy(default_editor_prefs);
        }
      } else {
        ret = deepcopy(default_editor_prefs);
      }

      state.editor = ret;
    },
  },
  actions: {
    edit_editor(context) {
      context.commit(
        "show_dialog",
        { mixins: [EditorPrefsDialog] },
        { root: true }
      );
    },
  },
};
