import maxBy from 'lodash/maxBy';
import minBy from 'lodash/minBy';
import kebabCase from 'lodash/kebabCase';
import { ownerDocument, getOffset, getPosition, scrollTop, scrollLeft } from 'dom-lib';

const AutoPlacement = {
  left: 'Start',
  right: 'End',
  top: 'Start',
  bottom: 'End'
};

function getContainerDimensions(containerNode) {
  let width;
  let height;
  let scrollX;
  let scrollY;
  if (containerNode.tagName === 'BODY') {
    width = window.innerWidth;
    height = window.innerHeight;
    scrollY = scrollTop(ownerDocument(containerNode).documentElement) || scrollTop(containerNode);
    scrollX = scrollLeft(ownerDocument(containerNode).documentElement) || scrollLeft(containerNode);
  } else {
    ({ width, height } = getOffset(containerNode));
    scrollY = scrollTop(containerNode);
    scrollX = scrollLeft(containerNode);
  }
  return { width, height, scrollX, scrollY };
}

function getTopDelta(top, overlayHeight, container, padding) {
  const containerDimensions = getContainerDimensions(container);
  const { height: containerHeight, scrollY } = containerDimensions;

  const topEdgeOffset = top - padding - scrollY;
  const bottomEdgeOffset = top + padding + overlayHeight - scrollY;

  if (topEdgeOffset < 0) {
    return -topEdgeOffset;
  } else if (bottomEdgeOffset > containerHeight) {
    return containerHeight - bottomEdgeOffset;
  }

  return 0;
}

function getLeftDelta(left, overlayWidth, container, padding) {
  const containerDimensions = getContainerDimensions(container);
  const { scrollX, width: containerWidth } = containerDimensions;

  const leftEdgeOffset = left - padding - scrollX;
  const rightEdgeOffset = left + padding + overlayWidth - scrollX;

  if (leftEdgeOffset < 0) {
    return -leftEdgeOffset;
  } else if (rightEdgeOffset > containerWidth) {
    return containerWidth - rightEdgeOffset;
  }

  return 0;
}

function getPositionTop(container, overlayHeight, top) {
  const { scrollY, height: containerHeight } = getContainerDimensions(container);

  // 判断 overlay 底部是否溢出，设置 top
  if (overlayHeight + top > containerHeight + scrollY) {
    return containerHeight - overlayHeight + scrollY;
  }

  // top 的最小值不能少于纵向滚动条 y 的值
  return Math.max(scrollY, top);
}

function getPositionLeft(container, overlayWidth, left) {
  const { scrollX, width: containerWidth } = getContainerDimensions(container);

  if (overlayWidth + left > containerWidth + scrollX) {
    return containerWidth - overlayWidth + scrollX;
  }

  // left 的最小值不能少于横向滚动条 x 的值
  return Math.max(scrollX, left);
}

const utils = {
  getPosition(target, container) {
    const offset =
      container.tagName === 'BODY' ? getOffset(target) : getPosition(target, container);
    return offset;
  },

  calcAutoPlacement(placement, targetOffset, container, overlay) {
    const { width, height, scrollX, scrollY } = getContainerDimensions(container);
    const left = targetOffset.left - scrollX - overlay.width;
    const top = targetOffset.top - scrollY - overlay.height;
    const right = width - targetOffset.left - targetOffset.width + scrollX - overlay.width;
    const bottom = height - targetOffset.top - targetOffset.height + scrollY - overlay.height;

    const horizontal = [{ key: 'left', value: left }, { key: 'right', value: right }];
    const vertical = [{ key: 'top', value: top }, { key: 'bottom', value: bottom }];
    const AV = 'autoVertical';
    const AH = 'autoHorizontal';

    let direction;
    let align;

    if (placement.indexOf(AV) !== -1) {
      direction = maxBy(vertical, o => o.value);
      return placement === AV ? direction.key : `${direction.key}${placement.replace(AV, '')}`;
    } else if (placement.indexOf(AH) !== -1) {
      direction = maxBy(horizontal, o => o.value);
      return placement === AH ? direction.key : `${direction.key}${placement.replace(AH, '')}`;
    }

    /**
     * Precedence Vertical
     * [...vertical, ...horizontal]
     */
    direction = maxBy([...vertical, ...horizontal], o => o.value);

    if (direction.key === 'left' || direction.key === 'right') {
      align = minBy(vertical, o => o.value);
    } else {
      align = minBy(horizontal, o => o.value);
    }

    return `${direction.key}${AutoPlacement[align.key]}`;
  },
  // 计算浮层的位置
  calcOverlayPosition(placement, overlayNode, target, container, padding) {
    const childOffset = utils.getPosition(target, container);
    const { height: overlayHeight, width: overlayWidth } = getOffset(overlayNode);
    const { top, left } = childOffset;

    if (placement && placement.indexOf('auto') >= 0) {
      placement = this.calcAutoPlacement(placement, childOffset, container, {
        height: overlayHeight,
        width: overlayWidth
      });
    }

    let positionLeft;
    let positionTop;
    let arrowOffsetLeft;
    let arrowOffsetTop;

    if (placement === 'left' || placement === 'right') {
      positionTop = childOffset.top + (childOffset.height - overlayHeight) / 2;

      const topDelta = getTopDelta(positionTop, overlayHeight, container, padding);

      positionTop += topDelta;
      arrowOffsetTop = `${50 * (1 - (2 * topDelta) / overlayHeight)}%`;
      arrowOffsetLeft = undefined;
    } else if (placement === 'top' || placement === 'bottom') {
      positionLeft = left + (childOffset.width - overlayWidth) / 2;

      const leftDelta = getLeftDelta(positionLeft, overlayWidth, container, padding);
      positionLeft += leftDelta;

      arrowOffsetLeft = `${50 * (1 - (2 * leftDelta) / overlayWidth)}%`;
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
      let nextLeft = left + (childOffset.width - overlayWidth);
      positionLeft = nextLeft + getLeftDelta(nextLeft, overlayWidth, container, padding);
    }

    if (placement === 'leftEnd' || placement === 'rightEnd') {
      const nextTop = top + (childOffset.height - overlayHeight);
      positionTop = nextTop + getTopDelta(nextTop, overlayHeight, container, padding);
    }

    return {
      positionLeft,
      positionTop,
      arrowOffsetLeft,
      arrowOffsetTop,
      positionClassName: `placement-${kebabCase(placement)}`
    };
  }
};

export default utils;
