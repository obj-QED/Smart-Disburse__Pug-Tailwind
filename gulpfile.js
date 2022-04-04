let project_folder = "dist";
let source_folder = "#src";

let path = {
  build: {
    html: project_folder + "/",
    css: project_folder + "/SMART-Disburse/css/",
    js: project_folder + "/SMART-Disburse/js/",
    img: project_folder + "/SMART-Disburse/img/",
    fonts: project_folder + "/SMART-Disburse/fonts/",
  },
  src: {
    html: [source_folder + "/views/**/*.pug", "!" + source_folder + "/views/_*.pug", "!" + source_folder + "/views/**/#**/*.pug"],
    css: source_folder + "/stylus/*.styl",
    js: source_folder + "/js/*.js",
    img: source_folder + "/img/**/*.+(png|jpg|gif|ico|svg|webp)",
    fonts: source_folder + "/fonts/*.ttf",
  },
  watch: {
    html: source_folder + "/**/**/*.pug",
    css: source_folder + "/stylus/**/*.styl",
    js: source_folder + "/js/*.js",
    img: source_folder + "/img/**/*.+(png|jpg|gif|ico|svg|webp) ",
  },
  clean: "./" + project_folder + "/",
};

let { src, dest } = require("gulp"),
  gulp = require("gulp");
browsersync = require("browser-sync").create();
fileinclude = require("gulp-file-include");
del = require("del");
stylus = require("gulp-stylus");
auto_prefixer = require("gulp-autoprefixer");
clean_css = require("gulp-clean-css");
rename_file = require("gulp-rename");
uglify = require("gulp-uglify-es").default;
imagemin = require("gulp-imagemin");
webp = require("gulp-webp");
webphtml = require("gulp-webp-html");
webpcss = require("gulp-webpcss");
pug = require("gulp-pug");
tailwindcss = require("tailwindcss");
tw_forms = require("@tailwindcss/forms");
const postcss = require("gulp-postcss");

function browserSync(params) {
  browsersync.init({
    server: {
      baseDir: "./" + project_folder + "/",
    },
    port: 3000,
    notify: false,
  });
}

function html() {
  return src(path.src.html)
    .pipe(fileinclude())
    // .pipe(webphtml()) // *: working with html
    .pipe(
      pug({
        doctype: "html",
        pretty: true,
      })
    )
    .pipe(dest(path.build.html))
    .pipe(browsersync.stream());
}

function images() {
  return src(path.src.img)
    .pipe(
      webp({
        quality: 70,
      })
    )
    .pipe(dest(path.build.img))
    .pipe(src(path.src.img))
    .pipe(
      imagemin({
        progressive: true,
        svgoPlugins: [
          {
            removeViewBox: false,
          },
        ],
        interlaced: true,
        optimizationLevel: 3, // 0 to 7
      })
    )
    .pipe(dest(path.build.img))
    .pipe(browsersync.stream());
}

function css() {
  return src(path.src.css)
    .pipe(
      stylus({
        // Сжатие css в dist
        compress: false,
      })
    )
    .pipe(webpcss())
    .pipe(postcss([tailwindcss("./tailwind.config.js"), require("autoprefixer")]))
    .pipe(dest(path.build.css))
    .pipe(clean_css())
    .pipe(
      rename_file({
        extname: ".min.css",
      })
    )
    .pipe(dest(path.build.css))
    .pipe(browsersync.stream());
}
function js() {
  return src(path.src.js)
    .pipe(fileinclude())
    .pipe(dest(path.build.js))
    .pipe(uglify())
    .pipe(
      rename_file({
        extname: ".min.js",
      })
    )
    .pipe(dest(path.build.js))
    .pipe(browsersync.stream());
}

function clean(params) {
  return del(path.clean);
}
gulp.task("svgSprite", function () {
  return gulp
    .src([source_folder + "/icons/*.svg"])
    .pipe(
      svgSprite({
        mode: {
          stack: {
            sprite: "../icons/icon.svg", //Название файла для спрайтов
            example: true,
          },
        },
      })
    )
    .pipe(dest(path.build.img));
});

function watchFiles(params) {
  gulp.watch([path.watch.html], html);
  gulp.watch([path.watch.css], css);
  gulp.watch([path.watch.js], js);
  gulp.watch([path.watch.img], images);
}

let build = gulp.series(clean, gulp.parallel(html, css, js, images));
let watch = gulp.parallel(build, watchFiles, browserSync);

exports.html = html;
exports.js = js;
exports.css = css;
exports.images = images;

exports.build = build;
exports.watch = watch;
exports.default = watch;
