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
                RESOURCELESS: '*:*',
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
        const getAction = action => {
            if (!(action in actionDict)) {
                throw 'Invalid action'
            }
            return actionDict[action]
        }

        //Dictionary of possible resource keys to be used with each action
        const actionResourcesDict = {
            ACTIVE_RESPONSE_COMMAND: ['AGENT_ID', 'AGENT_GROUP'],
            AGENT_CREATE: ['RESOURCELESS'],
            AGENT_DELETE: ['AGENT_ID', 'AGENT_GROUP'],
            AGENT_MODIFY_GROUP: ['AGENT_ID', 'AGENT_GROUP'],
            AGENT_READ: ['AGENT_ID', 'AGENT_GROUP'],
            AGENT_RESTART: ['AGENT_ID', 'AGENT_GROUP'],
            AGENT_UPGRADE: ['AGENT_ID', 'AGENT_GROUP'],
            CISCAT_READ: ['AGENT_ID', 'AGENT_GROUP'],
            CLUSTER_READ_API_CONFIG: ['NODE_ID'],
            CLUSTER_READ: ['NODE_ID'],
            CLUSTER_RESTART: ['NODE_ID'],
            CLUSTER_STATUS: ['RESOURCELESS'],
            DECODERS_READ: ['DECODER_FILE'],
            DECODERS_UPDATE: ['RESOURCELESS'],
            DECODERS_DELETE: ['DECODER_FILE'],
            GROUP_CREATE: ['RESOURCELESS'],
            GROUP_DELETE: ['GROUP_ID'],
            GROUP_MODIFY_ASSIGNMENT: ['GROUP_ID'],
            GROUP_READ: ['GROUP_ID'],
            GROUP_UPDATE_CONFIG: ['GROUP_ID'],
            LISTS_READ: ['LIST_FILE'],
            LISTS_UPDATE: ['RESOURCELESS'],
            LISTS_DELETE: ['RESOURCELESS'],
            LOGTEST_RUN: ['RESOURCELESS'],
            MANAGER_READ_API_CONFIG: ['RESOURCELESS'],
            MANAGER_READ: ['RESOURCELESS'],
            MANAGER_RESTART: ['RESOURCELESS'],
            MANAGER_UPDATE_CONFIG: ['RESOURCELESS'],
            MITRE_READ: ['RESOURCELESS'],
            ROOTCHECK_CLEAR: ['AGENT_ID', 'AGENT_GROUP'],
            ROOTCHECK_READ: ['AGENT_ID', 'AGENT_GROUP'],
            ROOTCHECK_RUN: ['AGENT_ID', 'AGENT_GROUP'],
            RULES_READ: ['RULE_FILE'],
            RULES_UPDATE: ['RESOURCELESS'],
            RULES_DELETE: ['RULE_FILE'],
            SCA_READ: ['AGENT_ID', 'AGENT_GROUP'],
            SECURITY_CREATE_USER: ['RESOURCELESS'],
            SECURITY_CREATE: ['RESOURCELESS'],
            SECURITY_DELETE: ['POLICY_ID', 'ROLE_ID', 'RULE_ID', 'USER_ID'],
            SECURITY_EDIT_RUN_AS: ['RESOURCELESS'],
            SECURITY_READ_CONFIG: ['RESOURCELESS'],
            SECURITY_READ: ['POLICY_ID', 'ROLE_ID', 'RULE_ID', 'USER_ID'],
            SECURITY_REVOKE: ['RESOURCELESS'],
            SECURITY_UPDATE_CONFIG: ['RESOURCELESS'],
            SECURITY_UPDATE: ['POLICY_ID', 'ROLE_ID', 'RULE_ID', 'USER_ID'],
            SYSCHECK_CLEAR: ['AGENT_ID', 'AGENT_GROUP'],
            SYSCHECK_READ: ['AGENT_ID', 'AGENT_GROUP'],
            SYSCHECK_RUN: ['AGENT_ID', 'AGENT_GROUP'],
            SYSCOLLECTOR_READ: ['AGENT_ID', 'AGENT_GROUP'],
            TASK_STATUS: ['RESOURCELESS'],
            VULNERABILITY_READ: ['AGENT_ID', 'AGENT_GROUP'],
        }
        /**
         * Returns a valid resource key
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
        const getActionResourceKeys = action => {
            if (!(action in actionResourcesDict)) {
                throw 'Invalid action'
            }
            return actionResourcesDict[action]
        }
        return {
            getAction,
            getResource,
            getActionResourceKeys
        }
    })
})