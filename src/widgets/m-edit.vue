<template>
  <div id="m-editor" :style="mstyle"></div>
</template>
<script>
import * as monaco from "monaco-editor";

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
      editor: null,
    };
  },
  computed: {
    files() {
      return this.$store.state.files;
    },
    active() {
      return this.$store.state.active_file;
    },
  },
  watch: {
    $route(to, from) {
      this.init();
    },
    files(to, from) {
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
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.$nextTick(() => {
        this.editor = monaco.editor.create(document.getElementById("m-editor"));
      });
    },
    set_active() {
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
  },
};
</script>
<style lang="less" scoped>
#m-editor {
}
</style>
