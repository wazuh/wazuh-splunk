import _ from 'lodash';

export default function filterNodesOfTree(data, check) {
  const findNodes = (nodes = []) => {
    const nextNodes = [];
    for (let i = 0; i < nodes.length; i += 1) {
      if (_.isArray(nodes[i].children)) {
        const nextChildren = findNodes(nodes[i].children);
        if (nextChildren.length) {
          let item = _.clone(nodes[i]);
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
