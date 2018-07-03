var gulp        = require('gulp'),
    watch       = require('gulp-watch'),
    concat      = require('gulp-concat'),
    uglify      = require('gulp-uglify'),
    notify      = require('gulp-notify'),

    rename      = require('gulp-rename')
    require('gulp-help')(gulp, {
        description: 'Ayuda'
    });
gulp.task('compress', 'Concat and uglify all javascripts in app.min.js.', function() {
    gulp.src(['wazuh/appserver/static/js/controllers/**/*.js','wazuh/appserver/static/js/main.js','wazuh/appserver/static/js/app.js','wazuh/appserver/static/js/config.js'])
        .pipe(concat('app'))
        //.pipe(ngAnnotate())
        //.pipe(jshint())
        //.pipe(uglify())
        .on('error', notify.onError("Error: <%= error.message %>"))
        .pipe(rename({
            extname: ".min.js"
        }))
        .pipe(gulp.dest('wazuh/appserver/static/dist/'))
        //.pipe(notify('Uglified JavaScript (' + moment().format('MMM Do h:mm:ss A') + ')'))
        /*.pipe(liveReload({
            auto: false
        }));*/
});

gulp.task('stream', 'Listens for changes', function() {
    gulp.watch("wazuh/appserver/static/js/**/*.js",  ['compress']);
});

gulp.task('default', ['stream']);