<template>
  <div class="height100">
    <div v-if="compatible" class="height100">
      <menu-bar></menu-bar>
      <v-navigation-drawer v-model="drawer" app> side nav </v-navigation-drawer>
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

import MenuBar from "./widgets/menu-bar.vue";
import MEditor from "./widgets/m-edit.vue";

export default {
  components: { MenuBar, MEditor },
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
  },
  computed: {
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
