define(['../module'], function (module) {
  'use strict'

  module.service('$tableFilterService', function () {
    const filters = []
    return {
      set: (array) => {
        if (Array.isArray(array)) {
          filters.length = 0
          filters.push(...array)
        }
      },
      get: () => filters,
    }
  })
})
