<template>
  <v-container class="pref-widget">
    <v-row v-for="(value, key) in items">
      <v-col>
        <fieldset class="pgroup" v-if="is_complex(value)">
          <legend>{{ decamel(key) }}</legend>
          <pref-editor v-model="items[key]" :schema="schema[key]"></pref-editor>
        </fieldset>
        <v-switch
          v-else-if="is_boolean(value)"
          v-model="items[key]"
          :label="decamel(key)"
          dense
        ></v-switch>
        <v-text-field
          outlined
          :label="decamel(key)"
          v-else-if="is_number(value)"
          v-model="items[key]"
          type="number"
          :step="1"
          dense
        ></v-text-field>
        <v-select
          outlined
          v-else-if="has_choices(key)"
          :items="choices(key)"
          :label="decamel(key)"
          v-model="items[key]"
          dense
        ></v-select>
        <v-text-field
          outlined
          :label="decamel(key)"
          v-else
          v-model="items[key]"
          dense
        ></v-text-field>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  components: {
    PrefEditor: () => import("./pref-editor.vue"),
  },
  props: ["items", "schema"],
  model: { prop: "items", event: "input" },
  data() {
    return {};
  },
  methods: {
    is_complex(obj) {
      if (typeof obj == "object") {
        if (obj.default !== undefined) {
          return false;
        }

        return true;
      }

      return false;
    },
    is_boolean(obj) {
      return typeof obj == "boolean";
    },
    is_number(obj) {
      return typeof obj == "number";
    },
    has_choices(key) {
      if (this.schema[key] && this.schema[key].choices !== undefined) {
        return true;
      }

      return false;
    },
    choices(key) {
      var ret = [];
      this.schema[key].choices.forEach((c) => {
        ret.push({ text: this.decamel(c), value: c });
      });
      return ret;
    },
    decamel(text) {
      return text.replace(/([A-Z])/g, " $1").replace(/^./, function (str) {
        return str.toUpperCase();
      });
    },
    updatePrefs(value) {
      this.$emit("input", value);
    },
  },
};
</script>
<style lang="less">
.pref-widget {
  fieldset.pgroup {
    border-style: dashed;
    border-width: 1px;

    legend {
      font-weight: bold;
      padding: 0 5px;
    }
  }

  .v-text-field__details {
    display: none;
  }

  .v-messages {
    display: none;
  }

  .v-input--selection-controls {
    margin-top: 0;
  }
}
</style>
