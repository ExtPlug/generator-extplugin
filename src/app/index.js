import { Base } from 'yeoman-generator';
import sortKeys from 'sort-keys';
import { camelize, slugify, titleize } from 'underscore.string';

module.exports = Base.extend({
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
      {
        type: 'input',
        name: 'license',
        message: 'License',
        default: 'MIT',
      },
    ]).then(answers => {
      this.data = answers;
      this.data.classname = camelize(this.data.pluginname);
      this.data.name = slugify(this.data.pluginname);
    });
  },

  writing() {
    this.fs.copyTpl(
      this.templatePath('README.md'),
      this.destinationPath('README.md'),
      this.data
    );
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
  },

  install() {
    this.npmInstall();
  },
});
