import LocalFile from "../filesystem/local.js";

export default {
  namespaced: true,
  state: {},
  actions: {
    open_files(context) {
      LocalFile.open_files(context);
    },
  },
};
