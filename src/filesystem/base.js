import { v4 as uuidv4 } from "uuid";

class BaseFile {
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
    this.model = editor.createModel(this.init_contents || "", "javascript");
    this.init_contents = null;
  }
}

export default BaseFile;
