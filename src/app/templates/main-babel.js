import Plugin from 'extplug/Plugin';

const <%= classname %> = Plugin.extend({
  name: '<%= pluginname %>',
  description: '<%= description %>',

  enable() {
    // code to start your plugin
  },

  disable() {
    // code to undo what you did in enable()
  }
});

export default <%= classname %>;
