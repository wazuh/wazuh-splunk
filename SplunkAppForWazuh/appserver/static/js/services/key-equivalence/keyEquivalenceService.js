define(['../module'], function(module) {
  'use strict'

  module.service('$keyEquivalenceService', function($state) {
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
          conf_sum: 'Group MD5 sum',
          merged_sum: 'Group sum',
          hash: 'MD5 sum',
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
          manager: 'Manager',
          lastKeepAlive: 'Last keep alive',
          os: 'OS',
          path: 'Path',
          details: 'Details',
          position: 'Position',
          configSum: 'Group MD5 sum',
          mergedSum: 'Group sum',
          key: 'Key',
          scan_id: 'Scan ID',
          format: 'Format',
          scan_time: 'Scan date',
          state: 'State',
          mac: 'MAC',
          gateway: 'Gateway',
          dhcp: 'DHCP',
          iface: 'Interface',
          broadcast: 'Broadcast',
          proto: 'Protocol',
          address: 'Address',
          protocol: 'Protocol',
          'local.ip': 'Local',
          'remote.ip': 'Remote'
        }
      }
    }
    return service
  })
})
