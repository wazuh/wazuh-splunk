import _ from 'lodash';

export default function findNodeOfTree(data, check) {

  const findNode = (nodes = []) => {

    for (let i = 0; i < nodes.length; i += 1) {
      let item = nodes[i];
      if (_.isArray(item.children)) {
        const node = findNode(item.children);
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
