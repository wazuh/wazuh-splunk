import shallowEqual from './shallowEqual';

function shallowEqualArray(a: Array, b: Array) {
  if (a === b) {
    return true;
  }

  if (a.length !== b.length) {
    return false;
  }

  for (let i = 0; i < a.length; i += 1) {
    if (!shallowEqual(a[i], b[i])) {
      return false;
    }
  }

  return true;
}

export default shallowEqualArray;
