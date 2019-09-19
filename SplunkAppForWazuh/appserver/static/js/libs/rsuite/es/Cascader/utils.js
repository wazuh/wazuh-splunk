import _extends from "@babel/runtime/helpers/esm/extends";
import { shallowEqual } from 'rsuite-utils/lib/utils';
import stringToObject from '../utils/stringToObject';
export function getDerivedStateForCascade(nextProps, prevState, selectNodeValue, newChildren) {
  var data = nextProps.data,
      labelKey = nextProps.labelKey,
      valueKey = nextProps.valueKey,
      childrenKey = nextProps.childrenKey,
      value = nextProps.value;
  var activeItemValue = selectNodeValue || (typeof value === 'undefined' ? prevState.value : value);
  var nextItems = [];
  var nextPathItems = [];

  var findNode = function findNode(items) {
    var _loop = function _loop(i) {
      items[i] = stringToObject(items[i], labelKey, valueKey);
      var children = items[i][childrenKey];

      if (shallowEqual(items[i][valueKey], activeItemValue)) {
        return {
          v: {
            items: items,
            active: items[i]
          }
        };
      } else if (children) {
        var v = findNode(children);

        if (v) {
          nextItems.push(children.map(function (item) {
            return _extends({}, stringToObject(item, labelKey, valueKey), {
              parent: items[i]
            });
          }));
          nextPathItems.push(v.active);
          return {
            v: {
              items: items,
              active: items[i]
            }
          };
        }
      }
    };

    for (var i = 0; i < items.length; i += 1) {
      var _ret = _loop(i);

      if (typeof _ret === "object") return _ret.v;
    }

    return null;
  };

  var activeItem = findNode(data);
  nextItems.push(data);

  if (activeItem) {
    nextPathItems.push(activeItem.active);
  }
  /**
   * 如果是异步更新 data 后，获取到的一个 selectNodeValue，则不更新 activePaths
   * 但是需要更新 items， 因为这里的目的就是把异步更新后的的数据展示出来
   */


  var cascadePathItems = nextPathItems.reverse();

  if (newChildren) {
    return {
      items: [].concat(nextItems.reverse(), [newChildren]),
      tempActivePaths: cascadePathItems
    };
  }

  return {
    items: nextItems.reverse(),
    tempActivePaths: null,
    activePaths: cascadePathItems
  };
}