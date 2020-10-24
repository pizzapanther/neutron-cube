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
  watch: {
    $route(to, from) {
      this.init();
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
  },
};
</script>
<style lang="less" scoped>
#m-editor {
}
</style>
