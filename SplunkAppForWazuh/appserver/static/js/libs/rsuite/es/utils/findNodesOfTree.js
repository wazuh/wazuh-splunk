import _ from 'lodash';
export default function findNodesOfTree(data, check) {
  var nextNodes = [];

  var findNodes = function findNodes(nodes) {
    if (nodes === void 0) {
      nodes = [];
    }

    for (var i = 0; i < nodes.length; i += 1) {
      if (_.isArray(nodes[i].children)) {
        findNodes(nodes[i].children);
      }

      if (check(nodes[i])) {
        nextNodes.push(nodes[i]);
      }
    }
  };

  findNodes(data);
  return nextNodes;
}