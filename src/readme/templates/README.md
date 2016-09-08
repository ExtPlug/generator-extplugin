<%= pluginname %>
<%= pluginname.replace(/./g, '=') %>

<%= description %>

## Installation

If you do not have ExtPlug yet, get it [here][ExtPlug].

You can install this plugin by going to your ExtPlug settings menu, pressing
"Install Plugin", and entering this Plugin URL:

```
[YOUR HOST URL HERE]
```

## Building

**Note: this section is intended for developers only.**

This plugin uses the [ExtPlug CLI]. To build, run:

```
npm install
npm run build
```

The built plugin will be saved at `build/<%= name %>.js`.

## License

[<%= license %>]

[ExtPlug]: https://extplug.github.io/
[ExtPlug CLI]: https://github.com/extplug/extplug-cli#readme
[<%= license %>]: ./LICENSE
