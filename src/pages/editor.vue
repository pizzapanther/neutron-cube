<template>
  <div class="height100">
    <div v-if="compatible" class="height100">
      <v-snackbar top v-model="snack_model" :timeout="snack_timeout">{{
        snack_text
      }}</v-snackbar>
      <menu-bar></menu-bar>
      <component v-bind:is="dialog"></component>
      <v-navigation-drawer v-model="drawer" app>
        <file-browser></file-browser>
      </v-navigation-drawer>
      <v-main class="height100">
        <v-container class="main-container height100" fluid>
          <m-editor></m-editor>
        </v-container>
      </v-main>
    </div>
    <div v-else class="height100">
      <h2>Your browser is not compatible with the native file system API.</h2>
    </div>
  </div>
</template>
<script>
import { debounce } from "debounce";

import MenuBar from "../widgets/menu-bar.vue";
import MEditor from "../widgets/m-edit.vue";
import FileBrowser from "../widgets/file-browser.vue";

export default {
  components: { MenuBar, MEditor, FileBrowser },
  data() {
    return {};
  },
  watch: {
    $route(to, from) {
      this.window_resize();
    },
  },
  mounted() {
    this.window_resize = debounce(() => {
      this._window_resize();
    }, 200);
    this.window_resize();

    window.addEventListener("resize", () => {
      this.window_resize();
    });

    this.$store.commit("settings/init_prefs");
  },
  computed: {
    dialog() {
      return this.$store.state.dialog;
    },
    snack_text() {
      return this.$store.state.snack_text;
    },
    snack_model: {
      get() {
        if (this.$store.state.snack_text) {
          return true;
        }

        return false;
      },
      set(value) {
        if (!value) {
          this.$store.commit("set_snack", { text: null });
        }
      },
    },
    snack_timeout() {
      return this.$store.state.snack_timeout;
    },
    drawer: {
      get() {
        return this.$store.state.drawer;
      },
      set(value) {
        this.$store.commit("set_drawer", value);
      },
    },
    compatible() {
      if (window.showOpenFilePicker && window.showDirectoryPicker) {
        return true;
      }

      return false;
    },
  },
  methods: {
    _window_resize() {
      var size = { width: window.innerWidth, height: window.innerHeight };
      this.$store.commit("set_winsize", size);
    },
  },
};
</script>
<style lang="less">
html,
body {
  height: 100%;
  overflow: hidden;
}

.height100 {
  height: 100%;
}

.main-container {
  padding: 0;
}
</style>
