const PREFS = {
    acceptSuggestionOnCommitCharacter: true,

    // "on" | "off" | "smart"
    acceptSuggestionOnEnter: "on",

    // 1: Disabled | 2: Enabled | 0: Unknown
    accessibilitySupport: 0,

    accessibilityPageSize: 10,

    // "always" | "languageDefined" | "beforeWhitespace" | "never"
    autoClosingBrackets: "languageDefined",

    // "always" | "auto" | "never"
    autoClosingOvertype: "auto",

    // "always" | "languageDefined" | "beforeWhitespace" | "never"
    autoClosingQuotes: "languageDefined",

    // 4: Full | 3: Advanced | 2: Brackets | 1: Keep | 0: None
    autoIndent: 3,

    automaticLayout: false,

    // "languageDefined" | "quotes" | "brackets" | "never"
    autoSurround: "languageDefined",

    codeLens: true,

    colorDecorators: true,

    columnSelection: false,

    comments: {ignoreEmptyLines: true, insertSpace: true},

    contextmenu: true,

    copyWithSyntaxHighlighting: true,

    // 5: Solid | 4: Expand | 3: Phase | 2: Smooth | 1: Blink | 0: Hidden
    cursorBlinking: 1,

    cursorSmoothCaretAnimation: false,

    // 6: UnderlineThin | 5: BlockOutline | 4: LineThin | 3: Underline | 2: Block | 1: Line
    cursorStyle: 1,

    cursorSurroundingLines: 0,

    // "default" | "all"
    cursorSurroundingLinesStyle: "default",

    cursorWidth: 0,

    disableLayerHinting: false,

    disableMonospaceOptimizations: false,

    dragAndDrop: true,

    emptySelectionClipboard: true,

    fastScrollSensitivity: 5,

    find: {
        cursorMoveOnType: true,

        seedSearchStringFromSelection: true,

        // "never" | "always" | "multiline"
        autoFindInSelection: "never",

        globalFindClipboard: false,

        addExtraSpaceOnTop: true,

        loop:true
    },

    fixedOverflowWidgets: false,

    folding: true,

    // "auto" | "indentation"
    foldingStrategy: "auto",

    foldingHighlight: true,

    unfoldOnClickAfterEndOfLine: false,

    fontFamily: "Consolas, 'Courier New', monospace",

    fontSize: 14,

    fontWeight: "normal",

    formatOnPaste: false,

    formatOnType: false,

    glyphMargin: false,

    gotoLocation: {
        // "peek" | "gotoAndPeek" | "goto"
        multiple: "peek",
        multipleDefinitions: "peek",
        multipleTypeDefinitions: "peek",
        multipleDeclarations: "peek",
        multipleImplementations: "peek",
        multipleReferences: "peek",

        alternativeDefinitionCommand: "editor.action.goToReferences",
        alternativeTypeDefinitionCommand: "editor.action.goToReferences",
        alternativeDeclarationCommand: "editor.action.goToReferences",
        alternativeImplementationCommand: "",
        alternativeReferenceCommand: ""
    },

    hideCursorInOverviewRuler: false,

    highlightActiveIndentGuide: true,

    hover: {
        enabled: true,
        delay: 300,
        sticky: true
    },

    inDiffEditor: false,

    letterSpacing: 0,

    lightbulb: {enabled: true},

    lineDecorationsWidth: "10px",

    lineHeight: 19,

    // 0: Off | 1: On | 2: Relative | 3: Interval
    lineNumbers: 1,

    lineNumbersMinChars: 5,

    links: true,

    // "never" | "near" | "always"
    matchBrackets: "always",

    minimap: {
        enabled: true,

        // "proportional" | "fill" | "fit"
        size: "proportional",

        // "right" | "left"
        side: "right",

        // "always" | "mouseover"
        showSlider: "mouseover",

        renderCharacters: true,

        maxColumn: 120,

        scale: 1
    },

    // "text" | "default" | "copy"
    mouseStyle: "text",

    mouseWheelScrollSensitivity: 1,

    mouseWheelZoom: false,

    multiCursorMergeOverlapping: true,

    // "ctrlCmd" | "alt"
    multiCursorModifier: "altKey",

    // "spread" | "full"
    multiCursorPaste: "spread",

    occurrencesHighlight: true,

    overviewRulerBorder: true,

    overviewRulerLanes: 2,

    padding: {"top": 2, "bottom": 2},

    parameterHints: {enabled: true, cycle: false},

    // "tree" | "editor"
    peekWidgetDefaultFocus: "tree",

    definitionLinkOpensInPeek: false,

    quickSuggestions: {
        other: true,
        comments: false,
        strings: false
    },

    quickSuggestionsDelay: 10,

    renameOnType: false,

    renderControlCharacters: false,

    renderIndentGuides: true,

    renderFinalNewline: true,

    // "none" | "gutter" | "line" | "all"
    renderLineHighlight: "line",

    renderLineHighlightOnlyWhenFocus: false,

    // "editable" | "on" | "off"
    renderValidationDecorations: "editable",

    // "none" | "boundary" | "selection" | "trailing" | "all"
    renderWhitespace: "selection",

    revealHorizontalRightPadding: 30,

    roundedSelection: true,

    scrollbar: {
        // "auto" | "visible" | "hidden"
        "vertical": "auto",

        // "auto" | "visible" | "hidden"
        "horizontal": "auto",

        "arrowSize": 11,

        "useShadows": true,

        "verticalHasArrows": false,

        "horizontalHasArrows": false,

        "horizontalScrollbarSize": 12,

        "horizontalSliderSize": 12,

        "verticalScrollbarSize": 14,

        "verticalSliderSize": 14,

        "handleMouseWheel": true,

        "alwaysConsumeMouseWheel": true
    },
    scrollBeyondLastColumn: 5,

    scrollBeyondLastLine: true,

    scrollPredominantAxis: true,

    selectionClipboard: true,

    selectionHighlight: true,

    selectOnLineNumbers: true,

    // "always" | "mouseover"
    showFoldingControls: "mouseover",

    showUnused: true,

    showDeprecated: true,

    // "top" | "bottom" | "inline" | "none"
    snippetSuggestions: "inline",

    smoothScrolling: false,

    stopRenderingLineAfter: 10000,

    suggest: {
        // "insert" | "replace"
        insertMode": "insert",
        filterGraceful": true,
        snippetsPreventQuickSuggestions": true,
        localityBonus": false,
        shareSuggestSelections": false,
        showIcons": true,
        maxVisibleSuggestions": 12,
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
        statusBar: {visible: false}
    },

    suggestFontSize: 0,

    suggestLineHeight: 0,

    suggestOnTriggerCharacters: true,

    // "first" | "recentlyUsed" | "recentlyUsedByPrefix"
    suggestSelection: "recentlyUsed",

    // "on" | "off" | "onlySnippets"
    tabCompletion: "off",

    trimAutoWhitespace: true,

    // "off" | "prompt" | "auto"
    unusualLineTerminators: "prompt",

    useTabStops: true,

    wordSeparators: "`~!@#$%^&*()-=+[{]}\\|;:'\",.<>/?",

    // "off" | "on" | "wordWrapColumn" | "bounded"
    wordWrap: "off",

    wordWrapBreakAfterCharacters: "\t})]?|/&.,;¢°′″‰℃、。｡､￠，．：；？！％・･ゝゞヽヾーァィゥェォッャュョヮヵヶぁぃぅぇぉっゃゅょゎゕゖㇰㇱㇲㇳㇴㇵㇶㇷㇸㇹㇺㇻㇼㇽㇾㇿ々〻ｧｨｩｪｫｬｭｮｯｰ”〉》」』】〕）］｝｣",

    wordWrapBreakBeforeCharacters: "([{‘“〈《「『【〔（［｛｢£¥＄￡￥+＋",

    wordWrapColumn: 80,

    wordWrapMinified: true,

    // "none" | "same" | "indent" | "deepIndent"
    wrappingIndent: "none",

    // "simple" | "advanced"
    wrappingStrategy: "simple"
};

export default PREFS;
