<template>
  <div class="nc-file-browser">
    <v-treeview
      v-model="tree"
      :items="items"
      :load-children="fetch_children"
      :open.sync="opened"
      dense
      hoverable
      open-on-click
      transition
    >
      <template v-slot:prepend="{ item, open }">
        <v-icon v-if="item.kind == 'directory'" :id="`dir-${item.id}`">
          {{ open ? "mdi-folder-open" : "mdi-folder" }}
        </v-icon>
        <v-icon v-else> mdi-file-document-outline </v-icon>
      </template>
    </v-treeview>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tree: [],
      opened: [],
      item_index: {},
    };
  },
  computed: {
    items() {
      return this.$store.state.localfile.directories;
    },
  },
  watch: {
    items(to, from) {
      if (to.length > 0) {
        setTimeout(() => {
          document.getElementById(`dir-${to[to.length - 1].id}`).click();
        }, 40);
      }
    },
    opened(to, from) {
      from.forEach((id) => {
        if (to.indexOf(id) == -1 && this.item_index[id]) {
          this.clear_children(this.item_index[id]);
        }
      });
    },
  },
  methods: {
    async fetch_children(item) {
      await item.root_class.list(item);
      this.item_index[item.id] = item;
    },
    clear_children(item) {
      item.children.forEach((c) => {
        if (c.children) {
          this.clear_children(c);
        }
      });

      if (this.item_index[item.id]) {
        delete this.item_index[item.id];
      }

      // clear children so it is refreshed from disk next open
      item.children = [];
      // create a new id so Vuetify resets node.hasLoaded
      item.root_class.new_id(item);
    },
  },
};
</script>
<style lang="less">
.nc-file-browser {
  padding-left: 2px;

  &
    > .v-treeview
    > .v-treeview-node
    > .v-treeview-node__root
    > .v-treeview-node__toggle {
    display: none !important;
  }

  .v-icon.v-icon {
    font-size: 18px;
  }

  .v-treeview-node__toggle {
    width: 12px;
    font-size: 12px;
  }

  .v-treeview-node__level {
    width: 12px;
  }

  .v-treeview-node__prepend {
    min-width: 18px;
    margin-right: 3px;
  }

  .v-treeview--dense .v-treeview-node__root {
    min-height: 0;
  }

  .v-treeview-node__root {
    padding-left: 0;
  }

  .v-treeview-node__content {
    margin-left: 0;
  }

  .v-treeview-node__toggle.v-icon {
    color: transparent;
  }

  .v-treeview-node__level:first-child {
    display: none !important;
  }
}
</style>
