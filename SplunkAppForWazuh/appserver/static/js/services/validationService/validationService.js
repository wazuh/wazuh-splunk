/*
With this service, we want to compare policies and determine whether the 
user policy matches the required policy.

User policies are objects with the same structure returned by the endpoint 
GET /security/users/me/policies

policy = {
    actions_as_keys: {
        resources_as_keys: "allow" | "deny"
    }
    rbac_mode: "black" | "white"
}
with as many actions and resources as needed.

Requirements, then, will have this structure
requirement = {
    actions_as_keys : [
        resources_as_array_elements
    ]
}
*/

/**
 * Checks whether a policy matches a set of requirements.
 * For each action in requirements, and for each resource required in each action,
 * check whether it is described in the permissions and use rbac_mode if it isn't.
 * @param {object} requirements
 * @param {object} policy
 * @returns {boolean} True if all the requirements match an allowed permission.
 */
const validatePermissions = (requirements, policy) => {
  const { rbac_mode, ...permissions } = policy
  const result = Object.keys(requirements).reduce((final, action) => {
    if (action in permissions) {
      const resources = requirements[action]
      const result = resources.reduce((final, resource) => {
        const describedResources = Object.keys(permissions[action])
        const filtered = describedResources.filter((value) =>
          isMatching(resource, value)
        )
        if (filtered.length) {
          // Filtered will likely have a single value, but if it has more,
          // since later entries have priority, we only read the last one.
          return (
            final &&
            permissions[action][filtered[filtered.length - 1]] === 'allow'
          )
        } else {
          return final && rbac_mode === 'black'
        }
      }, true)
      return final && result
    } else {
      return final && rbac_mode === 'black'
    }
  }, true)
  return result
}

/**
 * Checks whether a permission string matches a given requirement string
 * The strings will have a structure like
 *  foo:bar:number
 * or
 *  foo:bar
 * Wildcards for the permission as * are allowed and match any value in its
 * position
 * @param {string} requirement Permissions required
 * @param {string} permission Permissions the user has as returned by
 * GET /security/users/me/policies
 * @returns {boolean}
 */
const isMatching = (requirement, permission) => {
  const reqArr = requirement.split(':')
  const perArr = permission.split(':')

  if (reqArr.length !== perArr.length) {
    return false
  }

  let result = true
  reqArr.forEach((value, index) => {
    if (!(value === '*' || value === perArr[index] || perArr[index] === '*')) {
      result = false
    }
  })

  return result
}

/**
 * This function takes a resource or action defined by a string separated with
 * ':' and returns a nested object with the value of isAllowed at the end
 * @param {string} resource
 * @param {boolean} isAllowed
 * @returns {object}
 */
const resourceToObject = (resource, isAllowed) => {
  const arr = resource.split(':')
  if (arr.length === 1) {
    return { [arr[0]]: isAllowed }
  } else {
    return {
      [arr[0]]: resourceToObject(arr.slice(1, arr.length).join(':'), isAllowed),
    }
  }
}

define(['../module'], function (module) {
  module.service('$validationService', function () {
    return {
      validatePermissions,
      isMatching,
      resourceToObject,
    }
  })
})
