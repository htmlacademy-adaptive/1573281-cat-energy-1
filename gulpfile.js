import gulp from 'gulp';
import plumber from 'gulp-plumber';
import sass from 'gulp-dart-sass';
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import browser from 'browser-sync';

// Пакеты, установленные мной
import csso from 'postcss-csso'; // минифицирует css файл
import rename from 'gulp-rename'; // переименовывает минифицированный css файл (name.min.css)
import htmlmin from 'gulp-htmlmin'; // минифицирует html
import terser from 'gulp-terser'; // минифицирует js
import squoosh from 'gulp-libsquoosh'; // обрабатывает растровые картинки таке, может конвертировать в webp
import svgo from 'gulp-svgo'; // оптимизирует svg картинки
import del from 'del' // пакет, занимающийся удалением файлов


// Styles

export const styles = () => {
  return gulp.src('source/sass/style.scss', { sourcemaps: true })
    .pipe(plumber())
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([
      autoprefixer(),
      csso()
    ]))
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest('build/css', { sourcemaps: '.' }))
    .pipe(browser.stream());
}

// HTML
const html = () => {
  return gulp.src('source/*.html')
  .pipe(htmlmin({ collapseWhitespace: true }))
  .pipe(gulp.dest('build/'))
}

// Scripts

const js = () => {
  return gulp.src('source/js/script.js')
  .pipe(terser())
  .pipe(gulp.dest('build/js/'))
}

// Images

const optimizeImages = () => {
  return gulp.src('source/img/**/*.{jpg,png}')
  .pipe(squoosh())
  .pipe(gulp.dest('build/img/'))
}

const copyImages = () => {
  return gulp.src('source/img/**/*.{jpg,png}')
  .pipe(gulp.dest('build/img/'))
}

// WebP

const createwebp = () => {
  return gulp.src('source/img/**/*.{jpg,png}')
  .pipe(squoosh({
    webp: {}
  }))
  .pipe(gulp.dest('build/img/'))
}

// SVG

const svg = () => {
  return gulp.src('source/img/*.svg')
  .pipe(svgo())
  .pipe(gulp.dest('build/img/'))
}


// Copy

const copy = (done) => {
  gulp.src(['source/fonts/**/*.{woff2,woff}', 'source/*.ico', 'source/*.webmanifest'], {base: 'source'})
  .pipe(gulp.dest('build/'))
  done();

}

// Clean

const clean = () => {
  return del('build');
}

// Server

const server = (done) => {
  browser.init({
    server: {
      baseDir: 'build'
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
}

// Reload

const reload = (done) => {
  browser.reload();
  done();
}

// Watcher

const watcher = () => {
  gulp.watch('source/sass/**/*.scss', gulp.series(styles));
  gulp.watch('source/js/script.js', gulp.series(js));
  gulp.watch('source/*.html', gulp.series(html, reload));
}

// Build

export const build = gulp.series (
  clean,
  copy,
  optimizeImages,
  gulp.parallel (
    styles,
    html,
    js,
    svg,
    createwebp
  ),
);

// Default

export default gulp.series(
  clean,
  copy,
  copyImages,
  gulp.parallel (
    styles,
    html,
    js,
    svg,
    createwebp
  ),
  gulp.series(
    server,
    watcher
  )
);
