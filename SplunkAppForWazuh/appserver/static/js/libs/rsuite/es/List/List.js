import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _regeneratorRuntime from "@babel/runtime/regenerator";
import _asyncToGenerator from "@babel/runtime/helpers/esm/asyncToGenerator";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _inheritsLoose from "@babel/runtime/helpers/esm/inheritsLoose";
import * as React from 'react';
import PropTypes from 'prop-types';
import setStatic from 'recompose/setStatic';
import classNames from 'classnames';
import _ from 'lodash';
import { setDisplayName } from 'recompose';
import { on } from 'dom-lib';
import { setInlineStyles, setTranslate3d, setTransitionDuration, closest, getPosition, getEdgeOffset, getScrollingParent } from './utils';
import { prefix, defaultProps, getUnhandledProps, createContext } from '../utils';
import ListItem from './ListItem';
import Manager from './Manager';
import AutoScroller from './AutoScroller';
var NodeType = {
  Canvas: 'CANVAS',
  Anchor: 'A',
  Button: 'BUTTON',
  Input: 'INPUT',
  Option: 'OPTION',
  Textarea: 'TEXTAREA',
  Select: 'SELECT'
};
var interactiveElements = [NodeType.Anchor, NodeType.Button, NodeType.Input, NodeType.Option, NodeType.Textarea, NodeType.Select];
export var ListContext = createContext({
  bordered: false,
  size: 'md',
  manager: null
});

