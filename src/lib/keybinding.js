const BINDINGS = [
  {
    name: "Save File",
    action: "save_current_file",
    modkey: "CtrlCmd",
    key: "KEY_S",
  },
  {
    name: "Save All Files",
    action: "save_all_files",
    modkey: "CtrlCmd",
    shift: true,
    key: "KEY_S",
  },
];

export default function bind_keys(store, monaco, editor) {
  BINDINGS.forEach((b) => {
    var keys = monaco.KeyMod[b.modkey] | monaco.KeyCode[b.key];
    if (b.shift) {
      keys =
        monaco.KeyMod.Shift | monaco.KeyMod[b.modkey] | monaco.KeyCode[b.key];
    }

    editor.addAction({
      id: `nc-${b.action}`,
      label: b.name,
      keybindings: [keys],
      run: function () {
        store.dispatch(b.action);
      },
    });
  });
}
