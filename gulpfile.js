const gulp = require('gulp');
const browserSync = require('browser-sync');
const browserify = require('browserify');
const run = require('gulp-run');

gulp.task('default', ['browser-sync', 'watch']);

gulp.task('browser-sync', () => {
  browserSync.init({
    server: './',
    port: process.env.PORT || 5000
  });
});

gulp.task('reload', () => {
  browserSync.reload();
});

gulp.task('browserify', () =>
   browserify('./spec/inverted-index-test.js')
    .bundle()
    .pipe(source('test-spec.js'))
    .pipe(gulp.dest('./spec/tests'))
);

gulp.task('test', ['browserify'], () => {
  run('node_modules/karma/bin/karma start karma.conf.js --single-run').exec();
});