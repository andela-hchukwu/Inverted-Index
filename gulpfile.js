const gulp = require('gulp');
const browserSync = require('browser-sync');
const connect = require('gulp-connect');

gulp.task('app', ['serve', 'test']);

gulp.task('serve', () => {
  const browser1 = browserSync.create();
  browser1.init({
    server: {
      baseDir: './'
    },
    port: 5050,
    ui: {
      port: 9000
    }
  });
  gulp.watch(['*src/html', 'src/js/**/*.js', 'src/css/*.css'])
  .on('change', browser1.reload);
});

gulp.task('serveprod', () => {
  connect.server({
    root: './',
    port: process.env.PORT || 5000 // localhost:5000
  });
});
