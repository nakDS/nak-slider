const gulp = require("gulp");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const postcssPresetEnv = require("postcss-preset-env");
const cssImport = require("postcss-import");
const cssnano = require("cssnano");
const notify = require("gulp-notify");
const rename = require("gulp-rename");
const fileinclude = require('gulp-file-include');

function css() {
  return gulp
    .src("./src/style.css")
    .pipe(postcss([cssImport(), postcssPresetEnv(), autoprefixer()]))
    .pipe(gulp.dest("./docs/css/"))
    .pipe(postcss([cssnano()]))
    .pipe(rename({ suffix: ".min" }))
    .pipe(gulp.dest("./docs/css/"))
    .pipe(
      notify({
        message: "Your CSS is ready ♡"
      })
    );
}

function docs() {
  return gulp
  .src("./docs/src/index.html")
  .pipe(
    fileinclude({
      prefix: '@@',
      basepath: '@file'
    }))
  .pipe(gulp.dest('./docs/'));
};

// function watch() {
//   gulp.watch("./src/css/**/*.css", css);
// }

function watch() {
  gulp.watch("./docs/src/**/*.html", docs);
}



const build = gulp.series(css, docs, watch);

exports.css = css;
exports.docs = docs;
exports.watch = watch;
exports.default = build;
