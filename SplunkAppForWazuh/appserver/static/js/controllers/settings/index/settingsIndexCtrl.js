define([
  '../../module',
  '../../../services/visualizations/inputs/dropdown-input',
  'splunkjs/mvc'
], function(app, Dropdown, mvc) {
  class SettingIndex {
    /**
     * Class constructor
     * @param {Object} $scope
     * @param {Object} $currentDataService
     * @param {Object} $urlTokenModel
     */

    constructor(
      $scope,
      $currentDataService,
      $urlTokenModel,
      $notificationService
    ) {
      this.scope = $scope
      this.currentDataService = $currentDataService
      this.urlTokenModel = $urlTokenModel
      this.notification = $notificationService
      this.selectedIndex = $currentDataService.getIndex() || 'wazuh'
      this.selectedSourceType = $currentDataService.getSourceType() || '*'

      mvc.Components.revokeInstance('inputIndexes')
      mvc.Components.revokeInstance('inputIndexesSearch')
      $(`#inputIndexes`).html('')

      this.dropdown = new Dropdown(
        'inputIndexes',
        `| metasearch index=* sourcetype=*wazuh* | stats count by index, sourcetype | fields index`,
        'index',
        '$form.index$',
        'inputIndexes',
        this.scope,
        this.selectedIndex,
        '2017-03-14T10:0:0',
        'now'
      )


    this.getSourceTypeQuery = () => {
        return `| metasearch index=${this.selectedIndex} sourcetype=* | stats count by index, sourcetype | fields sourcetype`;
    };

    this.dropdownSourceType = new Dropdown(
        'inputSourcetype',
        this.getSourceTypeQuery(),
        'sourcetype',
        '$form.sourcetype$',
        'inputSourcetype',
        this.scope,
        this.selectedSourceType,
        '2017-03-14T10:0:0',
        'now'
    )
    }


    /**
     * On controller loads
     */
    $onInit() {
      this.onChangeDropdownIndex();
      this.onChangeDropdownSourcetype();
      this.scope.$on('$destroy', () => {
        this.dropdown.destroy();
        this.dropdownSourceType.destroy();
      })
    }

      onChangeDropdownIndex() {          
          this.dropdownInstance = this.dropdown.getElement()
          this.dropdownInstance.on('change', newValue => {
              try {
                  if (newValue && newValue != this.selectedIndex && this.dropdownInstance) {
                      this.currentDataService.setIndex(newValue)
                      this.scope.$emit('updatedAPI', {})
                      this.urlTokenModel.handleValueChange(this.dropdownInstance)
                      this.selectedIndex = newValue;                      
                      this.dropdownSourceType.changeSearch(this.getSourceTypeQuery());
                  }
              } catch (error) {
                  this.notification.showErrorToast(error)
              }
          })
      }

      onChangeDropdownSourcetype() {
          this.dropdownInstanceSourcetype = this.dropdownSourceType.getElement()
          this.dropdownInstanceSourcetype.on('change', newValue => {
              try {
                  if (newValue && newValue != this.selectedSourceType && this.dropdownInstanceSourcetype) {
                      this.currentDataService.setSourceType(newValue)
                      this.scope.$emit('updatedAPI', {})
                      this.selectedSourceType = newValue                      
                      this.urlTokenModel.handleValueChange(this.dropdownInstanceSourcetype)
                  }
              } catch (error) {
                  this.notification.showErrorToast(error)
              }
          })
      }

  }

  app.controller('settingsIndexCtrl', SettingIndex)
})
