define(['../module'], function(module) {
  'use strict'
  module.service('$notificationService', function($mdToast, $rootScope) {
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

    let showSuccessToast = text => showSimpleToast(text, 1)
    let showErrorToast = text => showSimpleToast(text, 2)
    let showWarningToast = text => showSimpleToast(text, 3)

    let showSimpleToast = (text, type) => {
      if (!wazuhIsNotReady(text)) {
        let pinTo = getToastPosition()
        if (type === 1) {
          $mdToast.show({
            //Success
            hideDelay: 3000,
            position: pinTo,
            template:
              '<md-toast  style="border-top: 3px solid #23c405;" class="toastTheme euiToast euiToast--success euiGlobalToastListItem">' +
              '<div class="md-toast-content" style="background-color:white;">' +
              '<p class="wz-padding-top-7"><i class="fa fa-check"></i>&nbsp;' +
              text +
              '</p></div>' +
              '</md-toast>'
          })
        } else if (type === 2) {
          //Error
          $mdToast.show({
            hideDelay: 15000,
            position: pinTo,
            template:
              '<md-toast  style="border-top: 3px solid #db0d0d;" class="toastTheme euiToast euiToast--success euiGlobalToastListItem">' +
              '<div class="md-toast-content" style="background-color:white;">' +
              '<p class="wz-padding-top-7"><i aria-hidden="true" class="fa fa-fw fa-close"></i>&nbsp;' +
              text +
              '</p></div>' +
              '</md-toast>'
          })
        } else if (type === 3) {
          //Warning
          $mdToast.show({
            hideDelay: 3000,
            position: pinTo,
            template:
              '<md-toast style="border-top: 3px solid #eddb07;" class="toastTheme euiToast euiToast--success euiGlobalToastListItem">' +
              '<div class="md-toast-content" style="background-color:white;">' +
              '<p class="wz-padding-top-7"><i class="fa fa-warning fa-fw"></i>&nbsp;' +
              text +
              '</p></div>' +
              '</md-toast>'
          })
        } else {
          $mdToast.show({
            //Info
            hideDelay: 3000,
            position: pinTo,
            template:
              '<md-toast style="border-top: 3px solid #005571;" class="toastTheme euiToast euiToast--success euiGlobalToastListItem">' +
              '<div class="md-toast-content" style="background-color:white;">' +
              '<p class="wz-padding-top-7"><i class="fa fa-fw fa-info" aria-hidden="true"></i>&nbsp;' +
              text +
              '</p></div>' +
              '</md-toast>'
          })
        }
      }
    }

    const showHeadToaster = (type, msg, delay = false) => {
      $rootScope.$broadcast('showHeadToaster', { type, msg, delay })
    }

    const wazuhIsNotReady = text => {
      try {
        if (text instanceof Object && text.message.includes('ERROR3099')) {
          $rootScope.$broadcast('wazuhNotReadyYet', {})
          return true
        } else {
          if (text.includes('ERROR3099')) {
            $rootScope.$broadcast('wazuhNotReadyYet', {})
            return true
          }
        }
      } catch (error) {
        return false
      }
    }

    return {
      showSimpleToast: showSimpleToast,
      showErrorToast: showErrorToast,
      showSuccessToast: showSuccessToast,
      showWarningToast: showWarningToast,
      showHeadToaster: showHeadToaster
    }
  })
})
