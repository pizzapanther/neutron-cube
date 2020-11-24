import { LocalFile, LocalDirectory } from "../filesystem/local.js";

export default {
  namespaced: true,
  state: {
    directories: [],
  },
  mutations: {
    add_dir(state, dir) {
      state.directories.push(dir);
    },
  },
  actions: {
    open_files(context) {
      LocalFile.open_files(context);
    },
    async open_directory(context) {
      var dir = await LocalDirectory.open_directory(context);
      return context.commit("add_dir", dir);
    },
  },
};
