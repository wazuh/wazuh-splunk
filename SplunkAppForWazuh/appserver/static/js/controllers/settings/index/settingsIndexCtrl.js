define([
  '../../module',
  '../../../services/visualizations/inputs/dropdown-input'
], function(app, Dropdown) {
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
      this.selectedIndex = 'wazuh'

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
        '*',
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
                  if (newValue && this.dropdownInstance) {
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
                  if (newValue && this.dropdownInstanceSourcetype) {
                      this.currentDataService.setSourceType(newValue)
                      this.scope.$emit('updatedAPI', {})
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
