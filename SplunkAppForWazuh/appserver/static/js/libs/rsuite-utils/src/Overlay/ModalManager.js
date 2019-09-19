// @flow

import {
  addClass,
  removeClass,
  addStyle,
  getStyle,
  getScrollbarSize,
  isOverflowing
} from 'dom-lib';

function findIndexOf(arr, cb: (d: any, i: any) => boolean) {
  let idx = -1;
  arr.some((d, i) => {
    if (cb(d, i)) {
      idx = i;
      return true;
    }
    return false;
  });
  return idx;
}

function findContainer(data, modal) {
  return findIndexOf(data, d => d.modals.indexOf(modal) !== -1);
}

class ModalManager {
  constructor(hideSiblingNodes: boolean = true) {
    this.hideSiblingNodes = hideSiblingNodes;
    this.modals = [];
    this.containers = [];
    this.data = [];
  }

  hideSiblingNodes = null;
  modals = [];
  containers = [];
  data = [];

  add(modal: Object, container: Object, className?: string) {
    let modalIdx = this.modals.indexOf(modal);
    let containerIdx = this.containers.indexOf(container);

    if (modalIdx !== -1) {
      return modalIdx;
    }

    modalIdx = this.modals.length;
    this.modals.push(modal);

    if (containerIdx !== -1) {
      this.data[containerIdx].modals.push(modal);
      return modalIdx;
    }

    const data = {
      modals: [modal],
      classes: className ? className.split(/\s+/) : [],
      style: {
        overflow: container.style.overflow,
        paddingRight: container.style.paddingRight
      },
      overflowing: isOverflowing(container)
    };

    if (data.overflowing) {
      /*eslint-disable */
      const style = {
        paddingRight:
          parseInt(getStyle(container, 'paddingRight') || 0, 10) + getScrollbarSize() + 'px'
      };
      addStyle(container, style);
    }

    data.classes.forEach(addClass.bind(null, container));

    this.containers.push(container);
    this.data.push(data);

    return modalIdx;
  }

  remove(modal: Object) {
    let modalIdx = this.modals.indexOf(modal);

    if (modalIdx === -1) {
      return;
    }

    let containerIdx = findContainer(this.data, modal);

    let data = this.data[containerIdx];
    let container = this.containers[containerIdx];

    data.modals.splice(data.modals.indexOf(modal), 1);

    this.modals.splice(modalIdx, 1);

    if (data.modals.length === 0) {
      Object.keys(data.style).forEach(key => (container.style[key] = data.style[key]));

      data.classes.forEach(removeClass.bind(null, container));

      this.containers.splice(containerIdx, 1);
      this.data.splice(containerIdx, 1);
    }
  }

  isTopModal(modal: Object) {
    return !!this.modals.length && this.modals[this.modals.length - 1] === modal;
  }
}

export default ModalManager;
