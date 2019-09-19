'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _maxBy = require('lodash/maxBy');

var _maxBy2 = _interopRequireDefault(_maxBy);

var _minBy = require('lodash/minBy');

var _minBy2 = _interopRequireDefault(_minBy);

var _kebabCase = require('lodash/kebabCase');

var _kebabCase2 = _interopRequireDefault(_kebabCase);

var _domLib = require('dom-lib');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AutoPlacement = {
  left: 'Start',
  right: 'End',
  top: 'Start',
  bottom: 'End'
};

function getContainerDimensions(containerNode) {
  var width = void 0;
  var height = void 0;
  var scrollX = void 0;
  var scrollY = void 0;
  if (containerNode.tagName === 'BODY') {
    width = window.innerWidth;
    height = window.innerHeight;
    scrollY = (0, _domLib.scrollTop)((0, _domLib.ownerDocument)(containerNode).documentElement) || (0, _domLib.scrollTop)(containerNode);
    scrollX = (0, _domLib.scrollLeft)((0, _domLib.ownerDocument)(containerNode).documentElement) || (0, _domLib.scrollLeft)(containerNode);
  } else {
    var _getOffset = (0, _domLib.getOffset)(containerNode);

    width = _getOffset.width;
    height = _getOffset.height;

    scrollY = (0, _domLib.scrollTop)(containerNode);
    scrollX = (0, _domLib.scrollLeft)(containerNode);
  }
  return { width: width, height: height, scrollX: scrollX, scrollY: scrollY };
}

function getTopDelta(top, overlayHeight, container, padding) {
  var containerDimensions = getContainerDimensions(container);
  var containerHeight = containerDimensions.height,
      scrollY = containerDimensions.scrollY;


  var topEdgeOffset = top - padding - scrollY;
  var bottomEdgeOffset = top + padding + overlayHeight - scrollY;

  if (topEdgeOffset < 0) {
    return -topEdgeOffset;
  } else if (bottomEdgeOffset > containerHeight) {
    return containerHeight - bottomEdgeOffset;
  }

  return 0;
}

function getLeftDelta(left, overlayWidth, container, padding) {
  var containerDimensions = getContainerDimensions(container);
  var scrollX = containerDimensions.scrollX,
      containerWidth = containerDimensions.width;


  var leftEdgeOffset = left - padding - scrollX;
  var rightEdgeOffset = left + padding + overlayWidth - scrollX;

  if (leftEdgeOffset < 0) {
    return -leftEdgeOffset;
  } else if (rightEdgeOffset > containerWidth) {
    return containerWidth - rightEdgeOffset;
  }

  return 0;
}

function getPositionTop(container, overlayHeight, top) {
  var _getContainerDimensio = getContainerDimensions(container),
      scrollY = _getContainerDimensio.scrollY,
      containerHeight = _getContainerDimensio.height;

  // 判断 overlay 底部是否溢出，设置 top


  if (overlayHeight + top > containerHeight + scrollY) {
    return containerHeight - overlayHeight + scrollY;
  }

  // top 的最小值不能少于纵向滚动条 y 的值
  return Math.max(scrollY, top);
}

function getPositionLeft(container, overlayWidth, left) {
  var _getContainerDimensio2 = getContainerDimensions(container),
      scrollX = _getContainerDimensio2.scrollX,
      containerWidth = _getContainerDimensio2.width;

  if (overlayWidth + left > containerWidth + scrollX) {
    return containerWidth - overlayWidth + scrollX;
  }

  // left 的最小值不能少于横向滚动条 x 的值
  return Math.max(scrollX, left);
}

