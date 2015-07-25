const { Base } = require('yeoman-generator')
const sortKeys = require('sort-keys')

module.exports = Base.extend({

  prompting() {
    let done = this.async()
    this.prompt([
      { type: 'input'
      , name: 'namespace'
      , message: 'Your project namespace (eg. Github username)'
      , store: true }
    , { type: 'input'
      , name: 'pluginname'
      , message: 'Plugin Name'
      , default: this._.titleize(this.appname) }
    , { type: 'input'
      , name: 'description'
      , message: 'One-line plugin description' }
    , { type: 'confirm'
      , name: 'babel'
      , message: 'Use ES-of-the-future (Babel)'
      , default: true }
    , { type: 'input'
      , name: 'license'
      , message: 'License'
      , default: 'MIT' }
    ], answers => {
      this.data = answers
      this.data.classname = this._.camelize(this.data.pluginname)
      this.data.name = this._.slugify(this.data.pluginname)
      done()
    })
  },

  writing() {
    this.template('Gulpfile.js', 'Gulpfile.js', this.data)
    this.template('README.md', 'README.md', this.data)

    this.write('package.json', JSON.stringify(this._package(), null, 2))

    this.template(this.data.babel ? 'main-babel.js' : 'main.js'
                 , 'src/main.js'
                 , this.data)
  },

  _package() {
    let pack = {}
    pack.name = `extplug-${this.data.name}`
    pack.version = '0.0.0'
    pack.license = this.data.license
    pack.description = this.data.description
    pack.keywords = [ 'extplug-plugin' ]
    let deps = { gulp: '^3.8.11'
               , mkdirp: '^0.5.1'
               , requirejs: '^2.1.18' }
    if (this.data.babel) {
      deps['gulp-babel'] = '^5.1.0'
      deps['del'] = '^1.2.0'
      deps['run-sequence'] = '^1.1.1'
    }
    // keys sorted alphabetically
    pack.devDependencies = sortKeys(deps)
    pack.scripts = {
      build: 'gulp build'
    }
    return pack
  }

})
