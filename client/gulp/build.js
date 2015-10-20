'use strict';

var gulp           = require('gulp');
var gutil          = require('gulp-util');
var envify         = require('envify');
var buffer         = require('vinyl-buffer');
var assign         = require('lodash.assign');
var source         = require('vinyl-source-stream');
var watchify       = require('watchify');
var reactify       = require('reactify');
var sourcemaps     = require('gulp-sourcemaps');
var browserify     = require('browserify');
var browserSync    = require('browser-sync');
var browserSyncSpa = require('browser-sync-spa');

var browser    = 'default';
var pathApp    = __dirname.concat('/../src/Main.js');
var pathBundle = __dirname.concat('/../assets/js');
var customOpts = {
  entries: [pathApp],
  debug: true
};

var opts = assign({}, watchify.args, customOpts);
var b    = watchify(browserify(opts));

b.transform(reactify);
b.transform(envify);

function bundle() {
  return b.bundle()
    .on('error', gutil.log.bind(gutil, 'Browserify Error'))
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(pathBundle));
}

browserSync.instance = false;

b.on('update', bundle);
b.on('log', gutil.log);
b.on('bundle', function(e) {
  e.on('end', function() {
    gutil.log(gutil.colors.green('Arquivo js/bundle.js compilado com sucesso!'));

    if (browserSync.instance) {
      browserSync.reload();
      return;
    }

    var server = {
      baseDir: __dirname.concat('/..')
    };

    browserSync.instance = browserSync.init({
      startPath: '/',
      server: server,
      browser: browser
    });
  });
});

browserSync.use(browserSyncSpa({
  selector: '[react-app]'
}));

gulp.task('build', bundle);