var List =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(List, _React$Component);

  function List() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;
    _this.state = {
      sorting: false,
      manager: new Manager()
    };
    _this.containerRef = React.createRef();
    _this.containerBoundingRect = void 0;
    _this.touched = void 0;
    _this.scrollContainer = void 0;
    _this.scrollContainerInitialScroll = void 0;
    _this.autoScroller = void 0;
    _this.windowInitialScroll = void 0;
    _this.animatedNodeOffset = [];
    _this.activeNodeBoundingClientRect = void 0;
    _this.activeNodeGhost = void 0;
    _this.activeNodeFlowBodyTranslate = void 0;
    _this.activeNodeFlowBody = void 0;
    _this.activeNodeOffsetEdge = void 0;
    _this.activeNodeMarginOffset = void 0;
    _this.activeNodeOldIndex = void 0;
    _this.activeNodeNextIndex = void 0;
    _this.activeNodeTranslateMin = void 0;
    _this.activeNodeTranslateMax = void 0;
    _this.windowStartListener = void 0;
    _this.windowEndListener = void 0;
    _this.sortMouseMoveListener = void 0;
    _this.sortMouseEndListener = void 0;
    _this.cursorInitialOffset = void 0;
    _this.cursorCurrentPosition = void 0;
    _this.pressTimer = void 0;

    _this.handleStart = function (event) {
      var _this$props = _this.props,
          sortable = _this$props.sortable,
          pressDelay = _this$props.pressDelay;
      var _this$state = _this.state,
          sorting = _this$state.sorting,
          manager = _this$state.manager;
      var node = closest(event.target, function (el) {
        return !!manager.getNodeManagerRef(el);
      });
      var curManager = manager.getNodeManagerRef(node);

      if (!(event && event.target && node instanceof HTMLElement && curManager)) {
        return;
      }

      var _curManager$info = curManager.info,
          disabled = _curManager$info.disabled,
          curNodeManager = _curManager$info.manager;

      if ( //is sortable
      sortable && //is list item
      !disabled && //is not secondary button pressed
      event.button !== 2 && //is this list
      curNodeManager === manager && //is not sorting
      !sorting && //excludes interactive elements
      !node.contains(closest(event.target, function (el) {
        return interactiveElements.includes(el.tagName) || el.contentEditable === 'true';
      }))) {
        event.preventDefault();
        _this.touched = true;
        _this.cursorCurrentPosition = getPosition(event);
        manager.setActive(curManager);
        _this.pressTimer = setTimeout(function () {
          return _this.handlePress(event);
        }, pressDelay);
      }
    };

    _this.handleEnd = function () {
      var _this$state2 = _this.state,
          sorting = _this$state2.sorting,
          manager = _this$state2.manager;
      _this.touched = false;

      if (!sorting) {
        clearTimeout(_this.pressTimer);
        manager.setActive(null);
      }
    };

    _this.handlePress =
    /*#__PURE__*/
    function () {
      var _ref = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee(event) {
        var _this$props2, classPrefix, onSortStart, manager, _manager$getActive, activeNode, info, index, collection, addItemPrefix, style, activeNodeMargin;

        return _regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _this$props2 = _this.props, classPrefix = _this$props2.classPrefix, onSortStart = _this$props2.onSortStart;
                manager = _this.state.manager;
                _manager$getActive = manager.getActive(), activeNode = _manager$getActive.node, info = _manager$getActive.info; // return if no active node

                if (!(!activeNode || !info)) {
                  _context.next = 5;
                  break;
                }

                return _context.abrupt("return");

              case 5:
                index = info.index, collection = info.collection;
                addItemPrefix = prefix(classPrefix + '-item');
                style = window.getComputedStyle(activeNode);
                activeNodeMargin = {
                  bottom: parseFloat(style.marginBottom),
                  left: parseFloat(style.marginLeft),
                  right: parseFloat(style.marginRight),
                  top: parseFloat(style.marginTop)
                };
                _this.activeNodeMarginOffset = {
                  x: activeNodeMargin.left + activeNodeMargin.right,
                  y: Math.max(activeNodeMargin.top, activeNodeMargin.bottom)
                };
                _this.activeNodeBoundingClientRect = activeNode.getBoundingClientRect();
                _this.containerBoundingRect = _this.scrollContainer.getBoundingClientRect();
                _this.activeNodeOldIndex = index;
                _this.activeNodeNextIndex = index;
                _this.activeNodeOffsetEdge = getEdgeOffset(activeNode, _this.containerRef.current);
                _this.cursorInitialOffset = getPosition(event);
                _this.scrollContainerInitialScroll = {
                  left: _this.scrollContainer.scrollLeft,
                  top: _this.scrollContainer.scrollTop
                };
                _this.windowInitialScroll = {
                  left: window.pageXOffset,
                  top: window.pageYOffset
                };
                _this.activeNodeFlowBody = document.body.appendChild(activeNode.cloneNode(true));
                _this.activeNodeFlowBody && _this.activeNodeFlowBody.classList.add(addItemPrefix('helper'));
                setInlineStyles(_this.activeNodeFlowBody, {
                  position: 'fixed',
                  width: _this.activeNodeBoundingClientRect.width + "px",
                  height: _this.activeNodeBoundingClientRect.height + "px",
                  left: _this.activeNodeBoundingClientRect.left - activeNodeMargin.left + "px",
                  top: _this.activeNodeBoundingClientRect.top - activeNodeMargin.top + "px"
                });
                _this.activeNodeGhost = activeNode;
                activeNode.classList.add(addItemPrefix('holder'));
                _this.activeNodeTranslateMin = {};
                _this.activeNodeTranslateMax = {};
                _this.activeNodeTranslateMin.y = _this.containerBoundingRect.top - _this.activeNodeBoundingClientRect.top - _this.activeNodeBoundingClientRect.height / 2;
                _this.activeNodeTranslateMax.y = _this.containerBoundingRect.top + _this.containerBoundingRect.height - _this.activeNodeBoundingClientRect.top - _this.activeNodeBoundingClientRect.height / 2;
                _this.sortMouseMoveListener = on(window, 'mousemove', _this.handleSortMove, {
                  passive: false
                });
                _this.sortMouseEndListener = on(window, 'mouseup', _this.handleSortEnd, {
                  passive: false
                });

                _this.setState({
                  sorting: true
                });

                if (onSortStart) {
                  onSortStart({
                    collection: collection,
                    node: activeNode,
                    oldIndex: _this.activeNodeOldIndex,
                    newIndex: _this.activeNodeNextIndex
                  }, event);
                }

              case 31:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }();

    _this.handleSortMove = function (event) {
      var onSortMove = _this.props.onSortMove;
      var manager = _this.state.manager; // Update helper position

      var offset = getPosition(event);
      var translate = {
        x: _.get(offset, 'x', 0) - _this.cursorInitialOffset.x,
        y: _.get(offset, 'y', 0) - _this.cursorInitialOffset.y
      }; // Adjust for window scroll

      translate.y -= window.pageYOffset - (_this.windowInitialScroll.top || 0);
      translate.x -= window.pageXOffset - (_this.windowInitialScroll.left || 0);
      _this.activeNodeFlowBodyTranslate = translate;
      setTranslate3d(_this.activeNodeFlowBody, translate);

      _this.animateNodes();

      _this.autoScroll();

      if (onSortMove) {
        onSortMove({
          collection: manager.getActive().info.collection,
          node: manager.getActive().node,
          oldIndex: _this.activeNodeOldIndex,
          newIndex: _this.activeNodeNextIndex
        }, event);
      }
    };

    _this.handleSortEnd = function (event) {
      var _this$props3 = _this.props,
          onSortEnd = _this$props3.onSortEnd,
          onSort = _this$props3.onSort,
          classPrefix = _this$props3.classPrefix,
          transitionDuration = _this$props3.transitionDuration;
      var manager = _this.state.manager;
      var activeManagerRef = manager.getActive();
      var activeCollection = activeManagerRef ? activeManagerRef.info.collection : 0;
      var managerRefs = manager.getOrderedRefs(activeCollection);
      var addItemPrefix = prefix(classPrefix + '-item'); // Remove the event listeners

      _this.sortMouseMoveListener.off();

      _this.sortMouseEndListener.off();

      setTranslate3d(_this.activeNodeFlowBody, _this.holderTranslate);
      setTransitionDuration(_this.activeNodeFlowBody, transitionDuration); // wait for animation

      setTimeout(function () {
        // Remove the helper from the DOM
        if (_this.activeNodeFlowBody) {
          _this.activeNodeFlowBody.parentNode && _this.activeNodeFlowBody.parentNode.removeChild(_this.activeNodeFlowBody);
          _this.activeNodeFlowBody = null;
        }

        if (_this.activeNodeGhost) {
          _this.activeNodeGhost.classList.remove(addItemPrefix('holder'));

          setTranslate3d(_this.activeNodeGhost, null);
          _this.animatedNodeOffset = [];
        }

        for (var i = 0, len = managerRefs.length; i < len; i++) {
          var managerRef = managerRefs[i];
          var el = managerRef.node; // Clear the cached offsetTop / offsetLeft value

          managerRef.edgeOffset = null; // Remove the transforms / transitions

          setTranslate3d(el, null);
          setTransitionDuration(el, null);
        } // Stop autoScroll


        _this.autoScroller.clear(); // Update manager state


        manager.setActive(null);

        _this.setState({
          sorting: false
        });

        if (typeof onSortEnd === 'function') {
          onSortEnd({
            collection: activeCollection,
            node: activeManagerRef.node,
            newIndex: _this.activeNodeNextIndex,
            oldIndex: _this.activeNodeOldIndex
          }, event);
        }

        if (typeof onSort === 'function') {
          onSort({
            collection: activeCollection,
            node: activeManagerRef.node,
            newIndex: _this.activeNodeNextIndex,
            oldIndex: _this.activeNodeOldIndex
          }, event);
        }
      }, transitionDuration);
    };

    _this.autoScroll = function () {
      return _this.props.autoScroll && _this.autoScroller.update({
        width: _this.activeNodeBoundingClientRect.width,
        height: _this.activeNodeBoundingClientRect.height,
        translate: _this.activeNodeFlowBodyTranslate,
        maxTranslate: _this.activeNodeTranslateMax,
        minTranslate: _this.activeNodeTranslateMin
      });
    };

    return _this;
  }

  var _proto = List.prototype;

  // Timer ID
  _proto.componentDidMount = function componentDidMount() {
    var _this2 = this;

    if (this.containerRef.current instanceof HTMLElement) {
      this.scrollContainer = getScrollingParent(this.containerRef.current) || this.containerRef.current;
      this.autoScroller = new AutoScroller(this.scrollContainer, function (offset) {
        _this2.activeNodeFlowBodyTranslate.x += offset.left;
        _this2.activeNodeFlowBodyTranslate.y += offset.top;

        _this2.animateNodes();
      });
      this.windowStartListener = on(this.containerRef.current, 'mousedown', this.handleStart, {
        passive: false
      });
      this.windowEndListener = on(this.containerRef.current, 'mouseup', this.handleEnd, {
        passive: false
      });
    }
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    this.windowStartListener && this.windowStartListener.off();
    this.windowEndListener && this.windowEndListener.off();
  };

  _proto.animateNodes = function animateNodes() {
    var transitionDuration = this.props.transitionDuration;
    var manager = this.state.manager;
    var listItemManagerRefs = manager.getOrderedRefs();
    var sortingOffset = {
      left: this.activeNodeOffsetEdge.left + this.activeNodeFlowBodyTranslate.x + this.containerScrollDelta.left,
      top: this.activeNodeOffsetEdge.top + this.activeNodeFlowBodyTranslate.y + this.containerScrollDelta.top
    };
    this.activeNodeNextIndex = -1;

    for (var i = 0, len = listItemManagerRefs.length; i < len; i++) {
      var _listItemManagerRefs$ = listItemManagerRefs[i],
          node = _listItemManagerRefs$.node,
          index = _listItemManagerRefs$.info.index,
          edgeOffset = _listItemManagerRefs$.edgeOffset;
      var width = node.offsetWidth;
      var height = node.offsetHeight;
      var offset = {
        height: this.activeNodeBoundingClientRect.height > height ? height / 2 : this.activeNodeBoundingClientRect.height / 2,
        width: this.activeNodeBoundingClientRect.width > width ? width / 2 : this.activeNodeBoundingClientRect.width / 2
      };
      var translate = {
        x: 0,
        y: 0
      }; // If we haven't cached the node's offsetTop / offsetLeft value

      var curEdgeOffset = edgeOffset || getEdgeOffset(node, this.containerRef.current);
      listItemManagerRefs[i].edgeOffset = curEdgeOffset; // Get a reference to the next and previous node

      var nextNode = i < len - 1 && listItemManagerRefs[i + 1]; // Also cache the next node's edge offset if needed.
      // We need this for calculating the animation in a grid setup

      if (nextNode && !nextNode.edgeOffset) {
        nextNode.edgeOffset = getEdgeOffset(nextNode.node, this.containerRef.current);
      } // If the node is the one we're currently animating, skip it


      if (index === this.activeNodeOldIndex) {
        continue;
      }

      setTransitionDuration(node, transitionDuration);
      var offsetY = this.activeNodeBoundingClientRect.height + this.activeNodeMarginOffset.y;
      var distanceTop = sortingOffset.top + this.windowScrollDelta.top || 0;

      if (index > this.activeNodeOldIndex && distanceTop + offset.height >= (curEdgeOffset.top || 0)) {
        translate.y = -offsetY;
        this.activeNodeNextIndex = index;
      } else if (index < this.activeNodeOldIndex && distanceTop <= curEdgeOffset.top + offset.height) {
        translate.y = offsetY;

        if (this.activeNodeNextIndex === -1) {
          this.activeNodeNextIndex = index;
        }
      }

      setTranslate3d(node, translate); // translate holder

      this.animatedNodeOffset[index] = translate;
      setTranslate3d(this.activeNodeGhost, this.holderTranslate);
    }

    if (this.activeNodeNextIndex === -1) {
      this.activeNodeNextIndex = this.activeNodeOldIndex;
    }
  };

  _proto.render = function render() {
    var _classNames;

    var _this$props4 = this.props,
        className = _this$props4.className,
        classPrefix = _this$props4.classPrefix,
        bordered = _this$props4.bordered,
        hover = _this$props4.hover,
        size = _this$props4.size,
        sortable = _this$props4.sortable,
        children = _this$props4.children,
        rest = _objectWithoutPropertiesLoose(_this$props4, ["className", "classPrefix", "bordered", "hover", "size", "sortable", "children"]);

    var _this$state3 = this.state,
        sorting = _this$state3.sorting,
        manager = _this$state3.manager;
    var addPrefix = prefix(classPrefix);
    var unhandled = getUnhandledProps(List, rest);
    var classes = classNames(classPrefix, className, (_classNames = {}, _classNames[addPrefix('bordered')] = bordered, _classNames[addPrefix('sortable')] = sortable, _classNames[addPrefix('sorting')] = sorting, _classNames[addPrefix('hover')] = hover, _classNames));
    var contextValue = {
      bordered: bordered,
      size: size,
      manager: manager
    };
    return React.createElement(ListContext.Provider, {
      value: contextValue
    }, React.createElement("div", _extends({
      ref: this.containerRef,
      className: classes
    }, unhandled), children));
  };

  _createClass(List, [{
    key: "containerScrollDelta",
    get: function get() {
      return {
        left: this.scrollContainer.scrollLeft - (this.scrollContainerInitialScroll.left || 0),
        top: this.scrollContainer.scrollTop - (this.scrollContainerInitialScroll.top || 0)
      };
    }
  }, {
    key: "windowScrollDelta",
    get: function get() {
      return {
        left: window.pageXOffset - (this.windowInitialScroll.left || 0),
        top: window.pageYOffset - (this.windowInitialScroll.top || 0)
      };
    }
  }, {
    key: "holderTranslate",
    get: function get() {
      var _this3 = this;

      var manager = this.state.manager;
      var translateX = 0;
      var translateY = 0;
      this.animatedNodeOffset.forEach(function (_ref2, index) {
        var x = _ref2.x,
            y = _ref2.y;
        var nodeItems = manager.getOrderedRefs();
        var nodeItem = nodeItems.find(function (nodeInfo) {
          return nodeInfo.info.index === index;
        });

        var node = _.get(nodeItem, 'node');

        if (!nodeItem || !node) {
          return;
        }

        var style = window.getComputedStyle(node);
        var margin = {
          bottom: parseFloat(style.marginBottom),
          left: parseFloat(style.marginLeft),
          right: parseFloat(style.marginRight),
          top: parseFloat(style.marginTop)
        };
        var marginOffset = {
          x: margin.left + margin.right,
          y: Math.max(margin.top, margin.bottom)
        };

        if (!nodeItem.edgeOffset) {
          nodeItem.edgeOffset = getEdgeOffset(node, _this3.containerRef.current);
        }

        var offsetX = node.offsetWidth + marginOffset.x;
        var offsetY = node.offsetHeight + marginOffset.y;

        if (x) {
          translateX += +x / Math.abs(+x) * offsetX;
        }

        if (y) {
          translateY += +y / Math.abs(+y) * offsetY;
        }
      });
      return {
        x: (this.scrollContainerInitialScroll.left || 0) - this.scrollContainer.scrollLeft - translateX,
        y: (this.scrollContainerInitialScroll.top || 0) - this.scrollContainer.scrollTop - translateY
      };
    }
  }]);

  return List;
}(React.Component);

List.propTypes = {
  className: PropTypes.string,
  classPrefix: PropTypes.string,
  bordered: PropTypes.bool,
  hover: PropTypes.bool,
  sortable: PropTypes.bool,
  size: PropTypes.oneOf(['lg', 'md', 'sm']),
  autoScroll: PropTypes.bool,
  pressDelay: PropTypes.number,
  transitionDuration: PropTypes.number,
  onSortStart: PropTypes.func,
  onSortMove: PropTypes.func,
  onSortEnd: PropTypes.func,
  onSort: PropTypes.func
};
List.defaultProps = {
  size: 'md',
  autoScroll: true,
  pressDelay: 500,
  transitionDuration: 300
};
var EnhancedList = defaultProps({
  classPrefix: 'list'
})(List);
setStatic('Item', ListItem)(EnhancedList);
export default setDisplayName('List')(EnhancedList);