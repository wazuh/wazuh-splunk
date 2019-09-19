'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _isArray2 = require('lodash/isArray');

var _isArray3 = _interopRequireDefault(_isArray2);

exports.default = findNodeOfTree;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function findNodeOfTree(data, check) {

  var findNode = function findNode() {
    var nodes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];


    for (var i = 0; i < nodes.length; i += 1) {
      var item = nodes[i];
      if ((0, _isArray3.default)(item.children)) {
        var node = findNode(item.children);
        if (node) {
          return node;
        }
      }

      if (check(item)) {
        return item;
      }
    }

    return undefined;
  };

  return findNode(data);
}