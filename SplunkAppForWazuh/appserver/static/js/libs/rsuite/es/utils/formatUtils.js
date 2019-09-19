export var shouldTime = function shouldTime(format) {
  return /(H|h|m|s)/.test(format);
};
export var shouldMonth = function shouldMonth(format) {
  return /Y/.test(format) && /M/.test(format);
};
export var shouldDate = function shouldDate(format) {
  return /Y/.test(format) && /M/.test(format) && /D/.test(format);
};
export var shouldOnlyTime = function shouldOnlyTime(format) {
  return /(H|h|m|s)/.test(format) && !/(Y|M|D)/.test(format);
};