/**
 * Returns applied configuration for specific agent and specific section
 * @param {string} agentId Agent ID
 * @param {Array<object>} sections Array that includes sections to be fetched
 * @param {object} apiReq API request service reference
 */
define([], function () {
  'use strict'
  return async function queryConfig(
    sections,
    apiReq,
    agentId = false,
    node = false
  ) {
    try {
      if (
        (agentId && typeof agentId !== 'string') ||
        (node && typeof node !== 'string') ||
        !sections ||
        !sections.length ||
        typeof sections !== 'object' ||
        !Array.isArray(sections)
      ) {
        throw new Error('Invalid parameters')
      }

      const result = {}
      for (const section of sections) {
        const { component, configuration } = section
        if (
          !component ||
          typeof component !== 'string' ||
          !configuration ||
          typeof configuration !== 'string'
        ) {
          throw new Error('Invalid section')
        }

        // Gets manager, node or agent config
        let partialResult = {}
        if (agentId && !node) {
          partialResult = await apiReq.apiReq(
            `/agents/${agentId}/config/${component}/${configuration}`
          )
        } else if (!agentId && node) {
          partialResult = await apiReq.apiReq(
            `/cluster/${node}/configuration/${component}/${configuration}`
          )
        } else if (!agentId && !node) {
          partialResult = await apiReq.apiReq(
            `/manager/configuration/${component}/${configuration}`
          )
        } else {
          throw new Error('Invalid host instance.')
        }

        if (partialResult.data.error == 0) {
          result[`${component}-${configuration}`] =
            partialResult.data.data.affected_items &&
            partialResult.data.data.affected_items[0]
              ? partialResult.data.data.affected_items[0]
              : partialResult.data.data
        } else if (partialResult.data.error) {
          const isModuleConnectionError =
            typeof partialResult.data.error == 'string' &&
            partialResult.data.error.includes('Error connecting with socket')

          if (
            (((partialResult.data.data || {}).failed_items || []).length &&
              partialResult.data.data.failed_items[0].error.code == 1116) ||
            isModuleConnectionError
          )
            //Error 1121 - Module not configured in ossec.conf
            result[`${component}-${configuration}`] = 'not-present'
          else if (partialResult.data.detail || partialResult.data.message)
            result[`${component}-${configuration}`] =
              partialResult.data.detail || partialResult.data.message
          else
            result[`${component}-${configuration}`] = partialResult.data.error
        }
      }
      return result
    } catch (error) {
      return Promise.reject(error)
    }
  }
})
