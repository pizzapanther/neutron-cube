class LocalFile {
  constructor(fh) {
    this.fh = fh;
    this.name = fh.name;
    this.filetype = "local";
    this.size = 0;
    this.lastModified = 0;
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
            resolve({ file: this, contents: reader.result });
          };
          reader.readAsText(file);
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
            .then((payload) => {
              context.dispatch("add_file", payload, { root: true });
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
