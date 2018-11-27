/**
 * Returns applied configuration for specific agent and specific section
 * @param {string} agentId Agent ID
 * @param {Array<object>} sections Array that includes sections to be fetched
 * @param {object} apiReq API request service reference
 */
define([], function() {
  'use strict'
  return async function queryConfig(agentId, sections, apiReq) {
    try {
      if (
        !agentId ||
        typeof agentId !== 'string' ||
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
        const partialResult = await apiReq.apiReq(
          `/agents/${agentId}/config/${component}/${configuration}`
        )
        result[`${component}-${configuration}`] = partialResult.data.data
        if (partialResult.data.error) {
          result[`${component}-${configuration}`] = partialResult.data.message
        }
      }
      return result
    } catch (error) {
      return Promise.reject(error)
    }
  }
})
