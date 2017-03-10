/*eslint-disable */
const gulp = require('gulp');
const browserSync = require('browser-sync');
const run = require('gulp-run');

gulp.task('default', ['browser-sync', 'watch']);

gulp.task('browser-sync', () => {
  browserSync.init({
    server: './src',
    port: process.env.PORT || 5000
  });
});

gulp.task('reload', () => {
  browserSync.reload();
});

gulp.task('watch', () => {
  gulp.watch('src/js/**/*.js', ['reload']);
  gulp.watch('src/css/*.css', ['reload']);
  gulp.watch('src/*.html', ['reload']);
  gulp.watch('src/*.js', ['reload']);
});

gulp.task('test', () => {
  run('jasmine').exec();
});

