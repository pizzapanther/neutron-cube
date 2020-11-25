<template>
  <div class="nc-file-browser">
    <v-treeview
      v-model="tree"
      :items="items"
      :load-children="fetch_children"
      :active.sync="activated"
      :open.sync="opened"
      activatable
      dense
      hoverable
      open-on-click
      transition
      return-object
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
      activated: [],
      tree: [],
      opened: [],
    };
  },
  computed: {
    items() {
      return this.$store.state.directories;
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
      var keep = to.map((t) => {
        return t.id;
      });

      from.forEach((item) => {
        if (keep.indexOf(item.id) == -1) {
          this.clear_children(item);
        }
      });
    },
    async activated(to, from) {
      to.forEach(async (t) => {
        await this.open_file_in_dir(t);
        this.clear_active(t);
      });
    },
  },
  methods: {
    async fetch_children(item) {
      await item.root_class.list(item);
    },
    clear_active(id) {
      setTimeout(() => {
        var index = this.activated.indexOf(id);
        if (index > -1) {
          this.activated.splice(index, 1);
        }
      }, 500);
    },
    clear_children(item) {
      item.children.forEach((c) => {
        if (c.children) {
          this.clear_children(c);
        }
      });

      // clear children so it is refreshed from disk next open
      item.children = [];
      // create a new id so Vuetify resets node.hasLoaded
      item.root_class.new_id(item);
    },
    async open_file_in_dir(item) {
      await item.root_class.open_file(item, this.$store);
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
