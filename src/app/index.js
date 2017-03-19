import Generator from 'yeoman-generator';
import { camelize, slugify, titleize } from 'underscore.string';

class PluginGenerator extends Generator {
  constructor(args, opts) {
    super(args, opts);

    this.composeWith(require.resolve('generator-license'), {});
  }

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
  }

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

    this.composeWith(require.resolve('../readme'), this.data);
  }

  install() {
    this.npmInstall();
  }
}

module.exports = PluginGenerator
