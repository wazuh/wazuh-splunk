/**
 * placementPolyfill('bottomLeft');
 * output 'bottomStart'
 */
export default (function (placement) {
  if (typeof placement === 'string') {
    return placement.replace(/Left|Top/, 'Start').replace(/Right|Bottom/, 'End');
  }

  return placement;
});