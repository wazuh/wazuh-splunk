import _extends from "@babel/runtime/helpers/esm/extends";
import _inheritsLoose from "@babel/runtime/helpers/esm/inheritsLoose";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import { getClassNamePrefix } from './prefix';

function defaultProps(props) {
  var classPrefix = props.classPrefix,
      rest = _objectWithoutPropertiesLoose(props, ["classPrefix"]);

  return function (WrappedComponent) {
    var DefaultPropsComponent =
    /*#__PURE__*/
    function (_WrappedComponent) {
      _inheritsLoose(DefaultPropsComponent, _WrappedComponent);

      function DefaultPropsComponent() {
        return _WrappedComponent.apply(this, arguments) || this;
      }

      var _proto = DefaultPropsComponent.prototype;

      // for IE9 & IE10 support
      _proto.render = function render() {
        return _WrappedComponent.prototype.render.call(this);
      };

      return DefaultPropsComponent;
    }(WrappedComponent);

    DefaultPropsComponent.contextTypes = WrappedComponent.contextTypes;
    DefaultPropsComponent.childContextTypes = WrappedComponent.childContextTypes;
    DefaultPropsComponent.getDerivedStateFromProps = WrappedComponent.getDerivedStateFromProps;
    DefaultPropsComponent.defaultProps = _extends({}, WrappedComponent.defaultProps, {
      classPrefix: classPrefix ? "" + getClassNamePrefix() + classPrefix : undefined
    }, rest);
    return DefaultPropsComponent;
  };
}

export default defaultProps;