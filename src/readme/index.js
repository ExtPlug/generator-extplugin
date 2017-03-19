import Generator from 'yeoman-generator';
import { camelize, slugify, titleize } from 'underscore.string';

class ReadmeGenerator extends Generator {
  constructor(args, opts) {
    super(args, opts);

    this.option('pluginname', {
      type: String,
      required: true,
    });
    this.option('name', {
      type: String,
      required: false,
      defaults: null,
    });
    this.option('description', {
      type: String,
      required: false,
      defaults: '',
    });
    this.option('license', {
      type: String,
      required: false,
      defaults: 'LICENSE'
    });
  }

  writing() {
    const pkg = this.fs.readJSON(this.destinationPath('package.json'), {});
    if (pkg.license) {
      this.options.license = pkg.license;
    }
    this.fs.copyTpl(
      this.templatePath('README.md'),
      this.destinationPath('README.md'),
      this.options
    );
  }

  install() {
    this.npmInstall();
  }
}

module.exports = ReadmeGenerator
