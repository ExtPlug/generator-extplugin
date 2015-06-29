var gulp   = require('gulp')
<% if (babel) { %>var babel  = require('gulp-babel')<% } %>
var rjs    = require('requirejs')
var fs     = require('fs')
var mkdirp = require('mkdirp')
<% if (babel) { %>var del    = require('del')<% } %>
<% if (babel) { %>var runseq = require('run-sequence')<% } %>

var pluginPath = '<%= namespace %>/<%= name %>'

<% if (babel) { %>gulp.task('clean-lib', function (cb) {
  del('lib', cb)
})

gulp.task('babel', function () {
  return gulp.src('src/**/*')
    .pipe(babel({ modules: 'ignore' }))
    .pipe(gulp.dest('lib/'))
})<% } %>

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
  }

  paths[pluginPath] = '<%= babel ? 'lib' : 'src' %>/'

  rjs.optimize({
    baseUrl: './',
    name: pluginPath + '/main',
    paths: paths,
    optimize: 'none',
    out: function (text) {
      mkdirp('build', function (e) {
        if (e) done(e)
        else   fs.writeFile('build/<%= name %>.js', text, done)
      })
    }
  })
})

gulp.task('build', <% if (babel) { %>function () {
  return runseq('clean-lib', 'babel', 'rjs')
}<% } else { %>[ 'rjs' ]<% } %>)
