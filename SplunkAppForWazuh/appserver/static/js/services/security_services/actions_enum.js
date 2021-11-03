/**
 * Supported actions over resources (RBAC).
 * @enum {string}
 */
const enumActions = {
  ACTIVE_RESPONSE_COMMAND: 'ACTIVE_RESPONSE_COMMAND',
  AGENT_CREATE: 'AGENT_CREATE',
  AGENT_DELETE: 'AGENT_DELETE',
  AGENT_MODIFY_GROUP: 'AGENT_MODIFY_GROUP',
  AGENT_READ: 'AGENT_READ',
  AGENT_RESTART: 'AGENT_RESTART',
  AGENT_UPGRADE: 'AGENT_UPGRADE',
  CISCAT_READ: 'CISCAT_READ',
  CLUSTER_READ_API_CONFIG: 'CLUSTER_READ_API_CONFIG',
  CLUSTER_READ: 'CLUSTER_READ',
  CLUSTER_RESTART: 'CLUSTER_RESTART',
  CLUSTER_STATUS: 'CLUSTER_STATUS',
  CLUSTER_UPDATE_CONFIG: 'CLUSTER_UPDATE_CONFIG',
  DECODERS_READ: 'DECODERS_READ',
  DECODERS_UPDATE: 'DECODERS_UPDATE',
  DECODERS_DELETE: 'DECODERS_DELETE',
  GROUP_CREATE: 'GROUP_CREATE',
  GROUP_DELETE: 'GROUP_DELETE',
  GROUP_MODIFY_ASSIGNMENT: 'GROUP_MODIFY_ASSIGNMENT',
  GROUP_READ: 'GROUP_READ',
  GROUP_UPDATE_CONFIG: 'GROUP_UPDATE_CONFIG',
  LISTS_READ: 'LISTS_READ',
  LISTS_UPDATE: 'LISTS_UPDATE',
  LISTS_DELETE: 'LISTS_DELETE',
  LOGTEST_RUN: 'LOGTEST_RUN',
  MANAGER_READ_API_CONFIG: 'MANAGER_READ_API_CONFIG',
  MANAGER_READ: 'MANAGER_READ',
  MANAGER_RESTART: 'MANAGER_RESTART',
  MANAGER_UPDATE_CONFIG: 'MANAGER_UPDATE_CONFIG',
  MITRE_READ: 'MITRE_READ',
  ROOTCHECK_CLEAR: 'ROOTCHECK_CLEAR',
  ROOTCHECK_READ: 'ROOTCHECK_READ',
  ROOTCHECK_RUN: 'ROOTCHECK_RUN',
  RULES_READ: 'RULES_READ',
  RULES_UPDATE: 'RULES_UPDATE',
  RULES_DELETE: 'RULES_DELETE',
  SCA_READ: 'SCA_READ',
  SECURITY_CREATE_USER: 'SECURITY_CREATE_USER',
  SECURITY_CREATE: 'SECURITY_CREATE',
  SECURITY_DELETE_POLICY: 'SECURITY_DELETE_POLICY',
  SECURITY_DELETE_ROLE: 'SECURITY_DELETE_ROLE',
  SECURITY_DELETE_POLICY_FROM_ROLE: 'SECURITY_DELETE_POLICY_FROM_ROLE',
  SECURITY_DELETE_RULE_FROM_ROLE: 'SECURITY_DELETE_RULE_FROM_ROLE',
  SECURITY_DELETE_RULE: 'SECURITY_DELETE_RULE',
  SECURITY_DELETE_USER: 'SECURITY_DELETE_USER',
  SECURITY_DELETE_RULE_FROM_USER: 'SECURITY_DELETE_RULE_FROM_USER',
  SECURITY_EDIT_RUN_AS: 'SECURITY_EDIT_RUN_AS',
  SECURITY_READ_CONFIG: 'SECURITY_READ_CONFIG',
  SECURITY_READ: 'SECURITY_READ',
  SECURITY_REVOKE: 'SECURITY_REVOKE',
  SECURITY_UPDATE_CONFIG: 'SECURITY_UPDATE_CONFIG',
  SECURITY_UPDATE_POLICIES_IN_ROLE: 'SECURITY_UPDATE_POLICIES_IN_ROLE',
  SECURITY_UPDATE_RULES_IN_ROLE: 'SECURITY_UPDATE_RULES_IN_ROLE',
  SECURITY_UPDATE_ROLES_IN_USER: 'SECURITY_UPDATE_ROLES_IN_USER',
  SECURITY_UPDATE_POLICY: 'SECURITY_UPDATE_POLICY',
  SECURITY_UPDATE_ROLE: 'SECURITY_UPDATE_ROLE',
  SECURITY_UPDATE_RULE: 'SECURITY_UPDATE_RULE',
  SECURITY_UPDATE_USER: 'SECURITY_UPDATE_USER',
  SYSCHECK_CLEAR: 'SYSCHECK_CLEAR',
  SYSCHECK_READ: 'SYSCHECK_READ',
  SYSCHECK_RUN: 'SYSCHECK_RUN',
  SYSCOLLECTOR_READ: 'SYSCOLLECTOR_READ',
  TASK_STATUS: 'TASK_STATUS',
  VULNERABILITY_READ: 'VULNERABILITY_READ'
}

