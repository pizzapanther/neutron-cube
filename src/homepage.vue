<template>
  <v-main>
    <v-container>
      <v-row class="header">
        <v-col class="text-center">
          <h1>Neutron Cube</h1>
          <img src="images/icon-cube-red.png" alt="cube logo" />
          <h2>a browser based code editor</h2>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="text-center">
          <v-btn :to="{ name: 'editor' }" color="primary">
            Start Editing
          </v-btn>
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
              <li>Syntax Highlighting for XX Languages</li>
            </ul>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>
<script>
export default {};
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
