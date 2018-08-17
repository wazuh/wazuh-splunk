define(['../module'], function (module) {
  'use strict'

  module.service('$keyEquivalenceService', function ($state) {
    const service = {
      equivalences: () => {
        return {
          id: 'ID',
          timestamp: 'Timestamp',
          url: 'URL',
          version: 'Version',
          'os.name': 'OS name',
          'os.version': 'OS version',
          status: 'Status',
          group: 'Group',
          ip: 'IP',
          description: 'Description',
          tag: 'Tag',
          level: 'Level',
          mergedSum: 'MD5 agent.conf',
          hash: 'MD5 agent.conf',
          configSum: 'Group MD5',
          filename: 'File',
          file: 'File',
          gdpr: 'GDPR',
          pci: 'PCI',
          groups: 'Groups',
          name: 'Name',
          count: 'Count',
          'details.program_name': 'Program name',
          'details.order': 'Order',
          vendor: 'Vendor',
          type: 'Type',
          architecture: 'Architecture',
          node_name: 'Node',
          dateAdd: 'Registration date',
          manager_host: 'Manager',
          lastKeepAlive: 'Last keep alive',
          os: 'OS',
          path: 'Path',
          details: 'Details',
          position: 'Position',
          configSum: 'Group MD5',
          mergedSum: 'MD5 agent.conf',
          key: 'Key',
          scan_id: 'Scan ID',
          format: 'Format',
          scan_time: 'Scan date'
        }
      },

    }

    return service
  })
})