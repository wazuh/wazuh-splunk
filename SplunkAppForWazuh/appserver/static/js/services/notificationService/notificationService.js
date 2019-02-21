define(['../module'], function (module) {
  'use strict'
  module.service('$notificationService', function ($mdToast) {
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

    let showSuccessToast= (text) => showSimpleToast(text, 1);
    let showErrorToast = (text) => showSimpleToast(text, 2);
    let showWarningToast = (text) => showSimpleToast(text, 3);


    let showSimpleToast = (text, type) => {
      let pinTo = getToastPosition()

      if (type === 1) {
        $mdToast.show({
          hideDelay: 3000,
          position: pinTo,
          template: '<md-toast class="toastTheme euiToast euiToast--success euiGlobalToastListItem">' +
            '<div class="md-toast-content" style="background-color:white;">' +
            '<p class="toastTitle"><i class="fa fa-check"></i> Success <md-divider></md-divider>' + text +
            '</p></div>' +
            '</md-toast>'
        }
        )
      } else if (type === 2) {
        $mdToast.show({
          hideDelay: 3000,
          position: pinTo,
          template: '<md-toast class="toastTheme euiToast euiToast--success euiGlobalToastListItem">' +
            '<div class="md-toast-content" style="background-color:white;">' +
            '<p class=""><i aria-hidden="true" class="fa fa-fw fa-close"></i>Error<md-divider></md-divider>' + text +
            '</p></div>' +
            '</md-toast>'
        }
        )
      } else if (type === 3) {
        $mdToast.show({
          hideDelay: 3000,
          position: pinTo,
          template: '<md-toast class="toastTheme euiToast euiToast--success euiGlobalToastListItem">' +
            '<div class="md-toast-content" style="background-color:white;">' +
            '<p class=""><i class="fa fa-warning fa-fw"></i>Warning<md-divider></md-divider>' + text +
            '</p></div>' +
            '</md-toast>'
        }
        )
      } else {
        $mdToast.show({
          hideDelay: 3000,
          position: pinTo,
          template: '<md-toast class="toastTheme euiToast euiToast--success euiGlobalToastListItem">' +
            '<div class="md-toast-content" style="background-color:white;">' +
            '<p class=""><i class="fa fa-fw fa-info" aria-hidden="true"></i>' + text +
            '</p></div>' +
            '</md-toast>'
        }
        )

      }
    }
    return {
      showSimpleToast: showSimpleToast,
      showErrorToast: showErrorToast,
      showSuccessToast: showSuccessToast,
      showWarningToast: showWarningToast
    }
  })
})
