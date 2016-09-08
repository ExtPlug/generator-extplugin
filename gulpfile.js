const gulp = require('gulp');
const gulpif = require('gulp-if');
const babel = require('gulp-babel');

const isJavaScript = file =>
  /\.js$/.test(file.path) && !/templates/.test(file.path);

gulp.task('default', () =>
  gulp.src('src/**/*')
    .pipe(gulpif(isJavaScript, babel()))
    .pipe(gulp.dest('generators/'))
);
