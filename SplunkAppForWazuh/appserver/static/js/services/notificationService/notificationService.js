define(['../module'], function(module) {
  'use strict'
  module.service('$notificationService', function($mdToast) {
    let last = {
      bottom: true,
      top: false,
      left: false,
      right: true
    }

    let toastPosition = angular.extend({}, last)

    let getToastPosition = () => {
      sanitizePosition()

      return Object.keys(toastPosition)
        .filter(pos => {
          return toastPosition[pos]
        })
        .join(' ')
    }

    let sanitizePosition = () => {
      let current = toastPosition

      if (current.bottom && last.top) current.top = false
      if (current.top && last.bottom) current.bottom = false
      if (current.right && last.left) current.left = false
      if (current.left && last.right) current.right = false

      last = angular.extend({}, current)
    }

    let showSimpleToast = text => {
      let pinTo = getToastPosition()

      $mdToast.show(
        $mdToast
          .simple()
          .textContent(text)
          .position(pinTo)
          .hideDelay(2000)
      )
    }
    return {
      showSimpleToast: showSimpleToast
    }
  })
})
