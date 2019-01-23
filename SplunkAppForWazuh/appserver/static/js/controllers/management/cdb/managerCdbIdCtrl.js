define(['../../module', '../rules/ruleset'], function(controllers, Ruleset) {
    'use strict'
  
    class CdbListId extends Ruleset {
      /**
       * Class CdbList-ID
       * @param {*} $scope
       * @param {*} $sce
       * @param {*} $notificationService
       * @param {*} $state
       * @param {*} $currentDataService
       * @param {*} $tableFilterService
       * @param {*} $csvRequestService
       */
      constructor(
        $scope,
        $sce,
        $notificationService,
        $state,
        $currentDataService,
        $tableFilterService,
        $csvRequestService,
        extensions
      ) {
        super(
          $scope,
          $sce,
          $notificationService,
          'cdb',
          $currentDataService,
          $tableFilterService,
          $csvRequestService
        )
        this.state = $state
        this.extensions = extensions
        try {
          this.filters = JSON.parse(window.localStorage.decoders) || []
        } catch (err) {
          this.filters = []
        }
      }
  
      /**
       * On controller load
       */
      $onInit() {
        this.scope.downloadCsv = (path, name) => this.downloadCsv(path, name)
        this.scope.addDetailFilter = (name, value) =>
          this.addDetailFilter(name, value)
  
        //Remove static values
        this.scope.cdbInfo = {
            file: 'audit-keys',
            path: '/etc/lists'
        }

        // Edit cdb lists
        //Remove when fetchFile() works, only for a example
        this.scope.cdbContent = this.fetchFile()
        this.scope.adminMode = this.extensions['admin'] === 'true'     
      }
  
      // TODO methods to create, edit and remove new fields in the CDB list

      //Change to async
      fetchFile() {
        // MISSING API CALL TO DO THIS
        return {"audit-wazuh-a":"attribute","audit-wazuh-x":"execute","audit-wazuh-c":"command","audit-wazuh-r":"read","audit-wazuh-w":"write"}
      }
    }
    controllers.controller('managerCdbIdCtrl', CdbListId)
  })
  