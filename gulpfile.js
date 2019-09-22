const { parallel, watch, src, dest } = require("gulp");
const uglify = require("gulp-uglify");
const sass = require("gulp-sass");
sass.compiler = require("node-sass");
const htmlmin = require("gulp-htmlmin");
const imagemin = require("gulp-imagemin");

const buildFolder = "www";

function styles(cb) {
  src("src/scss/*.scss")
    .pipe(sass.sync({ outputStyle: "compressed" }).on("error", sass.logError))
    .pipe(dest("src/styles"))
    .pipe(dest(`${buildFolder}/styles`));
  cb();
}

function html(cb) {
  src("src/*.html")
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(dest(`${buildFolder}/`));
  cb();
}

function images(cb) {
  src("src/images/*")
    .pipe(imagemin())
    .pipe(dest(`${buildFolder}/images`));
  cb();
}

function scripts(cb) {
  src("src/scripts/*").pipe(dest(`${buildFolder}/scripts`));
  cb();
}

function otherFiles(cb) {
  src("src/assets/*/*")
    .pipe(imagemin())
    .pipe(dest(`${buildFolder}/assets`));
  cb();
}

const build = parallel(styles, html, images, otherFiles);

const build_watch = function() {
  watch("src/scss/*.scss", build);
  watch("src/*.html", build);
  watch("src/scripts/*", build);
  watch("src/images/*", build);
  watch("src/assets/**", build);
};

exports.watch = build_watch;
exports.build = build;
exports.default = build;
