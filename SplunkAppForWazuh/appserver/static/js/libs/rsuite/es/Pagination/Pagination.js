import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _extends from "@babel/runtime/helpers/esm/extends";
import _inheritsLoose from "@babel/runtime/helpers/esm/inheritsLoose";
import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { compose } from 'recompose';
import PaginationButton from './PaginationButton';
import SafeAnchor from '../SafeAnchor';
import Icon from '../Icon';
import { withStyleProps, defaultProps, getUnhandledProps } from '../utils';
import { PAGINATION_ICON_NAMES } from '../constants';

var Pagination =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(Pagination, _React$Component);

  function Pagination() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = Pagination.prototype;

  /**
   * Note that `handledProps` are generated automatically during
   * build with `babel-plugin-transform-react-flow-handled-props`
   */
  _proto.renderPageButtons = function renderPageButtons() {
    var pageButtons = [];
    var startPage;
    var endPage;
    var hasHiddenPagesAfter;
    var _this$props = this.props,
        maxButtons = _this$props.maxButtons,
        activePage = _this$props.activePage,
        pages = _this$props.pages,
        ellipsis = _this$props.ellipsis,
        boundaryLinks = _this$props.boundaryLinks,
        locale = _this$props.locale;

    if (maxButtons) {
      var hiddenPagesBefore = activePage - Math.floor(maxButtons / 2);
      startPage = hiddenPagesBefore > 1 ? hiddenPagesBefore : 1;
      hasHiddenPagesAfter = startPage + maxButtons <= pages;

      if (!hasHiddenPagesAfter) {
        endPage = pages;
        startPage = pages - maxButtons + 1;

        if (startPage < 1) {
          startPage = 1;
        }
      } else {
        endPage = startPage + maxButtons - 1;
      }
    } else {
      startPage = 1;
      endPage = pages;
    }

    for (var pagenumber = startPage; pagenumber <= endPage; pagenumber += 1) {
      pageButtons.push(this.renderItem({
        key: pagenumber,
        eventKey: pagenumber,
        active: pagenumber === activePage,
        children: pagenumber
      }));
    }

    if (boundaryLinks && ellipsis && startPage !== 1) {
      pageButtons.unshift(this.renderItem({
        key: 'ellipsisFirst',
        disabled: true,
        children: React.createElement("span", {
          "aria-label": "More"
        }, ellipsis === true ? React.createElement(Icon, {
          icon: PAGINATION_ICON_NAMES.more
        }) : ellipsis)
      }));
      pageButtons.unshift(this.renderItem({
        key: 1,
        eventKey: 1,
        children: 1
      }));
    }

    if (maxButtons && hasHiddenPagesAfter && ellipsis) {
      pageButtons.push(this.renderItem({
        key: 'ellipsis',
        disabled: true,
        children: React.createElement("span", {
          "aria-label": "More",
          title: locale.more
        }, ellipsis === true ? React.createElement(Icon, {
          icon: PAGINATION_ICON_NAMES.more
        }) : ellipsis)
      }));

      if (boundaryLinks && endPage !== pages) {
        pageButtons.push(this.renderItem({
          key: pages,
          eventKey: pages,
          disabled: false,
          children: pages
        }));
      }
    }

    return pageButtons;
  };

  _proto.renderPrev = function renderPrev() {
    var _this$props2 = this.props,
        activePage = _this$props2.activePage,
        prev = _this$props2.prev,
        locale = _this$props2.locale;

    if (!prev) {
      return null;
    }

    return this.renderItem({
      key: 'prev',
      eventKey: activePage - 1,
      disabled: activePage === 1,
      children: React.createElement("span", {
        "aria-label": "Previous",
        title: locale.prev
      }, prev === true ? React.createElement(Icon, {
        icon: PAGINATION_ICON_NAMES.prev
      }) : prev)
    });
  };

  _proto.renderNext = function renderNext() {
    var _this$props3 = this.props,
        pages = _this$props3.pages,
        activePage = _this$props3.activePage,
        next = _this$props3.next,
        locale = _this$props3.locale;

    if (!next) {
      return null;
    }

    return this.renderItem({
      key: 'next',
      eventKey: activePage + 1,
      disabled: activePage >= pages,
      children: React.createElement("span", {
        "aria-label": "Next",
        title: locale.next
      }, next === true ? React.createElement(Icon, {
        icon: PAGINATION_ICON_NAMES.next
      }) : next)
    });
  };

  _proto.renderFirst = function renderFirst() {
    var _this$props4 = this.props,
        activePage = _this$props4.activePage,
        first = _this$props4.first,
        locale = _this$props4.locale;

    if (!first) {
      return null;
    }

    return this.renderItem({
      key: 'first',
      eventKey: 1,
      disabled: activePage === 1,
      children: React.createElement("span", {
        "aria-label": "First",
        title: locale.first
      }, first === true ? React.createElement(Icon, {
        icon: PAGINATION_ICON_NAMES.first
      }) : first)
    });
  };

  _proto.renderLast = function renderLast() {
    var _this$props5 = this.props,
        pages = _this$props5.pages,
        activePage = _this$props5.activePage,
        last = _this$props5.last,
        locale = _this$props5.locale;

    if (!last) {
      return null;
    }

    return this.renderItem({
      key: 'last',
      eventKey: pages,
      disabled: activePage >= pages,
      children: React.createElement("span", {
        "aria-label": "Last",
        title: locale.last
      }, last === true ? React.createElement(Icon, {
        icon: PAGINATION_ICON_NAMES.last
      }) : last)
    });
  };

  _proto.renderItem = function renderItem(props) {
    var _this$props6 = this.props,
        onSelect = _this$props6.onSelect,
        buttonComponentClass = _this$props6.buttonComponentClass,
        disabled = _this$props6.disabled;
    var disabledButton = props.disabled;

    if (typeof disabled === 'function') {
      disabledButton = disabled(props.eventKey);
    } else if (typeof disabled === 'boolean') {
      disabledButton = disabled;
    }

    return React.createElement(PaginationButton, _extends({}, props, {
      disabled: disabledButton,
      onSelect: disabledButton ? null : onSelect,
      componentClass: buttonComponentClass
    }));
  };

  _proto.render = function render() {
    var _this$props7 = this.props,
        className = _this$props7.className,
        classPrefix = _this$props7.classPrefix,
        rest = _objectWithoutPropertiesLoose(_this$props7, ["className", "classPrefix"]);

    var unhandled = getUnhandledProps(Pagination, rest);
    return React.createElement("ul", _extends({
      className: classNames(classPrefix, className)
    }, unhandled), this.renderFirst(), this.renderPrev(), this.renderPageButtons(), this.renderNext(), this.renderLast());
  };

  return Pagination;
}(React.Component);

