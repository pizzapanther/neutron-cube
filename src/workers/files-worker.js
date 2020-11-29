import "regenerator-runtime/runtime";

import { LocalDirectory } from "../filesystem/local.js";

class Tasks {
  static async check_files(files) {
    var mods = [];
    for (var i = 0; i < files.length; i++) {
      var m = null;
      try {
        m = await check_file(files[i]);
      } catch (e) {
        console.error(e);
        m = null;
      }

      if (m) {
        mods.push(m);
      }
    }

    return mods;
  }

  static async check_dirs(dirs) {
    var mods = [];
    for (var i = 0; i < dirs.length; i++) {
      var m = null;
      try {
        m = await check_dir(dirs[i]);
      } catch (e) {
        console.error(e);
        m = null;
      }

      if (m) {
        mods.push(m);
      }
    }
    return mods;
  }
}

onmessage = function (e) {
  Tasks[e.data.task](e.data.payload)
    .then((reply) => {
      if (reply) {
        postMessage({ task: e.data.task, payload: reply });
      }
    })
    .catch((e) => {
      console.error(e);
    });
};

async function check_file(f) {
  var fh = await f.fh.getFile();
  if (f.size != fh.size || f.lastModified != fh.lastModified) {
    return { id: f.id, size: fh.size, lastModified: fh.lastModified };
  }
}

async function check_dir(d) {
  var dirs = [];
  var files = [];

  for await (var entry of d.dh.values()) {
    var e = {
      name: entry.name,
      kind: entry.kind,
    };

    if (entry.kind == "directory") {
      e.children = [];
      dirs.push(e);
    } else {
      files.push(e);
    }
  }

  dirs.sort(LocalDirectory.sort_name);
  files.sort(LocalDirectory.sort_name);
  var dhash = LocalDirectory.calc_hash(dirs, files);
  if (dhash != d.hash) {
    return { id: d.id, hash: dhash };
  }
}
