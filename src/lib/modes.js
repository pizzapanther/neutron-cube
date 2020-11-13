export const MODE_CATS = {
  P: "Programming",
  S: "Scripting",
  M: "Markup/Template",
  Q: "Query/Data",
  O: "Other",
};

export var MODE_CAT_MAP = {};
MODE_CAT_MAP[MODE_CATS.P] = 0;
MODE_CAT_MAP[MODE_CATS.S] = 1;
MODE_CAT_MAP[MODE_CATS.M] = 2;
MODE_CAT_MAP[MODE_CATS.Q] = 3;
MODE_CAT_MAP[MODE_CATS.O] = 4;

export var MODES = {
  abap: {
    name: "ABAP",
    ext: ["abap"],
    cat: MODE_CATS.P,
  },

  apex: {
    name: "Apex",
    ext: ["apex", "cls", "trigger", "tgr"],
    cat: MODE_CATS.Q,
  },

  azcli: {
    name: "Azure CLI",
    ext: ["azcli"],
    cat: MODE_CATS.S,
  },

  bat: {
    name: "Batch File",
    ext: ["bat", "cmd"],
    cat: MODE_CATS.S,
  },

  cameligo: {
    name: "CameLigo",
    ext: ["ligo", "mligo"],
    cat: MODE_CATS.S,
  },

  clojure: {
    name: "Clojure",
    ext: ["clj", "cljs"],
    cat: MODE_CATS.P,
  },

  coffee: {
    name: "Coffee Script",
    ext: ["cof", "coffee", "cf", "cson", "Cakefile"],
    cat: MODE_CATS.S,
  },

  cpp: {
    name: "C/C++",
    ext: ["c", "cpp", "h", "hpp", "cc", "cxx", "ino", "hh"],
    cat: MODE_CATS.P,
  },

  csharp: {
    name: "C#",
    ext: ["cs"],
    cat: MODE_CATS.P,
  },

  csp: {
    name: "CSP",
    ext: ["csp"],
    cat: MODE_CATS.O,
  },

  css: {
    name: "CSS",
    ext: ["css"],
    cat: MODE_CATS.O,
  },

  dart: {
    name: "Dart",
    ext: ["dart"],
    cat: MODE_CATS.S,
  },

  dockerfile: {
    name: "Dockerfile",
    ext: ["dockerfile"],
    cat: MODE_CATS.O,
  },

  fsharp: {
    name: "FSharp",
    ext: ["fsi", "fs", "ml", "mli", "fsx", "fsscript"],
    cat: MODE_CATS.P,
  },

  go: {
    name: "Go",
    ext: ["go"],
    cat: MODE_CATS.P,
  },

  graphql: {
    name: "GraphQL",
    ext: ["graphql", "gql"],
    cat: MODE_CATS.Q,
  },

  handlebars: {
    name: "Handlebars",
    ext: ["hbs", "handlebars", "tpl", "mustache"],
    cat: MODE_CATS.M,
  },

  hcl: {
    name: "HashiCorp Configuration Language",
    ext: ["hcl"],
    cat: MODE_CATS.Q,
  },

  html: {
    name: "HTML",
    ext: ["htm", "html", "xhtml", "vue", "we", "wpy"],
    cat: MODE_CATS.M,
  },

  ini: {
    name: "INI",
    ext: ["ini", "conf", "cfg", "prefs"],
    cat: MODE_CATS.O,
  },

  java: {
    name: "Java",
    ext: ["java", "class"],
    cat: MODE_CATS.P,
  },

  javascript: {
    name: "Javascript",
    ext: ["js", "gs", "javascript", "json", "es6", "jsx", "mjs"],
    cat: MODE_CATS.S,
  },

  julia: {
    name: "Julia",
    ext: ["jl"],
    cat: MODE_CATS.P,
  },

  kotlin: {
    name: "Kotlin",
    ext: ["kt", "kts"],
    cat: MODE_CATS.P,
  },

  less: {
    name: "Less",
    ext: ["less"],
    cat: MODE_CATS.O,
  },

  lexon: {
    name: "Lexon",
    ext: ["lex"],
    cat: MODE_CATS.S,
  },

  lua: {
    name: "Lua",
    ext: ["lua"],
    cat: MODE_CATS.S,
  },

  markdown: {
    name: "Markdown",
    ext: ["md", "markdown"],
    cat: MODE_CATS.M,
  },

  mips: {
    name: "Mips Assembler",
    ext: ["s"],
    cat: MODE_CATS.P,
  },

  msdax: {
    name: "MSDax",
    ext: ["msdax", "dax"],
    cat: MODE_CATS.P,
  },

  mysql: {
    name: "MySQL",
    ext: ["mysql"],
    cat: MODE_CATS.Q,
  },

  "objective-c": {
    name: "Objective-C",
    ext: ["m", "mm"],
    cat: MODE_CATS.P,
  },

  pascal: {
    name: "Pascal",
    ext: ["pas", "p"],
    cat: MODE_CATS.P,
  },

  pascaligo: {
    name: "Pascal",
    ext: ["ligo", "mligo"],
    cat: MODE_CATS.S,
  },

  perl: {
    name: "Perl",
    ext: ["pl", "pm"],
    cat: MODE_CATS.S,
  },

  pgsql: {
    name: "PostgreSQL",
    ext: ["pgsql"],
    cat: MODE_CATS.Q,
  },

  php: {
    name: "PHP",
    ext: [
      "php",
      "inc",
      "phtml",
      "shtml",
      "php3",
      "php4",
      "php5",
      "phps",
      "phpt",
      "aw",
      "ctp",
      "module",
    ],
    cat: MODE_CATS.S,
  },

  postiats: {
    name: "ATS/Postiats",
    ext: ["dats", "sats", "hats"],
    cat: MODE_CATS.P,
  },

  plaintext: {
    name: "Text",
    ext: ["text", "txt", "readme", "log"],
    cat: MODE_CATS.O,
  },

  powerquery: {
    name: "Power Query",
    ext: ["pq", "pqm"],
    cat: MODE_CATS.Q,
  },

  powershell: {
    name: "PowerShell",
    ext: ["ps1", "psm1"],
    cat: MODE_CATS.S,
  },

  pug: {
    name: "Pug",
    ext: ["pug", "jade"],
    cat: MODE_CATS.M,
  },

  python: {
    name: "Python",
    ext: ["py"],
    cat: MODE_CATS.S,
  },

  r: {
    name: "R",
    ext: ["r"],
    cat: MODE_CATS.S,
  },

  razor: {
    name: "Razor",
    ext: ["cshtml", "vbhtml", "asp"],
    cat: MODE_CATS.S,
  },

  redis: {
    name: "Redis",
    ext: ["redis"],
    cat: MODE_CATS.S,
  },

  redshift: {
    name: "Red Shift",
    ext: ["redshift"],
    cat: MODE_CATS.S,
  },

  restructuredtext: {
    name: "reStructuredText",
    ext: ["rst", "rest", "restx"],
    cat: MODE_CATS.M,
  },

  ruby: {
    name: "Ruby",
    ext: [
      "rb",
      "rbx",
      "ru",
      "gemspec",
      "rake",
      "guardfile",
      "rakefile",
      "gemfile",
    ],
    cat: MODE_CATS.S,
  },

  rust: {
    name: "Rust",
    ext: ["rs"],
    cat: MODE_CATS.P,
  },

  sb: {
    name: "Small Basic",
    ext: ["sb"],
    cat: MODE_CATS.P,
  },

  scala: {
    name: "Scala",
    ext: ["scala", "sc", "sbt"],
    cat: MODE_CATS.P,
  },

  scheme: {
    name: "Scheme",
    ext: ["scm", "ss", "sm", "rkt", "oak", "scheme"],
    cat: MODE_CATS.P,
  },

  scss: {
    name: "SCSS",
    ext: ["scss"],
    cat: MODE_CATS.O,
  },

  shell: {
    name: "Shell",
    ext: ["sh", "bash", "bsh", "bashrc"],
    cat: MODE_CATS.S,
  },

  solidity: {
    name: "Solidity",
    ext: ["sol"],
    cat: MODE_CATS.S,
  },

  sophia: {
    name: "Sophia",
    ext: ["aes"],
    cat: MODE_CATS.S,
  },

  sql: {
    name: "SQL",
    ext: ["sql"],
    cat: MODE_CATS.Q,
  },

  st: {
    name: "StructuredText",
    ext: ["st", "iecst", "iecplc", "lc3lib"],
    cat: MODE_CATS.M,
  },

  swift: {
    name: "Swift",
    ext: ["swift"],
    cat: MODE_CATS.P,
  },

  systemverilog: {
    name: "System Verilog",
    ext: ["sv", "svh"],
    cat: MODE_CATS.O,
  },

  tcl: {
    name: "TCL",
    ext: ["tcl"],
    cat: MODE_CATS.S,
  },

  twig: {
    name: "Twig",
    ext: ["twig", "swig", "latte"],
    cat: MODE_CATS.M,
  },

  typescript: {
    name: "TypeScript",
    ext: ["ts", "typescript", "tsx"],
    cat: MODE_CATS.S,
  },

  vb: {
    name: "Visual Basic",
    ext: ["vb"],
    cat: MODE_CATS.S,
  },

  verilog: {
    name: "Verilog",
    ext: ["v", "vh"],
    cat: MODE_CATS.O,
  },

  xml: {
    name: "XML",
    ext: [
      "xml",
      "dtd",
      "ascx",
      "csproj",
      "config",
      "wxi",
      "wxl",
      "wxs",
      "xaml",
      "rss",
      "atom",
      "xhtml",
      "rdf",
      "wsdl",
      "xslt",
      "mathml",
      "mml",
      "xul",
      "xsl",
      "xbl",
      "xaml",
      "svg",
      "svgz",
    ],
    cat: MODE_CATS.M,
  },

  yaml: {
    name: "YAML",
    ext: ["yaml", "yml"],
    cat: MODE_CATS.M,
  },
};

