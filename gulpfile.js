'use strict';

var gulp = require('gulp');
var karma = require('gulp-karma');

gulp.task('test', function () {
  gulp.src('./test/**/*')
    .pipe(karma({
      configFile: './karma.conf.js',
      action: 'run'
    }));
});
