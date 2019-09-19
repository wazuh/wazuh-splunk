import * as React from 'react';
import { reactToString } from 'rsuite-utils/lib/utils';

var SelectedElement = function SelectedElement(props) {
  var selectedItems = props.selectedItems,
      prefix = props.prefix,
      valueKey = props.valueKey,
      labelKey = props.labelKey,
      childrenKey = props.childrenKey,
      countable = props.countable,
      cascade = props.cascade,
      locale = props.locale;
  var count = selectedItems.length;
  var title = '';

  if (count) {
    title = selectedItems.map(function (item) {
      var label = item[labelKey];

      if (typeof label === 'string' || typeof label === 'number') {
        return label;
      } else if (React.isValidElement(label)) {
        return reactToString(label).join('');
      }

      return '';
    }).join(', ');
  }

  return React.createElement(React.Fragment, null, React.createElement("span", {
    className: prefix('value-list'),
    title: title
  }, selectedItems.map(function (item, index) {
    var checkAll = cascade && (item.checkAll || item[childrenKey]);
    return React.createElement(React.Fragment, {
      key: item[valueKey]
    }, React.createElement("span", {
      className: prefix('value-item')
    }, item[labelKey], checkAll ? " (" + locale.checkAll + ")" : ''), index === count - 1 ? null : React.createElement("span", {
      className: prefix('value-separator')
    }, ","));
  })), countable ? React.createElement("span", {
    className: prefix('value-count'),
    title: "" + count
  }, count > 99 ? '99+' : count) : null);
};

export default SelectedElement;