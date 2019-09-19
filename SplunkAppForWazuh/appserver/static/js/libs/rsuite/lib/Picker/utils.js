"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.createConcatChildrenFunction = createConcatChildrenFunction;
exports.getToggleWrapperClassName = getToggleWrapperClassName;
exports.onMenuKeyDown = onMenuKeyDown;

var _extends3 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _classnames = _interopRequireDefault(require("classnames"));

var _lodash = _interopRequireDefault(require("lodash"));

var _utils = require("rsuite-utils/lib/utils");

var _placementPolyfill = _interopRequireDefault(require("../utils/placementPolyfill"));

function createConcatChildrenFunction(node, nodeValue) {
  return function (data, children) {
    if (nodeValue) {
      node = (0, _utils.findNodeOfTree)(data, function (item) {
        return nodeValue === item.value;
      });
    }

    node.children = children;
    return data.concat([]);
  };
}

function getToggleWrapperClassName(name, prefix, props, hasValue, classes) {
  var _extends2;

  var className = props.className,
      placement = props.placement,
      appearance = props.appearance,
      cleanable = props.cleanable,
      block = props.block,
      disabled = props.disabled,
      countable = props.countable;
  return (0, _classnames.default)(className, prefix(name), prefix(appearance), prefix('toggle-wrapper'), (0, _extends3.default)((_extends2 = {}, _extends2[prefix("placement-" + _lodash.default.kebabCase((0, _placementPolyfill.default)(placement)))] = placement, _extends2[prefix('block')] = block, _extends2[prefix('has-value')] = hasValue, _extends2[prefix('disabled')] = disabled, _extends2[prefix('cleanable')] = hasValue && cleanable, _extends2[prefix('countable')] = countable, _extends2), classes));
}

function onMenuKeyDown(event, events) {
  var down = events.down,
      up = events.up,
      enter = events.enter,
      del = events.del,
      esc = events.esc;

  switch (event.keyCode) {
    // down
    case 40:
      down && down(event);
      event.preventDefault();
      break;
    // up

    case 38:
      up && up(event);
      event.preventDefault();
      break;
    // enter

    case 13:
      enter && enter(event);
      event.preventDefault();
      break;
    // delete

    case 8:
      del && del(event);
      break;
    // esc | tab

    case 27:
    case 9:
      esc && esc(event);
      event.preventDefault();
      break;

    default:
  }
}