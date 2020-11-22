import { BaseFile, BaseDir } from "./base.js";

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
  }

  async _list(item) {
    if (!item) {
      item = this;
    }
    var dirs = [];
    var files = [];

    for await (var entry of this.dh.values()) {
      if (entry.kind == "directory") {
        entry.children = [];
        dirs.push(entry);
      } else {
        files.push(entry);
      }
    }

    dirs.sort(LocalDirectory.sort_name);
    files.sort(LocalDirectory.sort_name);
    item.children = dirs;
  }

  list(item) {
    (async () => await this._list(item))();
  }

  static open_directory(context) {
    return new Promise((resolve, reject) => {
      showDirectoryPicker()
        .then((dh) => {
          resolve(new LocalDirectory(dh));
        })
        .catch((e) => {
          reject(e);
        });
    });
  }
}
