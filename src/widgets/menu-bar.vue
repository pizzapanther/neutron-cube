<template>
  <v-system-bar app>
    <div class="menu">
      <v-menu>
        <template v-slot:activator="{ on, attrs }">
          <v-btn text v-bind="attrs" v-on="on"> File </v-btn>
        </template>
        <v-list>
          <v-list-item link>
            <v-list-item-title @click="open_file()"
              >Open File</v-list-item-title
            >
          </v-list-item>
        </v-list>
      </v-menu>
    </div>
  </v-system-bar>
</template>
<script>
export default {
  methods: {
    open_file() {
      console.log("narf");
      window
        .showOpenFilePicker()
        .then((filehandles) => {
          console.log(filehandles);
        })
        .catch((e) => {});
    },
  },
};
</script>
