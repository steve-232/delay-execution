const {
  src, dest, parallel, watch,
} = require('gulp');
const uglify = require('gulp-uglify');
const babel = require('gulp-babel');
const rename = require('gulp-rename');
const webserver = require('gulp-webserver');

const env = process.env.NODE_ENV;
const isProduction = env === 'production';

function js() {
  return src('src/*.js')
    .pipe(babel({
      presets: ['@babel/env'],
      plugins: ['@babel/plugin-proposal-class-properties'],
    }))
    .pipe(rename({ suffix: isProduction ? '.min' : '' }))
    .pipe(uglify({
      output: { beautify: !isProduction },
      compress: isProduction,
      mangle: isProduction,
    }))
    .pipe(dest('./'));
}

function server() {
  return src('./')
    .pipe(webserver({
      open: true,
      livereload: true,
    }));
}

function watchFiles() {
  js();
  watch('src/*.js', js);
}

if (!isProduction) server();

exports.server = server;
exports.js = js;
exports.default = !isProduction ? watchFiles : parallel(js);
