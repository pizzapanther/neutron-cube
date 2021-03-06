<template>
  <div class="height100">
    <div class="height100" id="editor-wrapper" v-if="files.length > 0">
      <v-tabs center-active v-model="active" id="editor-tabs">
        <v-tab v-for="(f, i) in files" :key="f.id">
          <v-btn
            v-if="f.needs_reload"
            icon
            @click="f.reload(true)"
            x-small
            color="error"
            title="File changed, reload from disk"
            class="reload"
          >
            <v-icon>mdi-reload-alert</v-icon>
          </v-btn>
          <span v-else-if="f.changed" class="changed">*</span>
          <span>{{ f.name }}</span>
          <v-btn icon @click="close_file(i)" x-small title="Close file">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-tab>
      </v-tabs>
      <div id="m-editor" :style="mstyle"></div>
    </div>
    <div
      v-else
      class="height100 d-flex flex-column justify-center align-center"
    >
      <h1>Neutron Cube</h1>
      <img
        src="../images/icon-cube-red.png"
        alt="cube logo"
        style="height: 256px"
      />
      <h3 v-if="release">Release {{ release.substr(0, 7) }}</h3>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import * as monaco from "monaco-editor";

import { THEME_LIST } from "../defaults/themes.js";
import bind_keys from "../lib/keybinding.js";

var THEME_LOAD = [];
THEME_LIST.forEach((t, i) => {
  THEME_LOAD.push(axios.get(`/themes/${t[1]}.json`));
});

Promise.all(THEME_LOAD)
  .then((themes) => {
    themes.forEach((t, i) => {
      monaco.editor.defineTheme(THEME_LIST[i][0], t.data);
    });
  })
  .catch((e) => {
    console.error("Error loading themes", e);
  });

// for (var t in THEMES) {

//     .then(data => {
//         monaco.editor.defineTheme('monokai', data);
//     })
// }

self.MonacoEnvironment = {
  getWorkerUrl: function (moduleId, label) {
    if (label === "json") {
      return "./json.worker.js";
    }
    if (label === "css") {
      return "./css.worker.js";
    }
    if (label === "html") {
      return "./html.worker.js";
    }
    if (label === "typescript" || label === "javascript") {
      return "./ts.worker.js";
    }
    return "./editor.worker.js";
  },
};

export default {
  data() {
    return {
      mstyle: { height: "600px" },
    };
  },
  computed: {
    editor: {
      get() {
        return this.$store.state.editor;
      },
      set(value) {
        this.$store.commit("set_editor", value);
      },
    },
    editor_prefs() {
      return this.$store.state.settings.editor;
    },
    release() {
      return this.$store.state.release;
    },
    files() {
      return this.$store.state.files;
    },
    active: {
      get() {
        return this.$store.state.active_file;
      },
      set(value) {
        this.$store.commit("set_active", value);
      },
    },
    winheight() {
      return this.$store.state.winsize.height;
    },
  },
  watch: {
    $route(to, from) {
      this.init();
    },
    files(to, from) {
      if (to.length == 0) {
        if (this.editor) {
          this.editor.dispose();
          this.editor = null;
        }
      }

      to.forEach((f) => {
        if (!f.model) {
          f.init_model(monaco.editor);
        }
      });
    },
    active(to, from) {
      if (this.files[from]) {
        this.files[from].state = this.editor.saveViewState();
      }

      this.$nextTick(() => {
        this.set_active();
      });
    },
    winheight(to, from) {
      this.init();
    },
    editor_prefs(to, from) {
      if (this.editor) {
        this.editor.updateOptions(to);
      }
    },
  },
  mounted() {
    this.init();
  },
  methods: {
    init(set_active) {
      this.$nextTick(() => {
        if (this.files.length > 0) {
          if (!this.editor) {
            this.editor = monaco.editor.create(
              document.getElementById("m-editor"),
              this.editor_prefs
            );
            bind_keys(this.$store, monaco, this.editor);
          }

          var barh = document.querySelector(".v-system-bar").offsetHeight;
          var tabsh = document.getElementById("editor-tabs").offsetHeight;
          var h = this.winheight - (barh + tabsh);
          var w = document.getElementById("editor-wrapper").offsetWidth;

          if (h < 300) {
            h = 300;
          }

          this.mstyle.height = `${h}px`;
          this.editor.layout({ height: h, width: w });
          if (set_active) {
            this.set_active();
          }
        }
      });
    },
    set_active() {
      if (this.active == null) {
        return;
      }

      if (!this.editor) {
        this.init(true);
        return;
      }

      if (this.files[this.active].model) {
        this.editor.setModel(this.files[this.active].model);
        if (this.files[this.active].state) {
          this.editor.restoreViewState(this.files[this.active].state);
        }
        this.editor.focus();
      } else {
        this.$nextTick(() => {
          this.set_active();
        });
      }
    },
    close_file(index) {
      this.files[index].model.dispose();
      this.$store.commit("pop_file", index);
    },
  },
};
</script>
<style lang="less" scoped>
.v-tab {
  text-transform: none;
  position: relative;

  .reload {
    position: absolute;
    top: 2px;
    left: 2px;
  }

  .changed {
    position: absolute;
    top: 8px;
    left: 8px;
  }
}

#m-editor {
}
</style>
