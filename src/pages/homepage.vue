<template>
  <v-main>
    <v-container>
      <v-row class="header">
        <v-col class="text-center">
          <h1>Neutron Cube</h1>
          <img src="../images/icon-cube-red.png" alt="cube logo" />
          <h2>a browser based code editor</h2>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="text-center" v-if="compatible">
          <v-divider></v-divider>
          <br />
          <v-btn :to="{ name: 'editor' }" color="primary">
            Start Editing
          </v-btn>
          <br />
          <br />
          <v-divider></v-divider>
        </v-col>
        <v-col class="text-center" v-else>
          <v-divider></v-divider>
          <br />
          <h2>
            Your browser is not compatible with the native file system API.
          </h2>
          <br />
          <v-divider></v-divider>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <div class="description">
            <p>
              Although Neutron Cube is based in the browser, it aims to have all
              the powers of a desktop code editor.
              <br /><br />
              <strong>Neutron Cube abilities:</strong>
            </p>
            <ul>
              <li>Works Offline <em>coming soon</em></li>
              <li>Edit local files</li>
              <li>Syntax Highlighting for 68 Languages</li>
            </ul>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>
<script>
export default {
  computed: {
    compatible() {
      if (window.showOpenFilePicker && window.showDirectoryPicker) {
        return true;
      }

      return false;
    },
  },
};
</script>
<style scoped lang="less">
.header {
  img {
    width: 256px;
  }

  h2 {
    font-weight: normal;
    font-style: italic;
  }
}

.description {
  margin: 0 auto;
  max-width: 550px;
}
</style>
