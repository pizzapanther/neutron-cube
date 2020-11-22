<template>
  <div>
    <v-treeview v-model="tree" :items="items" item-key="name"></v-treeview>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tree: [],
    };
  },
  computed: {
    items() {
      return this.$store.state.localfile.directories;
    },
  },
};
</script>
