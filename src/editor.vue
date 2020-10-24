<template>
  <div v-if="compatible">
    <menu-bar></menu-bar>
    <v-navigation-drawer v-model="drawer" app> side nav </v-navigation-drawer>
    <v-main>
      <v-container fluid>
        <m-editor></m-editor>
      </v-container>
    </v-main>
  </div>
  <div v-else>
    <h2>Your browser is not compatible with the native file system API.</h2>
  </div>
</template>
<script>
import MenuBar from "./widgets/menu-bar.vue";
import MEditor from "./widgets/m-edit.vue";

export default {
  components: { MenuBar, MEditor },
  data() {
    return {};
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
};
</script>
<style lang="less" scoped>
.container {
  padding: 0;
}
</style>