Pagination.propTypes = {
  activePage: PropTypes.number,
  pages: PropTypes.number,
  maxButtons: PropTypes.number,
  boundaryLinks: PropTypes.bool,
  ellipsis: PropTypes.oneOfType([PropTypes.bool, PropTypes.node]),
  first: PropTypes.oneOfType([PropTypes.bool, PropTypes.node]),
  last: PropTypes.oneOfType([PropTypes.bool, PropTypes.node]),
  prev: PropTypes.oneOfType([PropTypes.bool, PropTypes.node]),
  next: PropTypes.oneOfType([PropTypes.bool, PropTypes.node]),
  buttonComponentClass: PropTypes.elementType,
  className: PropTypes.string,
  classPrefix: PropTypes.string,
  locale: PropTypes.object,
  disabled: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
  onSelect: PropTypes.func
};
Pagination.defaultProps = {
  activePage: 1,
  pages: 1,
  maxButtons: 0,
  buttonComponentClass: SafeAnchor,
  locale: {
    more: 'More',
    prev: 'Previous',
    next: 'Next',
    first: 'First',
    last: 'Last'
  }
};
Pagination.handledProps = [];
export default compose(withStyleProps({
  hasSize: true
}), defaultProps({
  classPrefix: 'pagination'
}))(Pagination);