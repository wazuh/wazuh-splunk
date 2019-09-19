'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _clone2 = require('lodash/clone');

var _clone3 = _interopRequireDefault(_clone2);

var _isArray2 = require('lodash/isArray');

var _isArray3 = _interopRequireDefault(_isArray2);

exports.default = filterNodesOfTree;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function filterNodesOfTree(data, check) {
  var findNodes = function findNodes() {
    var nodes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

    var nextNodes = [];
    for (var i = 0; i < nodes.length; i += 1) {
      if ((0, _isArray3.default)(nodes[i].children)) {
        var nextChildren = findNodes(nodes[i].children);
        if (nextChildren.length) {
          var item = (0, _clone3.default)(nodes[i]);
          item.children = nextChildren;
          nextNodes.push(item);
          continue;
        }
      }

      if (check(nodes[i])) {
        nextNodes.push(nodes[i]);
      }
    }

    return nextNodes;
  };

  return findNodes(data);
}