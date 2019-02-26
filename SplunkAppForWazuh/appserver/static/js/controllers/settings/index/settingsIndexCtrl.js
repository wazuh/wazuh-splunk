define([
  '../../module',
  '../../../services/visualizations/inputs/dropdown-input'
], function (app, Dropdown) {
  class SettingIndex {
    /**
     * Class constructor
     * @param {Object} $scope
     * @param {Object} $currentDataService
     * @param {Object} $urlTokenModel
     */

    constructor($scope, $currentDataService, $urlTokenModel, $notificationService) {
      this.scope = $scope
      this.currentDataService = $currentDataService
      this.urlTokenModel = $urlTokenModel
      this.notification = $notificationService

      this.dropdown = new Dropdown(
        'inputIndexes',
        `| metasearch index=* sourcetype=wazuh | stats count by index, sourcetype | fields index`,
        'index',
        '$form.index$',
        'inputIndexes',
        this.scope,
        'wazuh',
        '2017-03-14T10:0:0',
        'now'
      )
    }

    /**
     * On controller loads
     */
    $onInit() {
      this.dropdownInstance = this.dropdown.getElement()
      this.dropdownInstance.on('change', newValue => {
        try {
          if (newValue && this.dropdownInstance) {
            this.currentDataService.setIndex(newValue)
            this.scope.$emit('updatedAPI', {})
            this.urlTokenModel.handleValueChange(this.dropdownInstance)
          }
        } catch (error) {
          this.notification.showErrorToast(error)
        }

      })

      this.scope.$on('$destroy', () => {
        this.dropdown.destroy()
      })
    }
  }

  app.controller('settingsIndexCtrl', SettingIndex)
})
