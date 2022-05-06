define(['../module'], function (module) {
  'use strict'

  module.service('$requirementService', function () {
    /**
     * Gets a valid resource string with an optional parameter,
     * returns a wildcard resource if no param is specified
     * @param {
     *  "RESOURCELESS" |
     *  "AGENT_GROUP" |
     *  "AGENT_ID" |
     *  "GROUP_ID" |
     *  "NODE_ID" |
     *  "DECODER_FILE" |
     *  "LIST_FILE" |
     *  "RULE_FILE" |
     *  "POLICY_ID" |
     *  "ROLE_ID" |
     *  "RULE_ID" |
     *  "USER_ID"
     * } resource
     * @param {string} param
     * @returns {string}
     */
    const getResource = (resource, param = '*') => {
      const resourceDic = {
        RESOURCELESS: '*:*:*',
        AGENT_GROUP: `agent:group:${param}`,
        AGENT_ID: `agent:id:${param}`,
        GROUP_ID: `group:id:${param}`,
        NODE_ID: `node:id:${param}`,
        DECODER_FILE: `decoder:file:${param}`,
        LIST_FILE: `list:file:${param}`,
        RULE_FILE: `rule:file:${param}`,
        POLICY_ID: `policy:id:${param}`,
        ROLE_ID: `role:id:${param}`,
        RULE_ID: `rule:id:${param}`,
        USER_ID: `user:id:${param}`,
      }
      if (!(resource in resourceDic)) {
        throw 'Invalid resource'
      }
      return resourceDic[resource]
    }

    /**
     * Returns a valid action string
     * @param {
     * "ACTIVE_RESPONSE_COMMAND" |
     * "AGENT_CREATE" |
     * "AGENT_DELETE" |
     * "AGENT_MODIFY_GROUP" |
     * "AGENT_READ" |
     * "AGENT_RESTART" |
     * "AGENT_UPGRADE" |
     * "CISCAT_READ" |
     * "CLUSTER_READ_API_CONFIG" |
     * "CLUSTER_READ" |
     * "CLUSTER_RESTART" |
     * "CLUSTER_STATUS" |
     * "CLUSTER_UPDATE_CONFIG" |
     * "DECODERS_READ" |
     * "DECODERS_UPDATE" |
     * "DECODERS_DELETE" |
     * "GROUP_CREATE" |
     * "GROUP_DELETE" |
     * "GROUP_MODIFY_ASSIGNMENT" |
     * "GROUP_READ" |
     * "GROUP_UPDATE_CONFIG" |
     * "LISTS_READ" |
     * "LISTS_UPDATE" |
     * "LISTS_DELETE" |
     * "LOGTEST_RUN" |
     * "MANAGER_READ_API_CONFIG" |
     * "MANAGER_READ" |
     * "MANAGER_RESTART" |
     * "MANAGER_UPDATE_CONFIG" |
     * "MITRE_READ" |
     * "ROOTCHECK_CLEAR" |
     * "ROOTCHECK_READ" |
     * "ROOTCHECK_RUN" |
     * "RULES_READ" |
     * "RULES_UPDATE" |
     * "RULES_DELETE" |
     * "SCA_READ" |
     * "SECURITY_CREATE_USER" |
     * "SECURITY_CREATE" |
     * "SECURITY_DELETE" |
     * "SECURITY_EDIT_RUN_AS" |
     * "SECURITY_READ_CONFIG" |
     * "SECURITY_READ" |
     * "SECURITY_REVOKE" |
     * "SECURITY_UPDATE_CONFIG" |
     * "SECURITY_UPDATE" |
     * "SYSCHECK_CLEAR" |
     * "SYSCHECK_READ" |
     * "SYSCHECK_RUN" |
     * "SYSCOLLECTOR_READ" |
     * "TASK_STATUS" |
     * "VULNERABILITY_READ"
     * } action
     * @returns {string}
     */
    const getAction = (action) => {
      const actionDict = {
        ACTIVE_RESPONSE_COMMAND: 'active-response:command',
        AGENT_CREATE: 'agent:create',
        AGENT_DELETE: 'agent:delete',
        AGENT_MODIFY_GROUP: 'agent:modify_group',
        AGENT_READ: 'agent:read',
        AGENT_RESTART: 'agent:restart',
        AGENT_UPGRADE: 'agent:upgrade',
        CISCAT_READ: 'ciscat:read',
        CLUSTER_READ_API_CONFIG: 'cluster:read_api_config',
        CLUSTER_READ: 'cluster:read',
        CLUSTER_RESTART: 'cluster:restart',
        CLUSTER_STATUS: 'cluster:status',
        CLUSTER_UPDATE_CONFIG: 'cluster:update_config',
        DECODERS_READ: 'decoders:read',
        DECODERS_UPDATE: 'decoders:update',
        DECODERS_DELETE: 'decoders:delete',
        GROUP_CREATE: 'group:create',
        GROUP_DELETE: 'group:delete',
        GROUP_MODIFY_ASSIGNMENT: 'group:modify_assignments',
        GROUP_READ: 'group:read',
        GROUP_UPDATE_CONFIG: 'group:update_config',
        LISTS_READ: 'lists:read',
        LISTS_UPDATE: 'lists:update',
        LISTS_DELETE: 'lists:delete',
        LOGTEST_RUN: 'logtest:run',
        MANAGER_READ_API_CONFIG: 'manager:read_api_config',
        MANAGER_READ: 'manager:read',
        MANAGER_RESTART: 'manager:restart',
        MANAGER_UPDATE_CONFIG: 'manager:update_config',
        MITRE_READ: 'mitre:read',
        ROOTCHECK_CLEAR: 'rootcheck:clear',
        ROOTCHECK_READ: 'rootcheck:read',
        ROOTCHECK_RUN: 'rootcheck:run',
        RULES_READ: 'rules:read',
        RULES_UPDATE: 'rules:update',
        RULES_DELETE: 'rules:delete',
        SCA_READ: 'sca:read',
        SECURITY_CREATE_USER: 'security:create_user',
        SECURITY_CREATE: 'security:create',
        SECURITY_DELETE: 'security:delete',
        SECURITY_EDIT_RUN_AS: 'security:edit_run_as',
        SECURITY_READ_CONFIG: 'security:read_config',
        SECURITY_READ: 'security:read',
        SECURITY_REVOKE: 'security:revoke',
        SECURITY_UPDATE_CONFIG: 'security:update_config',
        SECURITY_UPDATE: 'security:update',
        SYSCHECK_CLEAR: 'syscheck:clear',
        SYSCHECK_READ: 'syscheck:read',
        SYSCHECK_RUN: 'syscheck:run',
        SYSCOLLECTOR_READ: 'syscollector:read',
        TASK_STATUS: 'task:status',
        VULNERABILITY_READ: 'vulnerability:read',
      }
      if (!(action in actionDict)) {
        throw 'Invalid action'
      }
      return actionDict[action]
    }

    /**
     * Generates an object from an action with the resources used by that
     * action and a method to construct a requirements object for that action
     * @param {
     * "ACTIVE_RESPONSE_COMMAND" |
     * "AGENT_CREATE" |
     * "AGENT_DELETE" |
     * "AGENT_MODIFY_GROUP" |
     * "AGENT_READ" |
     * "AGENT_RESTART" |
     * "AGENT_UPGRADE" |
     * "CISCAT_READ" |
     * "CLUSTER_READ_API_CONFIG" |
     * "CLUSTER_READ" |
     * "CLUSTER_RESTART" |
     * "CLUSTER_STATUS" |
     * "CLUSTER_UPDATE_CONFIG" |
     * "DECODERS_READ" |
     * "DECODERS_UPDATE" |
     * "DECODERS_DELETE" |
     * "GROUP_CREATE" |
     * "GROUP_DELETE" |
     * "GROUP_MODIFY_ASSIGNMENT" |
     * "GROUP_READ" |
     * "GROUP_UPDATE_CONFIG" |
     * "LISTS_READ" |
     * "LISTS_UPDATE" |
     * "LISTS_DELETE" |
     * "LOGTEST_RUN" |
     * "MANAGER_READ_API_CONFIG" |
     * "MANAGER_READ" |
     * "MANAGER_RESTART" |
     * "MANAGER_UPDATE_CONFIG" |
     * "MITRE_READ" |
     * "ROOTCHECK_CLEAR" |
     * "ROOTCHECK_READ" |
     * "ROOTCHECK_RUN" |
     * "RULES_READ" |
     * "RULES_UPDATE" |
     * "RULES_DELETE" |
     * "SCA_READ" |
     * "SECURITY_CREATE_USER" |
     * "SECURITY_CREATE" |
     * "SECURITY_DELETE_POLICY" |
     * "SECURITY_DELETE_ROLE" |
     * "SECURITY_DELETE_POLICY_FROM_ROLE" |
     * "SECURITY_DELETE_RULE_FROM_ROLE" |
     * "SECURITY_DELETE_RULE" |
     * "SECURITY_DELETE_USER" |
     * "SECURITY_DELETE_RULE_FROM_USER" |
     * "SECURITY_EDIT_RUN_AS" |
     * "SECURITY_READ_CONFIG" |
     * "SECURITY_READ" |
     * "SECURITY_REVOKE" |
     * "SECURITY_UPDATE_CONFIG" |
     * "SECURITY_UPDATE_POLICIES_IN_ROLE" |
     * "SECURITY_UPDATE_RULES_IN_ROLE" |
     * "SECURITY_UPDATE_ROLES_IN_USER" |
     * "SECURITY_UPDATE_POLICY" |
     * "SECURITY_UPDATE_ROLE" |
     * "SECURITY_UPDATE_RULE" |
     * "SECURITY_UPDATE_USER" |
     * "SYSCHECK_CLEAR" |
     * "SYSCHECK_READ" |
     * "SYSCHECK_RUN" |
     * "SYSCOLLECTOR_READ" |
     * "TASK_STATUS" |
     * "VULNERABILITY_READ"
     * } actionKey
     * @returns {}
     */
    const generateRequirementFactory = (actionKey) => {
      //Dictionary of possible resource keys to be used with each action
      const actionResourcesDict = {
        ACTIVE_RESPONSE_COMMAND: {
          resources: ['AGENT_ID', 'AGENT_GROUP'],
          action: 'ACTIVE_RESPONSE_COMMAND',
        },
        AGENT_CREATE: { resources: ['RESOURCELESS'], action: 'AGENT_CREATE' },
        AGENT_DELETE: {
          resources: ['AGENT_ID', 'AGENT_GROUP'],
          action: 'AGENT_DELETE',
        },
        AGENT_MODIFY_GROUP: {
          resources: ['AGENT_ID', 'AGENT_GROUP'],
          action: 'AGENT_MODIFY_GROUP',
        },
        AGENT_READ: {
          resources: ['AGENT_ID', 'AGENT_GROUP'],
          action: 'AGENT_READ',
        },
        AGENT_RESTART: {
          resources: ['AGENT_ID', 'AGENT_GROUP'],
          action: 'AGENT_RESTART',
        },
        AGENT_UPGRADE: {
          resources: ['AGENT_ID', 'AGENT_GROUP'],
          action: 'AGENT_UPGRADE',
        },
        CISCAT_READ: {
          resources: ['AGENT_ID', 'AGENT_GROUP'],
          action: 'CISCAT_READ',
        },
        CLUSTER_READ_API_CONFIG: {
          resources: ['NODE_ID'],
          action: 'CLUSTER_READ_API_CONFIG',
        },
        CLUSTER_READ: { resources: ['NODE_ID'], action: 'CLUSTER_READ' },
        CLUSTER_RESTART: { resources: ['NODE_ID'], action: 'CLUSTER_RESTART' },
        CLUSTER_STATUS: {
          resources: ['RESOURCELESS'],
          action: 'CLUSTER_STATUS',
        },
        CLUSTER_UPDATE_CONFIG: {
          resources: ['NODE_ID'],
          action: 'CLUSTER_UPDATE_CONFIG',
        },
        DECODERS_READ: { resources: ['DECODER_FILE'], action: 'DECODERS_READ' },
        DECODERS_UPDATE: {
          resources: ['RESOURCELESS'],
          action: 'DECODERS_UPDATE',
        },
        DECODERS_DELETE: {
          resources: ['DECODER_FILE'],
          action: 'DECODERS_DELETE',
        },
        GROUP_CREATE: { resources: ['RESOURCELESS'], action: 'GROUP_CREATE' },
        GROUP_DELETE: { resources: ['GROUP_ID'], action: 'GROUP_DELETE' },
        GROUP_MODIFY_ASSIGNMENT: {
          resources: ['GROUP_ID'],
          action: 'GROUP_MODIFY_ASSIGNMENT',
        },
        GROUP_READ: { resources: ['GROUP_ID'], action: 'GROUP_READ' },
        GROUP_UPDATE_CONFIG: {
          resources: ['GROUP_ID'],
          action: 'GROUP_UPDATE_CONFIG',
        },
        LISTS_READ: { resources: ['LIST_FILE'], action: 'LISTS_READ' },
        LISTS_UPDATE: { resources: ['RESOURCELESS'], action: 'LISTS_UPDATE' },
        LISTS_DELETE: { resources: ['RESOURCELESS'], action: 'LISTS_DELETE' },
        LOGTEST_RUN: { resources: ['RESOURCELESS'], action: 'LOGTEST_RUN' },
        MANAGER_READ_API_CONFIG: {
          resources: ['RESOURCELESS'],
          action: 'MANAGER_READ_API_CONFIG',
        },
        MANAGER_READ: { resources: ['RESOURCELESS'], action: 'MANAGER_READ' },
        MANAGER_RESTART: {
          resources: ['RESOURCELESS'],
          action: 'MANAGER_RESTART',
        },
        MANAGER_UPDATE_CONFIG: {
          resources: ['RESOURCELESS'],
          action: 'MANAGER_UPDATE_CONFIG',
        },
        MITRE_READ: { resources: ['RESOURCELESS'], action: 'MITRE_READ' },
        ROOTCHECK_CLEAR: {
          resources: ['AGENT_ID', 'AGENT_GROUP'],
          action: 'ROOTCHECK_CLEAR',
        },
        ROOTCHECK_READ: {
          resources: ['AGENT_ID', 'AGENT_GROUP'],
          action: 'ROOTCHECK_READ',
        },
        ROOTCHECK_RUN: {
          resources: ['AGENT_ID', 'AGENT_GROUP'],
          action: 'ROOTCHECK_RUN',
        },
        RULES_READ: { resources: ['RULE_FILE'], action: 'RULES_READ' },
        RULES_UPDATE: { resources: ['RESOURCELESS'], action: 'RULES_UPDATE' },
        RULES_DELETE: { resources: ['RULE_FILE'], action: 'RULES_DELETE' },
        SCA_READ: {
          resources: ['AGENT_ID', 'AGENT_GROUP'],
          action: 'SCA_READ',
        },
        SECURITY_CREATE_USER: {
          resources: ['RESOURCELESS'],
          action: 'SECURITY_CREATE_USER',
        },
        SECURITY_CREATE: {
          resources: ['RESOURCELESS'],
          action: 'SECURITY_CREATE',
        },
        SECURITY_DELETE_POLICY: {
          resources: ['POLICY_ID'],
          action: 'SECURITY_DELETE',
        },
        SECURITY_DELETE_ROLE: {
          resources: ['ROLE_ID'],
          action: 'SECURITY_DELETE',
        },
        SECURITY_DELETE_POLICY_FROM_ROLE: {
          resources: ['POLICY_ID', 'ROLE_ID'],
          action: 'SECURITY_DELETE',
        },
        SECURITY_DELETE_RULE_FROM_ROLE: {
          resources: ['ROLE_ID', 'RULE_ID'],
          action: 'SECURITY_DELETE',
        },
        SECURITY_DELETE_RULE: {
          resources: ['RULE_ID'],
          action: 'SECURITY_DELETE',
        },
        SECURITY_DELETE_USER: {
          resources: ['USER_ID'],
          action: 'SECURITY_DELETE',
        },
        SECURITY_DELETE_RULE_FROM_USER: {
          resources: ['RULE_ID', 'USER_ID'],
          action: 'SECURITY_DELETE',
        },
        SECURITY_EDIT_RUN_AS: {
          resources: ['RESOURCELESS'],
          action: 'SECURITY_EDIT_RUN_AS',
        },
        SECURITY_READ_CONFIG: {
          resources: ['RESOURCELESS'],
          action: 'SECURITY_READ_CONFIG',
        },
        SECURITY_READ: {
          resources: ['POLICY_ID', 'ROLE_ID', 'RULE_ID', 'USER_ID'],
          action: 'SECURITY_READ',
        },
        SECURITY_REVOKE: {
          resources: ['RESOURCELESS'],
          action: 'SECURITY_REVOKE',
        },
        SECURITY_UPDATE_CONFIG: {
          resources: ['RESOURCELESS'],
          action: 'SECURITY_UPDATE_CONFIG',
        },
        SECURITY_UPDATE_POLICIES_IN_ROLE: {
          resources: ['POLICY_ID', 'ROLE_ID'],
          action: 'SECURITY_UPDATE',
        },
        SECURITY_UPDATE_RULES_IN_ROLE: {
          resources: ['ROLE_ID', 'RULE_ID'],
          action: 'SECURITY_UPDATE',
        },
        SECURITY_UPDATE_ROLES_IN_USER: {
          resources: ['ROLE_ID', 'USER_ID'],
          action: 'SECURITY_UPDATE',
        },
        SECURITY_UPDATE_POLICY: {
          resources: ['POLICY_ID'],
          action: 'SECURITY_UPDATE',
        },
        SECURITY_UPDATE_ROLE: {
          resources: ['ROLE_ID'],
          action: 'SECURITY_UPDATE',
        },
        SECURITY_UPDATE_RULE: {
          resources: ['RULE_ID'],
          action: 'SECURITY_UPDATE',
        },
        SECURITY_UPDATE_USER: {
          resources: ['USER_ID'],
          action: 'SECURITY_UPDATE',
        },
        SYSCHECK_CLEAR: {
          resources: ['AGENT_ID', 'AGENT_GROUP'],
          action: 'SYSCHECK_CLEAR',
        },
        SYSCHECK_READ: {
          resources: ['AGENT_ID', 'AGENT_GROUP'],
          action: 'SYSCHECK_READ',
        },
        SYSCHECK_RUN: {
          resources: ['AGENT_ID', 'AGENT_GROUP'],
          action: 'SYSCHECK_RUN',
        },
        SYSCOLLECTOR_READ: {
          resources: ['AGENT_ID', 'AGENT_GROUP'],
          action: 'SYSCOLLECTOR_READ',
        },
        TASK_STATUS: { resources: ['RESOURCELESS'], action: 'TASK_STATUS' },
        VULNERABILITY_READ: {
          resources: ['AGENT_ID', 'AGENT_GROUP'],
          action: 'VULNERABILITY_READ',
        },
      }
      const { action, resources } = actionResourcesDict[actionKey]
      return {
        resourceKeys: resources,
        generateRequirement: (params = []) =>
          generateRequirement(action, resources, params),
      }
    }
    /**
     * This function generates a requirement object that may be used with the validation service.
     * @param {string} action Action key to parse
     * @param {string[]} resources Array of resource keys
     * @param {string[]} params Params to complete the resource keys in same order as resources array. A missing element will yield a '*'
     * @returns
     */
    const generateRequirement = (action, resources, params = []) => {
      const resourcesStr = resources.map((resource, key) =>
        getResource(resource, params[key])
      )
      return { [getAction(action)]: resourcesStr }
    }
    return {
      getAction,
      getResource,
      generateRequirement,
      generateRequirementFactory,
    }
  })
})
