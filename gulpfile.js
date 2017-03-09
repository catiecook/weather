const gulp = require('gulp')
// const jshint = require('gulp-jshint');
const eslint = require('gulp-eslint');


gulp.task('lint', () => {
  return gulp.src(['./src/*.js', '!node_modules/**'])
  .pipe(eslint())
  .pipe(eslint.format())
  .pipe(eslint.failAfterError());
});

gulp.task('default', ['lint'], function() {

});
