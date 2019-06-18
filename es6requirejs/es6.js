define([
//>>excludeStart('excludeBabel', pragmas.excludeBabel)
  'babel', 'babel-plugin-module-resolver', 'module'
//>>excludeEnd('excludeBabel')
], function(
//>>excludeStart('excludeBabel', pragmas.excludeBabel)
  babel, moduleResolver, module
//>>excludeEnd('excludeBabel')
) {
//>>excludeStart('excludeBabel', pragmas.excludeBabel)
  var buildMap = {};
  var fetchText;

  if (typeof window !== 'undefined' && window.navigator && window.document) {
    fetchText = function (url, callback) {
      var xhr = new XMLHttpRequest();
      xhr.open('GET', url, true);
      xhr.onreadystatechange = function () {
        // Do not explicitly handle errors, those should be
        // visible via console output in the browser.
        if (xhr.readyState === 4) {
          callback(xhr.responseText);
        }
      };
      xhr.send(null);
    };
  } else if (typeof process !== 'undefined' && process.versions
             && process.versions.node) {
    // Using special require.nodeRequire, something added by r.js.
    var fs = require.nodeRequire('fs');
    fetchText = function (path, callback) {
      callback(fs.readFileSync(path, 'utf8'));
    };
  }

  babel.registerPlugin('module-resolver', moduleResolver);

  function resolvePath (sourcePath) {
    if (sourcePath.indexOf('!') < 0) {
      return 'es6!' + sourcePath;
    }
  }
  var excludedOptions = ['extraPlugins', 'resolveModuleSource', 'fileExtension'];
  var pluginOptions = module.config();
  var fileExtension = pluginOptions.fileExtension || '.js';
  var defaultOptions = {
    plugins: (pluginOptions.extraPlugins || []).concat([
      'transform-modules-amd',
      [
        'module-resolver',
        {
          resolvePath: pluginOptions.resolveModuleSource || resolvePath
        }
      ]
    ])
  };
  for (var key in pluginOptions) {
    if (pluginOptions.hasOwnProperty(key) && excludedOptions.indexOf(key) < 0) {
      defaultOptions[key] = pluginOptions[key];
    }
  }

//>>excludeEnd('excludeBabel')
  return {
//>>excludeStart('excludeBabel', pragmas.excludeBabel)
    load: function (name, req, onload, config) {
      var sourceFileName = name + fileExtension;
      var url = req.toUrl(sourceFileName);

      if (url.indexOf('empty:') === 0) {
        return onload();
      }

      var options = {};
      for (var key in defaultOptions) {
        options[key] = defaultOptions[key];
      }
      options.sourceFileName = sourceFileName;
      options.sourceMap = config.isBuild ? false : 'inline';

      fetchText(url, function (text) {
        var code;
        try {
          code = babel.transform(text, options).code;
        } catch (error) {
          return onload.error(error);
        }

        if (config.isBuild) {
          buildMap[name] = code;
        }

        onload.fromText(code); 
      });
    },

    write: function (pluginName, moduleName, write) {
      if (moduleName in buildMap) {
        write.asModule(pluginName + '!' + moduleName, buildMap[moduleName]);
      }
    }
//>>excludeEnd('excludeBabel')
  };
});
