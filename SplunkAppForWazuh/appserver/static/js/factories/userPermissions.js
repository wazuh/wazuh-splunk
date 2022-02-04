define(['./module'], function (app) {
  app.factory('userPermissions', function () {
    let userPermissions = {}
    return {
      get: function () {
        return userPermissions
      },
      set: function (permissions) {
        userPermissions = permissions
      },
    }
  })
})
