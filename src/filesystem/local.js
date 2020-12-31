import { BaseFile, BaseDir } from "./base.js";
import { v4 as uuidv4 } from "uuid";

export class LocalFile extends BaseFile {
  constructor(fh) {
    super();

    this.fh = fh;
    this.name = fh.name;
    this.filetype = "local";
  }

  async read_from_source() {
    var file = await this.fh.getFile();
    var contents = await file.text();
    return {
      size: file.size,
      lastModified: file.lastModified,
      text: contents,
    };
  }

  async save() {
    var wh = await this.fh.createWritable();
    await wh.write(this.model.getValue());
    await wh.close();
    this.post_save();
  }

  static open_files(context) {
    window
      .showOpenFilePicker({ multiple: true })
      .then((filehandles) => {
        filehandles.forEach((fh) => {
          new LocalFile(fh)
            .open()
            .then((file) => {
              context.dispatch("add_file", file, { root: true });
            })
            .catch((e) => {});
        });
      })
      .catch((e) => {
        // user abort
      });
  }
}

export default LocalFile;

export class LocalDirectory extends BaseDir {
  constructor(dh) {
    super();

    this.dh = dh;
    this.name = dh.name;
    this.dirtype = "local";
    this.root = true;
    this.root_class = LocalDirectory;
  }

  static async get_dir_handle(item) {
    try {
      if (!item.dh) {
        if (!item.parent.dh) {
          item.parent.dh = await LocalDirectory.get_dir_handle(item.parent);
        }

        item.dh = await item.parent.dh.getDirectoryHandle(item.name);
      }
    } catch (e) {
      console.error(e);
    }

    return item.dh;
  }

  static async list(item) {
    var ret = await LocalDirectory._list(item);
    item.dirhash = ret.dirhash;
    item.children = ret.children;
  }

  static async _list(item) {
    var dirs = [];
    var files = [];

    if (!item.dh) {
      await LocalDirectory.get_dir_handle(item);
    }

    for await (var entry of item.dh.values()) {
      var e = {
        name: entry.name,
        kind: entry.kind,
        id: uuidv4(),
        parent: item,
        root_class: LocalDirectory,
      };

      if (entry.kind == "directory") {
        e.children = [];
        e.dirtype = "local";
        dirs.push(e);
      } else {
        files.push(e);
      }
    }

    dirs.sort(LocalDirectory.sort_name);
    files.sort(LocalDirectory.sort_name);
    var dirhash = LocalDirectory.calc_hash(dirs, files);
    var children = dirs;
    children.push(...files);
    return { dirhash, children };
  }

  static open_directory(context) {
    return new Promise((resolve, reject) => {
      showDirectoryPicker()
        .then((dh) => {
          dh = new LocalDirectory(dh);
          context.dispatch("add_directory", dh, { root: true });
          resolve(dh);
        })
        .catch((e) => {
          reject(e);
        });
    });
  }

  static async open_file(item, store) {
    var dh = await LocalDirectory.get_dir_handle(item.parent);
    var fh = await dh.getFileHandle(item.name);
    var file = new LocalFile(fh);
    await file.open();
    store.dispatch("add_file", file);
  }
}