var utils = {
  getPosition: function getPosition(target, container) {
    var offset = container.tagName === 'BODY' ? (0, _domLib.getOffset)(target) : (0, _domLib.getPosition)(target, container);
    return offset;
  },
  calcAutoPlacement: function calcAutoPlacement(placement, targetOffset, container, overlay) {
    var _getContainerDimensio3 = getContainerDimensions(container),
        width = _getContainerDimensio3.width,
        height = _getContainerDimensio3.height,
        scrollX = _getContainerDimensio3.scrollX,
        scrollY = _getContainerDimensio3.scrollY;

    var left = targetOffset.left - scrollX - overlay.width;
    var top = targetOffset.top - scrollY - overlay.height;
    var right = width - targetOffset.left - targetOffset.width + scrollX - overlay.width;
    var bottom = height - targetOffset.top - targetOffset.height + scrollY - overlay.height;

    var horizontal = [{ key: 'left', value: left }, { key: 'right', value: right }];
    var vertical = [{ key: 'top', value: top }, { key: 'bottom', value: bottom }];
    var AV = 'autoVertical';
    var AH = 'autoHorizontal';

    var direction = void 0;
    var align = void 0;

    if (placement.indexOf(AV) !== -1) {
      direction = (0, _maxBy2.default)(vertical, function (o) {
        return o.value;
      });
      return placement === AV ? direction.key : '' + direction.key + placement.replace(AV, '');
    } else if (placement.indexOf(AH) !== -1) {
      direction = (0, _maxBy2.default)(horizontal, function (o) {
        return o.value;
      });
      return placement === AH ? direction.key : '' + direction.key + placement.replace(AH, '');
    }

    /**
     * Precedence Vertical
     * [...vertical, ...horizontal]
     */
    direction = (0, _maxBy2.default)([].concat(vertical, horizontal), function (o) {
      return o.value;
    });

    if (direction.key === 'left' || direction.key === 'right') {
      align = (0, _minBy2.default)(vertical, function (o) {
        return o.value;
      });
    } else {
      align = (0, _minBy2.default)(horizontal, function (o) {
        return o.value;
      });
    }

    return '' + direction.key + AutoPlacement[align.key];
  },

  // 计算浮层的位置
  calcOverlayPosition: function calcOverlayPosition(placement, overlayNode, target, container, padding) {
    var childOffset = utils.getPosition(target, container);

    var _getOffset2 = (0, _domLib.getOffset)(overlayNode),
        overlayHeight = _getOffset2.height,
        overlayWidth = _getOffset2.width;

    var top = childOffset.top,
        left = childOffset.left;


    if (placement && placement.indexOf('auto') >= 0) {
      placement = this.calcAutoPlacement(placement, childOffset, container, {
        height: overlayHeight,
        width: overlayWidth
      });
    }

    var positionLeft = void 0;
    var positionTop = void 0;
    var arrowOffsetLeft = void 0;
    var arrowOffsetTop = void 0;

    if (placement === 'left' || placement === 'right') {
      positionTop = childOffset.top + (childOffset.height - overlayHeight) / 2;

      var topDelta = getTopDelta(positionTop, overlayHeight, container, padding);

      positionTop += topDelta;
      arrowOffsetTop = 50 * (1 - 2 * topDelta / overlayHeight) + '%';
      arrowOffsetLeft = undefined;
    } else if (placement === 'top' || placement === 'bottom') {
      positionLeft = left + (childOffset.width - overlayWidth) / 2;

      var leftDelta = getLeftDelta(positionLeft, overlayWidth, container, padding);
      positionLeft += leftDelta;

      arrowOffsetLeft = 50 * (1 - 2 * leftDelta / overlayWidth) + '%';
      arrowOffsetTop = undefined;
    }

    if (placement === 'top' || placement === 'topStart' || placement === 'topEnd') {
      positionTop = getPositionTop(container, overlayHeight, childOffset.top - overlayHeight);
    }

    if (placement === 'bottom' || placement === 'bottomStart' || placement === 'bottomEnd') {
      positionTop = getPositionTop(container, overlayHeight, childOffset.top + childOffset.height);
    }

    if (placement === 'left' || placement === 'leftStart' || placement === 'leftEnd') {
      positionLeft = getPositionLeft(container, overlayWidth, childOffset.left - overlayWidth);
    }

    if (placement === 'right' || placement === 'rightStart' || placement === 'rightEnd') {
      positionLeft = getPositionLeft(container, overlayWidth, childOffset.left + childOffset.width);
    }

    if (placement === 'topStart' || placement === 'bottomStart') {
      positionLeft = left + getLeftDelta(left, overlayWidth, container, padding);
    }

    if (placement === 'leftStart' || placement === 'rightStart') {
      positionTop = top + getTopDelta(top, overlayHeight, container, padding);
    }

    if (placement === 'topEnd' || placement === 'bottomEnd') {
      var nextLeft = left + (childOffset.width - overlayWidth);
      positionLeft = nextLeft + getLeftDelta(nextLeft, overlayWidth, container, padding);
    }

    if (placement === 'leftEnd' || placement === 'rightEnd') {
      var nextTop = top + (childOffset.height - overlayHeight);
      positionTop = nextTop + getTopDelta(nextTop, overlayHeight, container, padding);
    }

    return {
      positionLeft: positionLeft,
      positionTop: positionTop,
      arrowOffsetLeft: arrowOffsetLeft,
      arrowOffsetTop: arrowOffsetTop,
      positionClassName: 'placement-' + (0, _kebabCase2.default)(placement)
    };
  }
};

exports.default = utils;