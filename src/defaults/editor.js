const PREFS = {
  acceptSuggestionOnCommitCharacter: true,

  acceptSuggestionOnEnter: {
    default: "on",
    choices: ["on", "off", "smart"],
  },

  accessibilitySupport: {
    default: "auto",
    choices: ["auto", "on", "off"],
  },

  accessibilityPageSize: 10,

  autoClosingBrackets: {
    default: "languageDefined",
    choices: ["always", "languageDefined", "beforeWhitespace", "never"],
  },

  autoClosingOvertype: {
    default: "auto",
    choices: ["always", "auto", "never"],
  },

  autoClosingQuotes: {
    default: "languageDefined",
    choices: ["always", "languageDefined", "beforeWhitespace", "never"],
  },

  autoIndent: {
    default: "advanced",
    choices: ["none", "keep", "brackets", "advanced", "full"],
  },

  autoSurround: {
    default: "languageDefined",
    choices: ["languageDefined", "quotes", "brackets", "never"],
  },

  codeLens: true,

  colorDecorators: true,

  columnSelection: false,

  comments: { ignoreEmptyLines: true, insertSpace: true },

  contextmenu: true,

  copyWithSyntaxHighlighting: true,

  cursorBlinking: {
    default: "blink",
    choices: ["blink", "smooth", "phase", "expand", "solid"],
  },

  cursorSmoothCaretAnimation: false,

  cursorStyle: {
    default: "line",
    choices: [
      "line",
      "block",
      "underline",
      "line-thin",
      "block-outline",
      "underline-thin",
    ],
  },

  cursorSurroundingLines: 0,

  cursorSurroundingLinesStyle: {
    default: "default",
    choices: ["default", "all"],
  },

  cursorWidth: 0,

  disableLayerHinting: false,

  disableMonospaceOptimizations: false,

  dragAndDrop: true,

  emptySelectionClipboard: true,

  fastScrollSensitivity: 5,

  find: {
    cursorMoveOnType: true,

    seedSearchStringFromSelection: true,

    autoFindInSelection: {
      default: "never",
      choices: ["never", "always", "multiline"],
    },

    globalFindClipboard: false,

    addExtraSpaceOnTop: true,

    loop: true,
  },

  fixedOverflowWidgets: false,

  folding: true,

  foldingStrategy: {
    default: "auto",
    choices: ["auto", "indentation"],
  },

  foldingHighlight: true,

  unfoldOnClickAfterEndOfLine: false,

  fontFamily: "Consolas, 'Courier New', monospace",

  fontSize: 14,

  fontWeight: "normal",

  formatOnPaste: false,

  formatOnType: false,

  glyphMargin: false,

  gotoLocation: {
    multiple: {
      default: "peek",
      choices: ["peek", "gotoAndPeek", "goto"],
    },
    multipleDefinitions: {
      default: "peek",
      choices: ["peek", "gotoAndPeek", "goto"],
    },
    multipleTypeDefinitions: {
      default: "peek",
      choices: ["peek", "gotoAndPeek", "goto"],
    },
    multipleDeclarations: {
      default: "peek",
      choices: ["peek", "gotoAndPeek", "goto"],
    },
    multipleImplementations: {
      default: "peek",
      choices: ["peek", "gotoAndPeek", "goto"],
    },
    multipleReferences: {
      default: "peek",
      choices: ["peek", "gotoAndPeek", "goto"],
    },

    alternativeDefinitionCommand: "editor.action.goToReferences",
    alternativeTypeDefinitionCommand: "editor.action.goToReferences",
    alternativeDeclarationCommand: "editor.action.goToReferences",
    alternativeImplementationCommand: "",
    alternativeReferenceCommand: "",
  },

  hideCursorInOverviewRuler: false,

  highlightActiveIndentGuide: true,

  hover: {
    enabled: true,
    delay: 300,
    sticky: true,
  },

  inDiffEditor: false,

  letterSpacing: 0,

  lightbulb: { enabled: true },

  lineDecorationsWidth: "10px",

  lineHeight: 19,

  lineNumbers: {
    default: "on",
    choices: ["on", "off", "relative", "interval"],
  },

  lineNumbersMinChars: 5,

  links: true,

  matchBrackets: {
    default: "always",
    choices: ["never", "near", "always"],
  },

  minimap: {
    enabled: true,

    size: {
      default: "proportional",
      choices: ["proportional", "fill", "fit"],
    },

    side: {
      default: "right",
      choices: ["right", "left"],
    },

    showSlider: {
      default: "mouseover",
      choices: ["always", "mouseover"],
    },

    renderCharacters: true,

    maxColumn: 120,

    scale: 1,
  },

  mouseStyle: {
    default: "text",
    choices: ["text", "default", "copy"],
  },

  mouseWheelScrollSensitivity: 1,

  mouseWheelZoom: false,

  multiCursorMergeOverlapping: true,

  multiCursorModifier: {
    default: "altKey",
    choices: ["ctrlCmd", "alt"],
  },

  multiCursorPaste: {
    default: "spread",
    choices: ["spread", "full"],
  },

  occurrencesHighlight: true,

  overviewRulerBorder: true,

  overviewRulerLanes: 2,

  padding: { top: 2, bottom: 2 },

  parameterHints: { enabled: true, cycle: false },

  peekWidgetDefaultFocus: {
    default: "tree",
    choices: ["tree", "editor"],
  },

  definitionLinkOpensInPeek: false,

  quickSuggestions: {
    other: true,
    comments: false,
    strings: false,
  },

  quickSuggestionsDelay: 10,

  renameOnType: false,

  renderControlCharacters: false,

  renderIndentGuides: true,

  renderFinalNewline: true,

  renderLineHighlight: {
    default: "line",
    choices: ["none", "gutter", "line", "all"],
  },

  renderLineHighlightOnlyWhenFocus: false,

  renderValidationDecorations: {
    default: "editable",
    choices: ["editable", "on", "off"],
  },

  renderWhitespace: {
    default: "selection",
    choices: ["none", "boundary", "selection", "trailing", "all"],
  },

  revealHorizontalRightPadding: 30,

  roundedSelection: true,

  scrollbar: {
    vertical: {
      default: "auto",
      choices: ["auto", "visible", "hidden"],
    },

    horizontal: {
      default: "auto",
      choices: ["auto", "visible", "hidden"],
    },

    arrowSize: 11,

    useShadows: true,

    verticalHasArrows: false,

    horizontalHasArrows: false,

    horizontalScrollbarSize: 12,

    horizontalSliderSize: 12,

    verticalScrollbarSize: 14,

    verticalSliderSize: 14,

    handleMouseWheel: true,

    alwaysConsumeMouseWheel: true,
  },
  scrollBeyondLastColumn: 5,

  scrollBeyondLastLine: true,

  scrollPredominantAxis: true,

  selectionClipboard: true,

  selectionHighlight: true,

  selectOnLineNumbers: true,

  showFoldingControls: {
    default: "mouseover",
    choices: ["always", "mouseover"],
  },

  showUnused: true,

  showDeprecated: true,

  snippetSuggestions: {
    default: "inline",
    choices: ["top", "bottom", "inline", "none"],
  },

  smoothScrolling: false,

  stopRenderingLineAfter: 10000,

  suggest: {
    insertMode: {
      default: "insert",
      choices: ["insert", "replace"],
    },
    filterGraceful: true,
    snippetsPreventQuickSuggestions: true,
    localityBonus: false,
    shareSuggestSelections: false,
    showIcons: true,
    maxVisibleSuggestions: 12,
    showMethods: true,
    showFunctions: true,
    showConstructors: true,
    showFields: true,
    showVariables: true,
    showClasses: true,
    showStructs: true,
    showInterfaces: true,
    showModules: true,
    showProperties: true,
    showEvents: true,
    showOperators: true,
    showUnits: true,
    showValues: true,
    showConstants: true,
    showEnums: true,
    showEnumMembers: true,
    showKeywords: true,
    showWords: true,
    showColors: true,
    showFiles: true,
    showReferences: true,
    showFolders: true,
    showTypeParameters: true,
    showSnippets: true,
    showUsers: true,
    showIssues: true,
    statusBar: { visible: false },
  },

  suggestFontSize: 0,

  suggestLineHeight: 0,

  suggestOnTriggerCharacters: true,

  suggestSelection: {
    default: "recentlyUsed",
    choices: ["first", "recentlyUsed", "recentlyUsedByPrefix"],
  },

  tabCompletion: {
    default: "off",
    choices: ["on", "off", "onlySnippets"],
  },

  trimAutoWhitespace: true,

  unusualLineTerminators: {
    default: "prompt",
    choices: ["off", "prompt", "auto"],
  },

  useTabStops: true,

  wordSeparators: "`~!@#$%^&*()-=+[{]}\\|;:'\",.<>/?",

  // "off" | "on" | "wordWrapColumn" | "bounded"
  wordWrap: "off",

  wordWrapBreakAfterCharacters:
    "\t})]?|/&.,;¢°′″‰℃、。｡､￠，．：；？！％・･ゝゞヽヾーァィゥェォッャュョヮヵヶぁぃぅぇぉっゃゅょゎゕゖㇰㇱㇲㇳㇴㇵㇶㇷㇸㇹㇺㇻㇼㇽㇾㇿ々〻ｧｨｩｪｫｬｭｮｯｰ”〉》」』】〕）］｝｣",

  wordWrapBreakBeforeCharacters: "([{‘“〈《「『【〔（［｛｢£¥＄￡￥+＋",

  wordWrapColumn: 80,

  wordWrapMinified: true,

  wrappingIndent: {
    default: "none",
    choices: ["none", "same", "indent", "deepIndent"],
  },

  wrappingStrategy: {
    default: "simple",
    choices: ["simple", "advanced"],
  },
};

function get_defaults(obj, prefs) {
  for (var p in prefs) {
    if (prefs[p].default !== undefined) {
      obj[p] = prefs[p].default;
    } else {
      if (typeof prefs[p] == "object") {
        obj[p] = get_defaults({}, prefs[p]);
      } else {
        obj[p] = prefs[p];
      }
    }
  }

  return obj;
}

var DEFAULT_PREFS = get_defaults({}, PREFS);

export { PREFS, DEFAULT_PREFS };
