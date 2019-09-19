import _ from 'lodash';
export var guid = function guid(num) {
  if (num === void 0) {
    num = 8;
  }

  return (Math.random() * 1e18).toString(36).slice(0, num).toUpperCase();
};
export var getFiles = function getFiles(event) {
  if (_.get(event, 'dataTransfer') && typeof _.get(event, 'dataTransfer') === 'object') {
    return _.get(event, 'dataTransfer.files');
  }

  if (event.target) {
    return _.get(event, 'target.files');
  }

  return [];
};