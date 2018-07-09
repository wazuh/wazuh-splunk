'use strict';

define(['../module'], function (service) {
  'use strict';

  service.service('$appState', function ($scope) {
    return {
      getClusterInfo: function getClusterInfo() {
        return $cookies.getObject('_clusterInfo');
      },
      removeClusterInfo: function removeClusterInfo() {
        return $cookies.remove('_clusterInfo');
      },
      setClusterInfo: function setClusterInfo(cluster_info) {
        var exp = new Date();
        exp.setDate(exp.getDate() + 365);
        if (cluster_info) {
          $cookies.putObject('_clusterInfo', cluster_info, { 'expires': exp });
        }
      },
      getCurrentPattern: function getCurrentPattern() {
        return $cookies.getObject('_currentPattern');
      },
      setCreatedAt: function setCreatedAt(date) {
        var exp = new Date();
        exp.setDate(exp.getDate() + 365);
        $cookies.putObject('_createdAt', date, { 'expires': exp });
      },
      setCurrentPattern: function setCurrentPattern(newPattern) {
        var exp = new Date();
        exp.setDate(exp.getDate() + 365);
        if (newPattern) {
          $cookies.putObject('_currentPattern', newPattern, { 'expires': exp });
        }
      },
      removeCurrentPattern: function removeCurrentPattern() {
        return $cookies.remove('_currentPattern');
      },
      getCreatedAt: function getCreatedAt() {
        return $cookies.getObject('_createdAt');
      },
      removeCreatedAt: function removeCreatedAt() {
        return $cookies.remove('_createdAt');
      },
      getCurrentAPI: function getCurrentAPI() {
        return $cookies.getObject('API');
      },
      removeCurrentAPI: function removeCurrentAPI() {
        return $cookies.remove('API');
      },
      setCurrentAPI: function setCurrentAPI(API) {
        var exp = new Date();
        exp.setDate(exp.getDate() + 365);
        if (API) {
          $cookies.putObject('API', API, { 'expires': exp });
        }
      },
      setUserCode: function setUserCode(code) {
        $cookies.putObject('userCode', code);
      },
      getUserCode: function getUserCode() {
        return $cookies.getObject('userCode');
      },
      removeUserCode: function removeUserCode() {
        return $cookies.remove('userCode');
      },
      getPatternSelector: function getPatternSelector() {
        return $cookies.getObject('patternSelector');
      },
      setPatternSelector: function setPatternSelector(value) {
        $cookies.putObject('patternSelector', value);
      },
      removePatternSelector: function removePatternSelector() {
        return $cookies.remove('patternSelector');
      },
      setCurrentDevTools: function setCurrentDevTools(current) {
        $window.localStorage.setItem('currentDevTools', current);
      },
      getCurrentDevTools: function getCurrentDevTools() {
        return $window.localStorage.getItem('currentDevTools');
      }
    };
  });
});