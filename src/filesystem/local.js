import { BaseFile, BaseDir } from "./base.js";
import { v4 as uuidv4 } from "uuid";

export class LocalFile extends BaseFile {
  constructor(fh) {
    super();

    this.fh = fh;
    this.name = fh.name;
    this.filetype = "local";
  }

  open() {
    return new Promise((resolve, reject) => {
      this.fh
        .getFile()
        .then((file) => {
          this.size = file.size;
          this.lastModified = file.lastModified;
          var reader = new FileReader();
          reader.onload = () => {
            this.init_contents = reader.result;
            resolve(this);
          };
          reader.readAsText(file);
        })
        .catch((e) => {
          reject(e);
        });
    });
  }

  save() {
    return new Promise((resolve, reject) => {
      var wh;
      this.fh
        .createWritable()
        .then((writeable) => {
          wh = writeable;
          return wh.write(this.model.getValue());
        })
        .then(() => {
          return wh.close();
        })
        .then(() => {
          resolve();
        })
        .catch((e) => {
          reject(e);
        });
    });
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
          console.log(item.parent);
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
        dirs.push(e);
      } else {
        files.push(e);
      }
    }

    dirs.sort(LocalDirectory.sort_name);
    files.sort(LocalDirectory.sort_name);
    item.children = dirs;
    item.children.push(...files);
  }

  static open_directory(context) {
    return new Promise((resolve, reject) => {
      showDirectoryPicker()
        .then((dh) => {
          var dh = new LocalDirectory(dh);
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
