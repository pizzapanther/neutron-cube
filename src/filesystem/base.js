import debounce from "debounce";
import md5 from "md5";
import { v4 as uuidv4 } from "uuid";

import Store from "../store/index.js";
import { EXTENSIONS } from "../lib/modes.js";

export class BaseFile {
  constructor() {
    this.id = uuidv4();
    this.name = null;
    this.filetype = null;
    this.size = 0;
    this.lastModified = 0;
    this.model = null;
    this.state = null;
    this.init_contents = null;
    this.changed = false;
    this.filehash = null;
    this.needs_reload = false;
    this.model_change = debounce(() => {
      this._model_change();
    }, 1000);
  }

  init_model(editor) {
    this.model = editor.createModel(this.init_contents || "", this.lang_type());
    this.filehash = md5(this.init_contents);
    this.init_contents = null;
    this.model.onDidChangeContent(this.model_change);
  }

  _model_change() {
    var hash = md5(this.model.getValue());
    if (hash == this.filehash) {
      Store.commit("set_file_attrs", { id: this.id, changed: false });
    } else {
      Store.commit("set_file_attrs", { id: this.id, changed: true });
    }
  }

  lang_type() {
    var parts = this.name.split(".");
    var ext = parts[parts.length - 1].toLowerCase();

    if (EXTENSIONS[ext]) {
      return EXTENSIONS[ext];
    }

    return "plaintext";
  }

  post_save() {
    this.filehash = md5(this.model.getValue());
    Store.commit("set_file_attrs", {
      id: this.id,
      changed: false,
      needs_reload: false,
    });
  }

  open() {
    return new Promise((resolve, reject) => {
      this.read_from_source()
        .then((file) => {
          this.size = file.size;
          this.lastModified = file.lastModified;
          this.init_contents = file.text;
          resolve(this);
        })
        .catch((e) => {
          reject(e);
        });
    });
  }

  reopen() {
    return new Promise((resolve, reject) => {
      this.read_from_source()
        .then((file) => {
          this.size = file.size;
          this.lastModified = file.lastModified;
          this.model.setValue(file.text);
          resolve(this);
        })
        .catch((e) => {
          reject(e);
        });
    });
  }

  reload(force) {
    if (!force && this.changed) {
      this.read_from_source()
        .then((file) => {
          var hash = md5(file.text);
          var current_hash = md5(this.model.getValue());

          if (hash == current_hash) {
            this.size = file.size;
            this.lastModified = file.lastModified;
            this.filehash = hash;

            Store.commit("set_file_attrs", {
              id: this.id,
              needs_reload: false,
              changed: false,
            });
          } else {
            Store.commit("set_file_attrs", { id: this.id, needs_reload: true });
          }
        })
        .catch((e) => {
          Store.commit("set_file_attrs", { id: this.id, needs_reload: true });
        });
    } else {
      this.reopen()
        .then(() => {
          this.filehash = md5(this.model.getValue());
          Store.commit("set_file_attrs", {
            id: this.id,
            changed: false,
            needs_reload: false,
          });
        })
        .catch((e) => {});
    }
  }
}

export class BaseDir {
  constructor() {
    this.id = uuidv4();
    this.name = null;
    this.children = [];
    this.kind = "directory";
    this.dirhash = null;
  }

  static new_id(item) {
    item.id = uuidv4();
  }

  static sort_name(a, b) {
    if (a.name.toLowerCase() < b.name.toLowerCase()) {
      return -1;
    }

    if (a.name.toLowerCase() > b.name.toLowerCase()) {
      return 1;
    }

    return 0;
  }

  static calc_hash(dirs, files) {
    var children = [];

    dirs = dirs.map((c) => {
      return c.name;
    });

    files = files.map((c) => {
      return c.name;
    });

    children = dirs;
    children.push("---files---");
    children.push(...files);

    return md5(children.join("\n"));
  }
}
