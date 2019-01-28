define([
  'require',
  'dependency'
], function (require, factory) {
  'use strict';

  function updateMacro(name, value) {
    var appscope = {}
    appscope['owner'] = "admin"; //Splunk.util.getConfigValue("USERNAME");
    appscope['app'] = "SplunkAppForWazuh";
    appscope['sharing'] = "app";
    var mystanza = []
    mystanza['definition'] = value
    mystanza['iseval'] = 0
    var svc = splunkjs.mvc.createService();
    var files = svc.configurations(appscope);
    var fileDeferred = $.Deferred();
    files.fetch({ 'search': 'name=macros"' }, function (err, files) {
      var macrosFile = files.item("macros");
      if (!macrosFile) {
        //  Create the file here
        macrosFile = files.create('macros', function (err, macrosFile) {
          if (err) {
            // Error case, throw an exception dialog to user here.
            // console.log("Caught an error in transforms", err, macrosFile)
            failureCallback()
            return false;
          }
          fileDeferred.resolve(macrosFile);
        });
      } else {
        fileDeferred.resolve(macrosFile)
      }
    });
    fileDeferred.done(function (macrosFile) {
      macrosFile.post(name, mystanza, function (err, stanza) {
        if (err) {
          console.log("Caught an error in stanza", err, stanza)
          //failureCallback()
          //return false;
        } else {
          console.log("Caught a success", err)
          //successCallback();
          return true;
        }
      })
    });
  }
});