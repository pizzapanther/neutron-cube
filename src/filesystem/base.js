import { v4 as uuidv4 } from "uuid";

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
  }

  init_model(editor) {
    this.model = editor.createModel(this.init_contents || "", this.lang_type());
    this.init_contents = null;
  }

  lang_type() {
    var parts = this.name.split(".");
    var ext = parts[parts.length - 1].toLowerCase();

    if (EXTENSIONS[ext]) {
      return EXTENSIONS[ext];
    }

    return "plaintext";
  }
}

export class BaseDir {
  constructor() {
    this.id = uuidv4();
    this.name = null;
    this.children = [];
  }

  static sort_name(a, b) {
    if (a.name < b.name) {
      return -1;
    }

    if (a.name > b.name) {
      return 1;
    }

    return 0;
  }
}
