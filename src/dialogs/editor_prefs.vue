<template>
  <v-dialog v-model="dialog" persistent>
    <v-card>
      <v-card-title>Editor Settings</v-card-title>
      <v-divider></v-divider>
      <v-card-text></v-card-text>
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
export default {
  data() {
    return {
      dialog: true,
    };
  },
  methods: {
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
