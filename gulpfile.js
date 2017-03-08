/*eslint-disable */

const gulp = require('gulp');
const browserSync = require('browser-sync');
const run = require('gulp-run');

gulp.task('default', ['browser-sync', 'watch']);

<<<<<<< HEAD
gulp.task('serve', () => {
  const browser1 = browserSync.create();
  browser1.init({
    server: {
      baseDir: './src'
    },
    port: 5050,
    ui: {
      port: 9000
    }
  });
  gulp.watch(['*src/html', 'src/js/**/**/*.js', 'src/css/*.css'])
  .on('change', browser1.reload);
});

=======
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
  run('jasmine spec/inverted-index-test.js').exec();
});

>>>>>>> a95b423b74514d6bd7ba3f029a0db985f8def43f
