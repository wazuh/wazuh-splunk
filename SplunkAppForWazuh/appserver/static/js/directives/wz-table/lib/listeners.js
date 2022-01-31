/*
 * Wazuh app - Wazuh table directive event listeners
 * Copyright (C) 2015-2019 Wazuh, Inc.
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 *
 * Find more information about this on the LICENSE file.
 */
define([], function () {
  "use strict"
  return {
    wazuhUpdateInstancePath: (parameters, instance, init) => {
      instance.filters = []
      instance.path = parameters.path
      return init()
    },

    wazuhFilter: (parameters, filter) => {
      return filter(parameters.filter)
    },

    wazuhQuery: (parameters, query) => {
      return query(parameters.query, parameters.search)
    },

    wazuhSearch: (parameters, instance, search) => {
      if (
        parameters &&
        parameters.specificPath &&
        !instance.path.includes(parameters.specificPath)
      ) {
        return
      }
      return search(parameters.term, parameters.removeFilters)
    },

    wazuhRemoveFilter: (parameters, instance, $tableFilterService, init) => {
      instance.filters = instance.filters.filter(
        (item) => item.name !== parameters.filterName
      )
      $tableFilterService.set(instance.filters)
      return init()
    },
  }
})
