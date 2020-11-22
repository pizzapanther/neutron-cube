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
    open_directory(context) {
      LocalDirectory.open_directory(context)
        .then((dir) => {
          context.commit("add_dir", dir);
          return dir.list();
        })
        .then((dir) => {})
        .catch((e) => {
          // user abort??
        });
    },
  },
};
