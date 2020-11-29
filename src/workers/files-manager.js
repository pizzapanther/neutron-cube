import Store from "../store/index.js";

import { LocalDirectory } from "../filesystem/local.js";

var fileWorker;
class ReplyTasks {
  static check_files(files) {
    if (files.length) {
      Store.commit("save_editor_state");
    }

    Store.state.files.forEach((f) => {
      files.forEach((r) => {
        if (r.id == f.id) {
          f.reload();
        }
      });
    });
  }

  static check_dirs(dirs) {
    Store.state.opened_dirs.forEach((d) => {
      dirs.forEach((r) => {
        if (r.id == d.id) {
          LocalDirectory._list(d)
            .then((ret) => {
              LocalDirectory.splice(d, ret.children);
            })
            .catch((e) => {});
        }
      });
    });
  }
}

function worker_reply(e) {
  ReplyTasks[e.data.task](e.data.payload);
}

async function file_worker_loop() {
  try {
    var files = [];
    Store.state.files.forEach((f) => {
      if (f.fh) {
        files.push({
          id: f.id,
          fh: f.fh,
          size: f.size,
          lastModified: f.lastModified,
        });
      }
    });

    var dirs = [];
    for (var i = 0; i < Store.state.opened_dirs.length; i++) {
      var d = Store.state.opened_dirs[i];
      if (d.dirtype == "local") {
        var dh = await LocalDirectory.get_dir_handle(d);
        dirs.push({ id: d.id, dh: dh, hash: d.dirhash, name: d.name });
      }
    }

    fileWorker.postMessage({ task: "check_files", payload: files });
    fileWorker.postMessage({ task: "check_dirs", payload: dirs });
  } catch (e) {
    console.error(e);
  }

  setTimeout(() => {
    file_worker_loop()
      .then(() => {})
      .catch((e) => {});
  }, 1000 * 20);
}

function init() {
  fileWorker = new Worker("./files-worker.js");
  fileWorker.onmessage = worker_reply;
  file_worker_loop()
    .then(() => {})
    .catch((e) => {});
}

export default init;
