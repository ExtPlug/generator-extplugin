import { Base } from 'yeoman-generator';
import { camelize, slugify, titleize } from 'underscore.string';

module.exports = Base.extend({
  initializing() {
    this.composeWith('license', {}, {
      local: require.resolve('generator-license'),
    });
  },
  prompting() {
    return this.prompt([
      {
        type: 'input',
        name: 'pluginname',
        message: 'Plugin Name',
        default: titleize(this.appname),
      },
      {
        type: 'input',
        name: 'description',
        message: 'One-line plugin description',
      },
    ]).then(answers => {
      this.data = answers;
      this.data.classname = camelize(this.data.pluginname);
      this.data.name = slugify(this.data.pluginname);

      this.log('The following questions relate to which license you want to use.');
    });
  },

  writing() {
    this.fs.copyTpl(
      this.templatePath('src/main.js'),
      this.destinationPath('src/main.js'),
      this.data
    );
    this.fs.copyTpl(
      this.templatePath('_package.json'),
      this.destinationPath('package.json'),
      this.data
    );

    this.composeWith('extplugin:readme', {
      options: this.data,
    }, {
      local: require.resolve('../readme'),
    });
  },

  install() {
    this.npmInstall();
  },
});