/**
 * Required actions performed by controllers (RBAC).
 * @enum {string}
 */
const mapActionsControllers = {
  // Agent > Security Configuration Assessment
  'ag-ca': [enumActions.AGENT_READ, enumActions.SCA_READ],
  // Agent > CISCAT
  'ag-ciscat': [enumActions.CISCAT_READ],
  // Agent > File Integrity Monitoring
  'ag-fim': [enumActions.AGENT_READ, enumActions.SYSCHECK_READ],
  // Agent > Security Events
  'ag-general': [
    enumActions.AGENT_READ,
    enumActions.SYSCHECK_READ,
    enumActions.SYSCOLLECTOR_READ,
    enumActions.ROOTCHECK_READ,
  ],
  // Agent > Inventory Data
  'ag-inventory': [
    enumActions.AGENT_READ,
    enumActions.SYSCHECK_READ,
    enumActions.SYSCOLLECTOR_READ
  ],
  // Agent > Vulnerabilities
  'ag-vul': [enumActions.AGENT_READ, enumActions.VULNERABILITY_READ],
  // Agent > Overview
  'agent-overview': [
    enumActions.AGENT_READ,
    enumActions.AGENT_MODIFY_GROUP,
    enumActions.AGENT_RESTART,
    enumActions.GROUP_MODIFY_ASSIGNMENT,
    enumActions.GROUP_READ,
    enumActions.ROOTCHECK_READ,
    enumActions.SYSCHECK_READ],
  'agents': [enumActions.AGENT_READ, enumActions.CLUSTER_READ],
  // Discover
  // 'discover': [enumActions.AGENT_READ],
  // Management > Configuration
  'mg-conf': [enumActions.CLUSTER_READ],
  // Management > Decoders
  'mg-decoders': [
    enumActions.DECODERS_READ,
    enumActions.DECODERS_UPDATE,
    enumActions.DECODERS_DELETE
  ],
  // Management > Configuration > Edit
  'mg-editConfig': [
    enumActions.CLUSTER_RESTART,
    enumActions.CLUSTER_STATUS,
    enumActions.MANAGER_READ,
    enumActions.MANAGER_RESTART,
    enumActions.MANAGER_UPDATE_CONFIG,
    enumActions.CLUSTER_UPDATE_CONFIG
  ],
  // Management > Groups
  'mg-groups': [
    enumActions.AGENT_MODIFY_GROUP,
    enumActions.AGENT_READ,
    enumActions.GROUP_CREATE,
    enumActions.GROUP_MODIFY_ASSIGNMENT,
    enumActions.GROUP_READ
  ],
  // Management > Lists
  'mg-list': [
    enumActions.LISTS_READ,
    enumActions.LISTS_UPDATE,
    enumActions.LISTS_DELETE
  ],
  // Management > Logs
  'mg-logs': [
    enumActions.CLUSTER_STATUS,
    enumActions.MANAGER_READ
  ],
  // Management > Cluster
  'mg-monitoring': [
    enumActions.AGENT_READ,
    enumActions.CLUSTER_READ,
    enumActions.CLUSTER_STATUS
  ],
  // Management > Rules
  'mg-rules': [
    enumActions.RULES_DELETE,
    enumActions.RULES_READ,
    enumActions.RULES_UPDATE
  ],
  // Management > Status
  'mg-status': [
    enumActions.AGENT_READ,
    enumActions.CLUSTER_READ,
    enumActions.CLUSTER_RESTART,
    enumActions.CLUSTER_STATUS,
    enumActions.DECODERS_READ,
    enumActions.MANAGER_RESTART,
    enumActions.MANAGER_READ,
    enumActions.RULES_READ
  ],
  // Overview
  'overview': [enumActions.AGENT_READ],
  'ow-audit': [enumActions.AGENT_READ],
  'ow-ciscat': [enumActions.CISCAT_READ],
  'ow-fim': [enumActions.AGENT_READ],
  'ow-gdpr': [enumActions.AGENT_READ],
  'ow-general': [
    enumActions.AGENT_READ,
    enumActions.ROOTCHECK_READ
  ],
  'ow-hipaa': [enumActions.AGENT_READ],
  'ow-mitre': [enumActions.AGENT_READ],
  'ow-mitre-ids': [enumActions.MITRE_READ],
  'ow-nist': [enumActions.AGENT_READ],
  'ow-os': [enumActions.AGENT_READ],
  'ow-pm': [enumActions.AGENT_READ],
  'ow-virustotal': [enumActions.AGENT_READ],
  'ow-vul': [
    enumActions.AGENT_READ,
    enumActions.VULNERABILITY_READ
  ]
}

/**
 * Export default
 */
define(['../module'], function (app) {
  app.constant(
    'ACTIONS', {
      'ACTIONS_ENUM': enumActions,
      'ACTIONS_MAP': mapActionsControllers
    }
  )
})