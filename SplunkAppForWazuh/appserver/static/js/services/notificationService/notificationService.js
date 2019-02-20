define(['../module'], function(module) {
  'use strict'
  module.service('$notificationService', function($mdToast) {
    let last = {
      bottom: true,
      top: false,
      left: false,
      right: true
    }

    let toastPosition = angular.extend({}, last) // eslint-disable-line

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

      last = angular.extend({}, current) // eslint-disable-line
    }

    let showSimpleToast = text => {
      let pinTo = getToastPosition()

      $mdToast.show({
        hideDelay   : 3000,
        position: pinTo,
        template: '<md-toast class="toastTheme">' +
        '<div class="md-toast-content" style="background-color:white;">' +
          '<p style="style="font-size:18px;""><i class="fa fa-fw fa-info"  aria-hidden="true"></i> This is a ustom preset is a custom preset is a custom preset eset'+ text +
        '</p></div>' +
      '</md-toast>'
      }
      )
    }
    return {
      showSimpleToast: showSimpleToast
    }
  })
})
