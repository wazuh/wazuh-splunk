(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(factory);
  } else if (typeof exports === "object") {
    exports = factory();
  } else {
    root.moduleResolver = factory();
  }
})(this, function () {
  'use strict'

  function resolvePath (nodePath, state) {
    if (!state.types.isStringLiteral(nodePath)) {
      return;
    }
  
    const sourcePath = nodePath.node.value;
    const currentFile = state.file.opts.sourceFileName;
  
    const modulePath = state.opts.resolvePath(sourcePath, currentFile, state.opts);
    if (modulePath) {
      if (nodePath.node.pathResolved) {
        return;
      }
  
      nodePath.replaceWith(state.types.stringLiteral(modulePath));
      nodePath.node.pathResolved = true;
    }
  }
  
  function isImportCall (types, calleePath) {
    return types.isImport(calleePath.node.callee);
  }
  
  function transformCall (nodePath, state) {
    if (state.moduleResolverVisited[nodePath]) {
      return;
    }
  
    if (isImportCall(state.types, nodePath)) {
      state.moduleResolverVisited[nodePath] = true;
      resolvePath(nodePath.get('arguments.0'), state);
    }
  }
  
  function transformImport (nodePath, state) {
    if (state.moduleResolverVisited[nodePath]) {
      return;
    }
    state.moduleResolverVisited[nodePath] = true;
  
    resolvePath(nodePath.get('source'), state);
  }
  
  const importVisitors = {
    CallExpression: transformCall,
    'ImportDeclaration|ExportDeclaration': transformImport
  };
  
  const visitor = {
    Program: {
      enter: function (programPath, state) {
        programPath.traverse(importVisitors, state);
      },
      exit: function (programPath, state) {
        programPath.traverse(importVisitors, state);
      }
    }
  };

  function moduleResolver (args) {
    var types = args.types;
    return {
      name: 'module-resolver',

      pre: function () {
        this.types = types;
        this.moduleResolverVisited = {};
      },
  
      visitor,

      post: function () {
        this.moduleResolverVisited = null;
      }
    }
  }

  return moduleResolver;
});
