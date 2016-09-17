var gulp = require('gulp');
var concat = require('gulp-concat');
var minifyCss = require('gulp-minify-css');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var nodemon = require('gulp-nodemon');

var prodEnv = 'production';
var nodeIndex = 'app.js';
var frontendDir = 'public/';
var sassFile = frontendDir + 'sass/app.scss';
var bowerDir = frontendDir + 'bower_components/';
var cssBuildDir = frontendDir + 'build/css/';
var jsBuildDir = frontendDir + 'build/js/';
var cssLibBuildFile = 'lib.css';
var cssAppBuildFile = 'app.css';
var jsLibBuildFile = 'lib.js';
var jsAppBuildFile = 'app.js';

gulp.task('default', ['build']);
gulp.task('build', ['styles', 'js']);

// todo add browser reload
gulp.task('run-dev', ['watch-node', 'watch-js', 'watch-sass']);

gulp.task('styles', ['styles-lib', 'styles-app']);
gulp.task('js', ['js-lib', 'js-app']);

/**
 * Build library styles
 */
gulp.task('styles-lib', function () {
    var files = [
        bowerDir + 'font-awesome/css/font-awesome.css',
        bowerDir + 'font-awesome/css/font-awesome.css',
        bowerDir + 'normalize-css/normalize.css'
    ];
    return gulp.src(files, { 'base': bowerDir })
        .pipe(concat(cssLibBuildFile))
        .pipe(minifyCss())
        .pipe(gulp.dest(cssBuildDir));
});

/**
 * Build app styles
 */
gulp.task('styles-app', function () {
    var files = [
        sassFile // all user styles and skelton grid system (which includes normalise)
    ];
    return gulp.src(files)
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(concat(cssAppBuildFile))
        .pipe(gulp.dest(cssBuildDir));
});

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
        frontendDir + 'app.js',
        frontendDir + 'controllers/*.js',
        frontendDir + 'directives/*.js',
        frontendDir + 'filters/*.js',
        frontendDir + 'models/*.js',
        frontendDir + 'modules/*/*.js',
        frontendDir + 'modules/**/*.js',
        frontendDir + 'services/*.js',
        frontendDir + 'utilities/*.js'
    ];

    if (process.env.NODE_ENV === prodEnv) {
        return gulp.src(files, { 'base': frontendDir })
            .pipe(uglify({ mangle: false }))
            .pipe(concat(jsAppBuildFile))
            .pipe(gulp.dest(jsBuildDir));
    } else {
        return gulp.src(files, { 'base': frontendDir })
            .pipe(sourcemaps.init())
            .pipe(uglify({ mangle: false }))
            .pipe(concat(jsAppBuildFile))
            .pipe(sourcemaps.write('./'))
            .pipe(gulp.dest(jsBuildDir));
    }
});

/**
 * Auto restart node
 *
 * IF ANY OTHER JAVASCRIPT DIRECTORIES ARE ADDED TO THE BASE, WHICH AREN'T HANDLED BY NODE, THEN ADD TO IGNORE LIST
 */
gulp.task('watch-node', function () {
    var nodeArgs = [];
    if (process.env.DEBUGGER) {
        nodeArgs.push('--debug');
    }
    return nodemon({
        script: nodeIndex,
        ext: 'js',
        ignore: [
            'gulpfile.js', // don't add ./
            'gulp/**/*', // ignore if have abstracted gulp files into separate directory
            frontendDir + '**/*', // ignore frontend files
            'node_modules/**/*', // ignore libraries
            'test/**/*'
        ],
        nodeArgs: nodeArgs
    }).on('restart', function (files) {
        console.log('Change:', files);
    });
});

/**
 * Watch frontend javascript files
 */
gulp.task('watch-js', function () {
    var files = [
        frontendDir + '**/*.js',
        '!' + bowerDir + '**',
        '!' + frontendDir + 'build/**',
        '!' + frontendDir + 'test/**'
    ];
    var watcher = gulp.watch(files, ['js-app']); // only run build of project files
    watcher.on('change', function (event) {
        console.log(event.type + ': ' + event.path);
        console.log('Running js task');
    });
    return watcher;
});

/**
 * Watch Sass
 */
gulp.task('watch-sass', function () {
    var filesToWatch = [
        frontendDir + 'sass/**/*.scss',
        '!' + frontendDir + 'build/**',
        '!' + bowerDir + '**'
    ];
    var watcher = gulp.watch(filesToWatch, ['styles-app']); // only run build of project files
    watcher.on('change', function (event) {
        console.log(event.type + ': ' + event.path);
        console.log('Running sass task');
    });
    return watcher;
});