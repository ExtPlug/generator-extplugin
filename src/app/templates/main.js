define(function (require, exports, module) {

  var Plugin = require('extplug/Plugin');

  var <%= classname %> = Plugin.extend({
    name: '<%= pluginname %>',
    description: '<%= description %>',

    enable: function () {
      // code to start your plugin
    },

    disable: function () {
      // code to undo what you did in enable()
    }
  });

  module.exports = <%= classname %>;

});
