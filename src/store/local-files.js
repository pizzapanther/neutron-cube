import { LocalFile, LocalDirectory } from "../filesystem/local.js";

export default {
  namespaced: true,
  state: {},
  mutations: {},
  actions: {
    open_files(context) {
      LocalFile.open_files(context);
    },
    async open_directory(context) {
      return await LocalDirectory.open_directory(context);
    },
  },
};
