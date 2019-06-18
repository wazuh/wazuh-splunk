/**
 * Returns applied configuration for specific agent and specific section
 * @param {string} agentId Agent ID
 * @param {Array<object>} sections Array that includes sections to be fetched
 * @param {object} apiReq API request service reference
 */
define([], function() {
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
        const  component = section.component
        const configuration  = section.configuration
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
            `/cluster/${node}/config/${component}/${configuration}`
          )
        } else if (!agentId && !node) {
          partialResult = await apiReq.apiReq(
            `/manager/config/${component}/${configuration}`
          )
        } else {
          throw new Error('Invalid host instance.')
        }

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
