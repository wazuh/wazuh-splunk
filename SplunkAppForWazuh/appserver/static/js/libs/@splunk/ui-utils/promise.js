"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.makeCancelable = void 0;

/* eslint-disable import/prefer-default-export, prefer-promise-reject-errors */

/**
 * Adds a cancel function on your promise to cancel future execution of then or catch functions.
 * makeCancelable will also cancel all callbacks attached to new promises returned by then/catch.
 *
 * @param {Promise} promise - The value to be evaluated.
 * @returns {Promise}
 * @public
 */
var makeCancelable = function makeCancelable(promise) {
  var isCanceled = false;
  var wrappedPromise = new Promise(function (resolve, reject) {
    promise.then(function (val) {
      if (isCanceled) {
        reject({
          isCanceled: true
        });
      } else {
        resolve(val);
      }
    });
    promise.catch(function (error) {
      if (isCanceled) {
        reject({
          isCanceled: true
        });
      } else {
        reject(error);
      }
    });
  });
  return {
    promise: wrappedPromise,
    cancel: function cancel() {
      isCanceled = true;
    }
  };
};

exports.makeCancelable = makeCancelable;