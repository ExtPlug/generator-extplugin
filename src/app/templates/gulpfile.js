var gulp   = require('gulp');
var rjs    = require('requirejs');
var fs     = require('fs');
var mkdirp = require('mkdirp');

var pluginPath = '<%= namespace %>/<%= name %>';

gulp.task('rjs', function (done) {
  // these paths are defined at runtime, so the r.js optimizer can't find them
  var paths = {
    // plug files, define()d by plug-modules
    plug: 'empty:',
    // extplug defines
    extplug: 'empty:',
    // plug.dj language files
    lang: 'empty:',
    // libraries used by plug.dj
    backbone: 'empty:',
    jquery: 'empty:',
    underscore: 'empty:',
    // libraries used by extplug
    meld: 'empty:',
    'plug-modules': 'empty:'
  };

  paths[pluginPath] = 'src/';

  rjs.optimize({
    baseUrl: './',
    name: pluginPath + '/main',
    paths: paths,
    optimize: 'none',
    out: function (text) {
      mkdirp('build', function (e) {
        if (e) done(e);
        else   fs.writeFile('build/<%= name %>.js', text, done);
      });
    }
  });
});

gulp.task('build', [ 'rjs' ]);
