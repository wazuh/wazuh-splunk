import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import CheckTreePicker from '../CheckTreePicker';
var CheckTree = React.forwardRef(function (props, ref) {
  return React.createElement(CheckTreePicker, _extends({
    ref: ref,
    inline: true
  }, props));
});
CheckTree.displayName = 'CheckTree';
export default CheckTree;