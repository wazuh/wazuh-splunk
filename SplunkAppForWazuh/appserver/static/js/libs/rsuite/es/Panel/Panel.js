import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _extends from "@babel/runtime/helpers/esm/extends";
import _inheritsLoose from "@babel/runtime/helpers/esm/inheritsLoose";
import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import _ from 'lodash';
import Collapse from 'rsuite-utils/lib/Animation/Collapse';
import { getUnhandledProps, defaultProps, prefix } from '../utils';

var Panel =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(Panel, _React$Component);

  function Panel(props) {
    var _this;

    _this = _React$Component.call(this, props) || this;

    _this.handleSelect = function (event) {
      event.persist();
      var _this$props = _this.props,
          onSelect = _this$props.onSelect,
          eventKey = _this$props.eventKey;

      if (onSelect) {
        onSelect(eventKey, event);
      }

      _this.handleToggle();
    };

    _this.handleToggle = function () {
      _this.setState({
        expanded: !_this.state.expanded
      });
    };

    _this.addPrefix = function (name) {
      return prefix(_this.props.classPrefix)(name);
    };

    _this.state = {
      expanded: props.defaultExpanded
    };
    return _this;
  }

  var _proto = Panel.prototype;

  _proto.isExpanded = function isExpanded() {
    return _.isUndefined(this.props.expanded) ? this.state.expanded : this.props.expanded;
  };

  _proto.renderCollapsibleTitle = function renderCollapsibleTitle(header, headerRole) {
    return React.createElement("h4", {
      className: this.addPrefix('title'),
      role: "presentation"
    }, this.renderAnchor(header, headerRole));
  };

  _proto.renderCollapsibleBody = function renderCollapsibleBody(panelRole) {
    var id = this.props.id;

    var collapseProps = _extends({}, _.pick(this.props, _.get(Collapse, 'handledProps')), {
      in: this.isExpanded()
    });

    var props = {
      id: id ? "" + id : null,
      className: this.addPrefix('collapse'),
      'aria-hidden': !this.isExpanded()
    };

    if (panelRole) {
      props.role = panelRole;
    }

    return React.createElement(Collapse, collapseProps, React.createElement("div", props, this.renderBody()));
  };

  _proto.renderBody = function renderBody() {
    var _classNames;

    var _this$props2 = this.props,
        children = _this$props2.children,
        bodyFill = _this$props2.bodyFill;
    var classes = classNames(this.addPrefix('body'), (_classNames = {}, _classNames[this.addPrefix('body-fill')] = bodyFill, _classNames));
    return React.createElement("div", {
      className: classes
    }, children);
  };

  _proto.renderHeading = function renderHeading(headerRole) {
    var _this$props3 = this.props,
        header = _this$props3.header,
        collapsible = _this$props3.collapsible;

    if (!header) {
      return null;
    }

    if (!React.isValidElement(header) || Array.isArray(header)) {
      header = collapsible ? this.renderCollapsibleTitle(header, headerRole) : header;
    } else {
      var className = classNames(this.addPrefix('title'), _.get(header, 'props.className'));
      header = React.cloneElement(header, {
        className: className
      });
    }

    return React.createElement("div", {
      role: "rowheader",
      className: this.addPrefix('heading'),
      onClick: this.handleSelect,
      tabIndex: -1
    }, header);
  };

  _proto.renderAnchor = function renderAnchor(header, headerRole) {
    var _this$props4 = this.props,
        id = _this$props4.id,
        collapsible = _this$props4.collapsible;
    return React.createElement("span", {
      "aria-controls": collapsible ? "" + id : null,
      className: this.isExpanded() ? null : 'collapsed',
      "aria-expanded": this.isExpanded(),
      "aria-selected": this.isExpanded(),
      role: headerRole
    }, header);
  };

  _proto.render = function render() {
    var _classNames2;

    var _this$props5 = this.props,
        headerRole = _this$props5.headerRole,
        panelRole = _this$props5.panelRole,
        className = _this$props5.className,
        collapsible = _this$props5.collapsible,
        bordered = _this$props5.bordered,
        classPrefix = _this$props5.classPrefix,
        id = _this$props5.id,
        props = _objectWithoutPropertiesLoose(_this$props5, ["headerRole", "panelRole", "className", "collapsible", "bordered", "classPrefix", "id"]);

    var classes = classNames(className, classPrefix, this.addPrefix('default'), (_classNames2 = {}, _classNames2[this.addPrefix('in')] = this.isExpanded(), _classNames2[this.addPrefix('collapsible')] = collapsible, _classNames2[this.addPrefix('bordered')] = bordered, _classNames2));
    var unhandled = getUnhandledProps(Panel, props);
    return React.createElement("div", _extends({}, unhandled, {
      className: classes,
      id: collapsible ? null : id
    }), this.renderHeading(headerRole), collapsible ? this.renderCollapsibleBody(panelRole) : this.renderBody());
  };

  return Panel;
}(React.Component);

Panel.propTypes = {
  collapsible: PropTypes.bool,
  bordered: PropTypes.bool,
  bodyFill: PropTypes.bool,
  header: PropTypes.any,
  id: PropTypes.oneOf([PropTypes.number, PropTypes.string]),
  defaultExpanded: PropTypes.bool,
  expanded: PropTypes.bool,
  eventKey: PropTypes.any,
  headerRole: PropTypes.string,
  panelRole: PropTypes.string,
  classPrefix: PropTypes.string,
  children: PropTypes.node,
  onSelect: PropTypes.func,
  onEnter: PropTypes.func,
  onEntering: PropTypes.func,
  onEntered: PropTypes.func,
  onExit: PropTypes.func,
  onExiting: PropTypes.func,
  onExited: PropTypes.func,
  className: PropTypes.string
};
export default defaultProps({
  classPrefix: 'panel'
})(Panel);