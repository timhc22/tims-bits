var gulp = require('gulp');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');

var prodEnv = 'production';
var baseDir = 'public/';
var bowerDir = baseDir + 'bower_components/';
var jsBuildDir = baseDir + 'build/js/';
var jsLibBuildFile = 'lib.js';
var jsAppBuildFile = 'app.js';

gulp.task('default', ['build']);
gulp.task('build', ['js']);
gulp.task('js', ['js-lib', 'js-app']);

/**
 * Build the libraries
 */
gulp.task('js-lib', function () {
    // todo can this be done dynamically using 'main' from the library's bower.json
    var files = [
        bowerDir + 'jquery/dist/jquery.js',
        bowerDir + 'angular/angular.js',
        bowerDir + 'lodash/lodash.js'
    ];

    if (process.env.NODE_ENV === prodEnv) {
        return gulp.src(files, { 'base': bowerDir })
            .pipe(uglify({ mangle: false }))
            .pipe(concat(jsLibBuildFile))
            .pipe(gulp.dest(jsBuildDir));
    } else {
        return gulp.src(files, { 'base': bowerDir })
            .pipe(sourcemaps.init())
            .pipe(uglify({ mangle: false }))
            .pipe(concat(jsLibBuildFile))
            .pipe(sourcemaps.write('./'))
            .pipe(gulp.dest(jsBuildDir));
    }
});

/**
 * Build the app
 */
gulp.task('js-app', function () {
    var files = [
        baseDir + 'app.js',
        baseDir + 'controllers/*.js',
        baseDir + 'directives/*.js',
        baseDir + 'filters/*.js',
        baseDir + 'models/*.js',
        baseDir + 'modules/*/*.js',
        baseDir + 'modules/**/*.js',
        baseDir + 'services/*.js',
        baseDir + 'utilities/*.js'
    ];

    if (process.env.NODE_ENV === prodEnv) {
        return gulp.src(files, { 'base': baseDir })
            .pipe(uglify({ mangle: false }))
            .pipe(concat(jsAppBuildFile))
            .pipe(gulp.dest(jsBuildDir));
    } else {
        return gulp.src(files, { 'base': baseDir })
            .pipe(sourcemaps.init())
            .pipe(uglify({ mangle: false }))
            .pipe(concat(jsAppBuildFile))
            .pipe(sourcemaps.write('./'))
            .pipe(gulp.dest(jsBuildDir));
    }
});