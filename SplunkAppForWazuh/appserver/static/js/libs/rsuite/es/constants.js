export var STATUS_ICON_NAMES = {
  info: 'info',
  success: 'check-circle',
  error: 'close-circle',
  warning: 'remind'
};
export var PAGINATION_ICON_NAMES;

(function (PAGINATION_ICON_NAMES) {
  PAGINATION_ICON_NAMES["more"] = "more";
  PAGINATION_ICON_NAMES["prev"] = "page-previous";
  PAGINATION_ICON_NAMES["next"] = "page-next";
  PAGINATION_ICON_NAMES["first"] = "page-top";
  PAGINATION_ICON_NAMES["last"] = "page-end";
})(PAGINATION_ICON_NAMES || (PAGINATION_ICON_NAMES = {}));

export var SIZE = ['lg', 'md', 'sm', 'xs'];
export var STATUS = ['success', 'warning', 'error', 'info'];
export var COLOR = ['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'violet'];
export var PLACEMENT_4 = ['top', 'bottom', 'right', 'left'];
export var PLACEMENT_8 = ['bottomStart', 'bottomEnd', 'topStart', 'topEnd', 'leftStart', 'rightStart', 'leftEnd', 'rightEnd'];
export var PLACEMENT_AUTO = ['auto', 'autoVerticalStart', 'autoVerticalEnd', 'autoHorizontalStart', 'autoHorizontalEnd'];
export var PLACEMENT = [].concat(PLACEMENT_4, PLACEMENT_8, PLACEMENT_AUTO);
/**
 *  Check Tree Node State
 */

export var CHECK_STATE;

(function (CHECK_STATE) {
  CHECK_STATE[CHECK_STATE["UNCHECK"] = 0] = "UNCHECK";
  CHECK_STATE[CHECK_STATE["CHECK"] = 1] = "CHECK";
  CHECK_STATE[CHECK_STATE["INDETERMINATE"] = 2] = "INDETERMINATE";
})(CHECK_STATE || (CHECK_STATE = {}));

export var TREE_NODE_PADDING = 16;
export var TREE_NODE_ROOT_PADDING = 12;