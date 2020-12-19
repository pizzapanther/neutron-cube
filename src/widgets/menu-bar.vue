<template>
  <v-system-bar app>
    <div class="menu">
      <v-menu v-for="menu in menus" :key="menu.name">
        <template v-slot:activator="{ on, attrs }">
          <v-btn text v-bind="attrs" v-on="on">{{ menu.name }}</v-btn>
        </template>
        <v-list>
          <v-list-item link v-for="item in menu.items" :key="item.name">
            <v-list-item-title @click="menu_action(item.action, item.payload)">
              {{ item.name }}
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      <span v-if="needs_update" class="update">
        Update Available:
        <v-btn text color="error" @click="update()">Reload Now</v-btn>
      </span>
    </div>
  </v-system-bar>
</template>
<script>
var Menus = [
  {
    name: "File",
    items: [
      { name: "Open Files", action: "localfile/open_files" },
      { name: "Open Directory", action: "localfile/open_directory" },
    ],
  },
  {
    name: "Preferences",
    items: [{ name: "Editor Settings", action: "settings/edit_editor" }],
  },
];

export default {
  data() {
    return {
      menus: Menus,
    };
  },
  computed: {
    needs_update() {
      return this.$store.state.needs_update;
    },
  },
  methods: {
    menu_action(action, payload) {
      this.$store.dispatch(action, payload);
    },
    update() {
      this.$store.dispatch("force_update");
    },
  },
};
</script>
<style lang="less" scoped>
.update {
  padding-left: 15px;
}
</style>
