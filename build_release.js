#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

function getAllFiles (dirPath, arrayOfFiles) {
  var files = fs.readdirSync(dirPath);
  arrayOfFiles = arrayOfFiles || [];

  files.forEach(function(file) {
    if (fs.statSync(dirPath + "/" + file).isDirectory()) {
      arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles);
    } else {
      arrayOfFiles.push(path.join(dirPath, "/", file));
    }
  })

  return arrayOfFiles.filter(f => !f.endsWith('.map'));
}

function main () {
  var release = process.env.GITHUB_SHA || `${Date.now()}`;
  var files = getAllFiles('dist');

  var sw;
  var swi;
  files.forEach((f, i) => {
    if (f == 'dist/service-worker.js') {
      sw = f;
      swi = i;
    }
  });

  files.splice(swi, 1);
  files = files.map((f) => {
    return f.replace('dist/', '');
  });
  files.push('/');
  files.push('/editor');

  console.log('Release:', release);
  console.log('Total Files:', files.length);

  var cache_list = `${JSON.stringify(files)}`;
  var build_files = ['dist/index.html', sw];

  build_files.forEach((file) => {
    fs.readFile(file, 'utf8', function (err, data) {
      if (err) {
        console.error(err);
        process.exit(1);
      }

      data = data.replace(/{release}/, release);
      data = data.replace(/\["{core-files}"\]/, cache_list);
      fs.writeFile(file, data, 'utf8', function (err) {
        if (err) {
          console.log(err);
          process.exit(1);
        }

        console.log('Built:', file);
      });
    });
  });

  var rdata = `${JSON.stringify({release})}\n`;
  fs.writeFile('dist/release.json', rdata, 'utf8', function (err) {
    if (err) {
      console.log(err);
      process.exit(1);
    }

    console.log('Built:', 'dist/release.json');
  });
}

if (!module.parent) {
  main();
}