export var CATS = [
  { name: MODE_CATS.P, langs: [] },
  { name: MODE_CATS.S, langs: [] },
  { name: MODE_CATS.M, langs: [] },
  { name: MODE_CATS.Q, langs: [] },
  { name: MODE_CATS.O, langs: [] },
];

export var EXTENSIONS = {};

for (var key in MODES) {
  var mode = MODES[key];
  var i = MODE_CAT_MAP[mode.cat];

  CATS[i].langs.push({ name: mode.name, mode: key });

  for (var j = 0; j < mode.ext.length; j++) {
    EXTENSIONS[mode.ext[j]] = key;
  }
}

function print_exts() {
  var exts = [];

  for (var ext in EXTENSIONS) {
    exts.push(ext);
  }

  console.log(JSON.stringify(exts));
}

function name_sort(a, b) {
  a = a.name.toLowerCase();
  b = b.name.toLowerCase();

  if (a < b) return -1;

  if (a > b) return 1;

  return 0;
}

for (var i in CATS) {
  CATS[i].langs.sort(name_sort);
}

export function sorted_modes() {
  var sorted = [];

  for (let mode in MODES) {
    sorted.push(Object.assign({}, MODES[mode], { mode }));
  }

  sorted.sort(name_sort);

  return sorted;
}
