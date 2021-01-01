<template>
  <v-dialog v-model="dialog" persistent scrollable>
    <v-card class="editor-settings">
      <v-card-title>Editor Settings</v-card-title>
      <v-divider></v-divider>
      <v-card-text id="prefScrollable">
        <pref-editor v-model="prefs" :schema="schema" :level="1"></pref-editor>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-btn @click="close()"> Cancel </v-btn>
        <v-spacer></v-spacer>
        <v-btn color="primary" @click="save_prefs()"> Save </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import deepcopy from "deepcopy";

import PrefEditor from "../widgets/pref-editor.vue";
import { PREFS } from "../defaults/editor.js";

export default {
  components: { PrefEditor },
  data() {
    return {
      dialog: true,
      prefs: {},
      schema: PREFS,
    };
  },
  mounted() {
    this.prefs = deepcopy(this.$store.state.settings.editor);
  },
  methods: {
    save_prefs() {
      this.$store.commit("settings/update_editor_prefs", deepcopy(this.prefs));
      this.close();
    },
    close() {
      this.dialog = false;
      this.$store.commit("close_dialog");
    },
  },
};
</script>
<style lang="less">
.v-dialog {
  max-width: 720px;
}
</style>
