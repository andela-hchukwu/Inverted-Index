const gulp = require('gulp');
const browserSync = require('browser-sync');

gulp.task('browserSync', () => {
  browserSync.init({
    server: {
      baseDir: 'src'
    }
  });
});


gulp.task('watch', ['browserSync'], () => {
  gulp.watch('src/*.js', browserSync.reload);
});
