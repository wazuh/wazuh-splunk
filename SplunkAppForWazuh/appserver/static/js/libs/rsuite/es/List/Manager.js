import _ from 'lodash';

/*
 * Move manager
 * */
var Manager =
/*#__PURE__*/
function () {
  function Manager() {
    var _this = this;

    this.refs = {};
    this.active = void 0;

    this.setActive = function (payload) {
      return _this.active = payload;
    };

    this.getActive = function () {
      return _this.active;
    };

    this.getIndex = function (collection, ref) {
      return _this.refs[collection].indexOf(ref);
    };

    this.getNodeManagerRef = function (node) {
      return _.flatten(Object.values(_this.refs)).find(function (managerRef) {
        return managerRef.node === node;
      });
    };

    this.getOrderedRefs = function (collection) {
      if (collection === undefined) {
        collection = _this.active ? _this.active.info.collection : null;
      }

      if (collection !== null) {
        var sortedRefs = [].concat(_this.refs[collection]);
        sortedRefs.sort(function (nodeInfo1, nodeInfo2) {
          return nodeInfo1.info.index - nodeInfo2.info.index;
        });
        return sortedRefs;
      }

      return [];
    };
  }

  var _proto = Manager.prototype;

  _proto.add = function add(collection, ref) {
    if (!this.refs[collection]) {
      this.refs[collection] = [];
    }

    this.refs[collection].push(ref);
  };

  _proto.remove = function remove(collection, ref) {
    var index = this.getIndex(collection, ref);

    if (index !== -1 && Array.isArray(this.refs[collection])) {
      this.refs[collection].splice(index, 1);
    }
  };

  return Manager;
}();

export default Manager;