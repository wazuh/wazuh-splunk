const gulp = require('gulp')
const watch = require('gulp-watch')
var exec = require('child_process').exec;

require('gulp-help')(gulp, {
  description: 'Ayuda'
});

gulp.task('copyChangedFiles', 'Copy to dist folder only changed files', function (cb) {
  exec('rsync -avh SplunkAppForWazuh/ dist/', function (err, stdout, stderr) {
    console.log(stdout);
    console.error(stderr);
    exec('npm run build', function (err, stdout, stderr) {
      console.log(stdout);
      console.error(stderr);
      return cb(err);
    })
  })
});

gulp.task('stream', 'Listen to changes', function () {
  gulp.watch("SplunkAppForWazuh/**/**", ['copyChangedFiles']);
});

gulp.task('default', ['stream']);