import _inheritsLoose from "@babel/runtime/helpers/esm/inheritsLoose";

function withPickerMethods() {
  return function (WrappedComponent) {
    var PickerComponent =
    /*#__PURE__*/
    function (_WrappedComponent) {
      _inheritsLoose(PickerComponent, _WrappedComponent);

      function PickerComponent() {
        var _this;

        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        _this = _WrappedComponent.call.apply(_WrappedComponent, [this].concat(args)) || this;

        _this.open = function () {
          if (typeof _this.handleOpenDropdown === 'function') {
            _this.handleOpenDropdown();
          }
        };

        _this.close = function () {
          if (typeof _this.handleCloseDropdown === 'function') {
            _this.handleCloseDropdown();
          }
        };

        return _this;
      }

      var _proto = PickerComponent.prototype;

      _proto.render = function render() {
        return _WrappedComponent.prototype.render.call(this);
      };

      return PickerComponent;
    }(WrappedComponent);

    return PickerComponent;
  };
}

export default withPickerMethods;