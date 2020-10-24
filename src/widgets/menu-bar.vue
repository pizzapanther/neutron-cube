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
    </div>
  </v-system-bar>
</template>
<script>
var Menus = [
  {
    name: "File",
    items: [{ name: "Open Files", action: "localfile/open_files" }],
  },
];

export default {
  data() {
    return {
      menus: Menus,
    };
  },
  methods: {
    menu_action(action, payload) {
      this.$store.dispatch(action, payload);
    },
  },
};
</script>
