<template>
  <div>
    <menu-bar></menu-bar>
    <v-navigation-drawer v-model="drawer" app> side nav </v-navigation-drawer>
    <v-main>
      <v-container fluid> editor </v-container>
    </v-main>
  </div>
</template>
<script>
import MenuBar from "./widgets/menu-bar.vue";

export default {
  components: { MenuBar },
  data() {
    return {
      drawer: null,
    };
  },
};
</script>
