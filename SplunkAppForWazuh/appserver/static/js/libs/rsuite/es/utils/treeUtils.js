import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import _ from 'lodash';
import { reactToString, shallowEqual, shallowEqualArray } from 'rsuite-utils/lib/utils';
var SEARCH_BAR_HEIGHT = 48;
var MENU_PADDING = 12;
/**
 * 判断当前节点是否应该显示
 * @param {*} expandItemValues
 * @param {*} parentKeys
 */

export function shouldShowNodeByExpanded(expandItemValues, parentKeys) {
  if (expandItemValues === void 0) {
    expandItemValues = [];
  }

  if (parentKeys === void 0) {
    parentKeys = [];
  }

  var intersectionKeys = _.intersection(expandItemValues, parentKeys);

  if (intersectionKeys.length === parentKeys.length) {
    return true;
  }

  return false;
}
/**
 * 拍平树结构为数组
 * @param {*} tree
 * @param {*} childrenKey
 * @param {*} executor
 */

export function flattenTree(tree, childrenKey, executor) {
  if (childrenKey === void 0) {
    childrenKey = 'children';
  }

  var flattenData = [];

  var traverse = function traverse(data, parent) {
    if (!_.isArray(data)) {
      return;
    }

    data.forEach(function (item, index) {
      var node = typeof executor === 'function' ? executor(item, index) : item;
      node.parent = parent;
      flattenData.push(_extends({}, node));

      if (item[childrenKey]) {
        traverse(item[childrenKey], item);
      }
    });
  };

  traverse(tree, null);
  return flattenData;
}
/**
 * 获取树节点所有的祖先节点
 * @param {*} node
 */

export function getNodeParents(node, parentKey, valueKey) {
  if (parentKey === void 0) {
    parentKey = 'parent';
  }

  var parents = [];

  var traverse = function traverse(node) {
    if (node && node[parentKey]) {
      traverse(node[parentKey]);

      if (valueKey) {
        parents.push(node[parentKey][valueKey]);
      } else {
        parents.push(node[parentKey]);
      }
    }
  };

  traverse(node);
  return parents;
}
/**
 * 判断当前节点是否显示
 * @param {*} label
 * @param {*} searchKeyword
 */

export function shouldDisplay(label, searchKeyword) {
  if (!_.trim(searchKeyword)) {
    return true;
  }

  var keyword = searchKeyword.toLocaleLowerCase();

  if (typeof label === 'string') {
    return label.toLocaleLowerCase().indexOf(keyword) >= 0;
  } else if (React.isValidElement(label)) {
    var nodes = reactToString(label);
    return nodes.join('').toLocaleLowerCase().indexOf(keyword) >= 0;
  }

  return false;
}
/**
 * 获取 VirtualList 的高度
 * @param {*} inline
 * @param {*} height
 */

export function getVirtualLisHeight(inline, height) {
  if (height === void 0) {
    height = 0;
  }

  return inline ? height - MENU_PADDING * 2 : height - SEARCH_BAR_HEIGHT - MENU_PADDING * 2;
}
/**
 * 判断节点是否存在可见的子节点。
 * @param node
 */

export function hasVisibleChildren(node, childrenKey) {
  if (!Array.isArray(node[childrenKey])) {
    return false;
  }

  return node[childrenKey].some(function (child) {
    return child.visible;
  });
}
/**
 * 废弃 prop warning
 * @param prop
 */

export function treeDeprecatedWarning(props, keys) {
  if (keys === void 0) {
    keys = [];
  }

  keys.forEach(function (key) {
    if (!_.isUndefined(props[key])) {
      console.warn("'Warning: " + key + " is deprecated and will be removed in a future release.'");
    }
  });
}
/**
 * 浅比较两个数组是否不一样
 * @param a
 * @param b
 */

export function compareArray(a, b) {
  return _.isArray(a) && _.isArray(b) && !shallowEqualArray(a, b);
}
/**
 * 获取 expandAll 的 value
 * @param props
 */

export function getExpandAll(props) {
  var expandAll = props.expandAll,
      defaultExpandAll = props.defaultExpandAll;
  return !_.isUndefined(expandAll) ? expandAll : defaultExpandAll;
}
/**
 * 获取 expandItemValues 的 value
 * @param props
 */

export function getExpandItemValues(props) {
  var expandItemValues = props.expandItemValues,
      defaultExpandItemValues = props.defaultExpandItemValues;

  if (!_.isUndefined(expandItemValues) && Array.isArray(expandItemValues)) {
    return expandItemValues;
  }

  if (!_.isUndefined(defaultExpandItemValues) && Array.isArray(defaultExpandItemValues)) {
    return defaultExpandItemValues;
  }

  return [];
}
/**
 * 获取节点展开状态
 * @param node
 * @param props
 */

export function getExpandState(node, props) {
  var valueKey = props.valueKey,
      childrenKey = props.childrenKey,
      expandItemValues = props.expandItemValues;
  var expandAll = getExpandAll(props);
  var expand = getExpandItemValues(props).some(function (value) {
    return shallowEqual(node[valueKey], value);
  });

  if (!_.isUndefined(expandItemValues)) {
    return expand;
  } else if (node[childrenKey] && node[childrenKey].length) {
    if (expand) {
      return !!node.expand;
    } else if (expandAll) {
      return true;
    }

    return false;
  }

  return false;
}