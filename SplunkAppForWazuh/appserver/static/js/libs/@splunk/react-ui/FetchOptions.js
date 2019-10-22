module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 150);
/******/ })
/************************************************************************/
/******/ ({

/***/ 150:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: external "core-js/es6/promise"
var promise_ = __webpack_require__(86);

// EXTERNAL MODULE: external "lodash"
var external_lodash_ = __webpack_require__(4);

// EXTERNAL MODULE: ./src/FetchOptions/movies.json
var movies = __webpack_require__(47);

// CONCATENATED MODULE: ./src/FetchOptions/FetchOptions.jsx
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }




/**
 * @param fetchTimeout: number - The number of milliseconds to defer fetching of options.
 * @param fetchMoreTimeout: number - The number of milliseconds to defer fetching additional options.
 * @param numberOfResults: number - Then mumber of options to retrieve per fetch.
 */

var FetchOptions_FetchOptions =
/*#__PURE__*/
function () {
  function FetchOptions() {
    var _this = this;

    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$fetchTimeout = _ref.fetchTimeout,
        fetchTimeout = _ref$fetchTimeout === void 0 ? 600 : _ref$fetchTimeout,
        _ref$fetchMoreTimeout = _ref.fetchMoreTimeout,
        fetchMoreTimeout = _ref$fetchMoreTimeout === void 0 ? 200 : _ref$fetchMoreTimeout,
        _ref$numberOfResults = _ref.numberOfResults,
        numberOfResults = _ref$numberOfResults === void 0 ? 20 : _ref$numberOfResults;

    _classCallCheck(this, FetchOptions);

    _defineProperty(this, "concatAndFilter", function (options, filter) {
      return Object(external_lodash_["concat"])(options, _this.filterResults(filter).slice(_this.firstIndex, _this.lastIndex).map(function (movie) {
        return {
          title: movie.title,
          id: movie.id,
          matchRanges: [{
            start: 0,
            end: filter.length
          }]
        };
      }));
    });

    _defineProperty(this, "filterResults", function (filter) {
      return movies["a" /* movies */].filter(function (movie) {
        return movie.title.toLowerCase().indexOf(filter.toLowerCase()) === 0;
      });
    });

    _defineProperty(this, "getOption", function (value) {
      return Object(external_lodash_["find"])(movies["a" /* movies */], function (movie) {
        return movie.id === value;
      });
    });

    _defineProperty(this, "getSelectedOptions", function (values) {
      return movies["a" /* movies */].filter(function (movie) {
        return !!Object(external_lodash_["find"])(values, function (value) {
          return movie.id === value;
        });
      });
    });

    _defineProperty(this, "getCurrentCount", function () {
      return _this.list.length;
    });

    _defineProperty(this, "getFullCount", function () {
      return _this.filter ? _this.filterResults(_this.filter || '').length : movies["a" /* movies */].length;
    });

    this.fetchTimeout = fetchTimeout;
    this.fetchMoreTimeout = fetchMoreTimeout;
    this.numberOfResults = numberOfResults;
    this.reset();
  }
  /**
   * Fake fetches options from a server.
   * @param filter: string - filter options.
   * @param timeout: number - Number of milliseconds to defer fetch.
   * @return A promise that will resolve based on the fetchTimeout value.
   *         Returns array of new options.
   */


  _createClass(FetchOptions, [{
    key: "fetch",
    value: function fetch() {
      var _this2 = this;

      var filter = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      var timeout = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.fetchTimeout;

      if (!this.list.length || this.filter !== filter) {
        this.reset();
      }

      this.filter = filter; // If currently fetching, add timeout of previous fetch to current timeout

      if (this.fetching) {
        this.currentFetch += timeout;
      } else {
        this.currentFetch = timeout;
      }

      this.fetching = true;
      return new Promise(function (resolve) {
        _this2.timer = setTimeout(function () {
          _this2.fetching = false;
          _this2.list = _this2.concatAndFilter(_this2.currentOptions, _this2.filter);
          clearTimeout(_this2.timer);
          return resolve(_this2.list);
        }, _this2.currentFetch);
      });
    }
    /**
     * Increases searching index for new options and runs fetch.
     * @param currentOptions: array - Append options to given array.
     * @return A promise that will resolve based on the fetchTimeout value.
     *         Returns array of new options appended to currentOptions.
     */

  }, {
    key: "fetchMore",
    value: function fetchMore() {
      var currentOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      this.currentOptions = currentOptions;
      this.firstIndex += this.numberOfResults;
      this.lastIndex += this.numberOfResults;
      return this.fetch(this.filter, this.fetchMoreTimeout);
    }
  }, {
    key: "reset",

    /**
     * Resets firstIndex, LastIndex, currentOptions and list to default values.
     */
    value: function reset() {
      this.firstIndex = 0;
      this.lastIndex = this.numberOfResults;
      this.currentOptions = [];
      this.list = [];
    }
    /**
     * @return Option of given value;
     */

  }]);

  return FetchOptions;
}();


// CONCATENATED MODULE: ./src/FetchOptions/index.js
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "default", function() { return FetchOptions_FetchOptions; });


/***/ }),

/***/ 4:
/***/ (function(module, exports) {

module.exports = require("lodash");

/***/ }),

/***/ 47:
/***/ (function(module) {

module.exports = {"a":[{"id":1,"title":"10 Cloverfield Lane"},{"id":2,"title":"13 Hours: The Secret Soldiers of Benghazi"},{"id":3,"title":"20th Century Women"},{"id":4,"title":"A Monster Calls"},{"id":5,"title":"A Street Cat Named Bob"},{"id":6,"title":"Alice Through the Looking Glass"},{"id":7,"title":"Allied"},{"id":8,"title":"Almost Christmas"},{"id":9,"title":"American Pastoral"},{"id":10,"title":"Arrival"},{"id":11,"title":"Assassin's Creed"},{"id":12,"title":"Bad Moms"},{"id":13,"title":"Bad Santa 2"},{"id":14,"title":"Barbershop: The Next Cut"},{"id":15,"title":"Batman v Superman: Dawn of Justice"},{"id":16,"title":"Batman: The Killing Joke"},{"id":17,"title":"Ben-Hur"},{"id":18,"title":"Billy Lynn's Long Halftime Walk"},{"id":19,"title":"Blair Witch"},{"id":20,"title":"Bleed for This"},{"id":21,"title":"Bobby Sands: 66 Days"},{"id":22,"title":"Boo! A Madea Halloween"},{"id":23,"title":"Boonie Bears III"},{"id":24,"title":"Bridget Jones's Baby"},{"id":25,"title":"Café Society"},{"id":26,"title":"Captain America: Civil War"},{"id":27,"title":"Central Intelligence"},{"id":28,"title":"Collateral Beauty"},{"id":29,"title":"Criminal"},{"id":30,"title":"Dad's Army"},{"id":31,"title":"Deadpool"},{"id":32,"title":"Deepwater Horizon"},{"id":33,"title":"Demolition"},{"id":34,"title":"Dirty Grandpa"},{"id":35,"title":"Doctor Strange"},{"id":36,"title":"Don't Breathe"},{"id":37,"title":"Eddie the Eagle"},{"id":38,"title":"Elvis & Nixon"},{"id":39,"title":"Everybody Wants Some!!"},{"id":40,"title":"Fantastic Beasts and Where to Find Them"},{"id":41,"title":"Fences"},{"id":42,"title":"Fifty Shades of Black"},{"id":43,"title":"Finding Dory"},{"id":44,"title":"Florence Foster Jenkins"},{"id":45,"title":"Free State of Jones"},{"id":46,"title":"Genius"},{"id":47,"title":"Ghostbusters"},{"id":48,"title":"God's Not Dead 2"},{"id":49,"title":"Gods of Egypt"},{"id":50,"title":"Gold"},{"id":51,"title":"Green Room"},{"id":52,"title":"Grimsby"},{"id":53,"title":"Hacksaw Ridge"},{"id":54,"title":"Hail, Caesar!"},{"id":55,"title":"Hands of Stone"},{"id":56,"title":"Hardcore Henry"},{"id":57,"title":"Hell or High Water"},{"id":58,"title":"Hidden Figures"},{"id":59,"title":"Hillsong: Let Hope Rise"},{"id":60,"title":"How to Be Single"},{"id":61,"title":"I'm Not Ashamed"},{"id":62,"title":"Ice Age: Collision Course"},{"id":63,"title":"Incarnate"},{"id":64,"title":"Independence Day: Resurgence"},{"id":65,"title":"Inferno"},{"id":66,"title":"Jack Reacher: Never Go Back"},{"id":67,"title":"Jane Got a Gun"},{"id":68,"title":"Jason Bourne"},{"id":69,"title":"Keanu"},{"id":70,"title":"Keeping Up with the Joneses"},{"id":71,"title":"Kevin Hart: What Now?"},{"id":72,"title":"Knight of Cups"},{"id":73,"title":"Kubo and the Two Strings"},{"id":74,"title":"Kung Fu Panda 3"},{"id":75,"title":"La La Land"},{"id":76,"title":"Last Days in the Desert"},{"id":77,"title":"Lazer Team"},{"id":78,"title":"Lights Out"},{"id":79,"title":"Lion"},{"id":80,"title":"Live by Night"},{"id":81,"title":"London Has Fallen"},{"id":82,"title":"Loving"},{"id":83,"title":"Maggie's Plan"},{"id":84,"title":"Man Down"},{"id":85,"title":"Manchester by the Sea"},{"id":86,"title":"Masterminds"},{"id":87,"title":"Max Steel"},{"id":88,"title":"Me Before You"},{"id":89,"title":"Mechanic: Resurrection"},{"id":90,"title":"Meet the Blacks"},{"id":91,"title":"Middle School: The Worst Years of My Life"},{"id":92,"title":"Midnight Special"},{"id":93,"title":"Mike and Dave Need Wedding Dates"},{"id":94,"title":"Miracles from Heaven"},{"id":95,"title":"Misconduct"},{"id":96,"title":"Miss Peregrine's Home for Peculiar Children"},{"id":97,"title":"Miss Sloane"},{"id":98,"title":"Moana"},{"id":99,"title":"Money Monster"},{"id":100,"title":"Monster Hunt"},{"id":101,"title":"Moonlight"},{"id":102,"title":"Morgan"},{"id":103,"title":"Mother's Day"},{"id":104,"title":"My Big Fat Greek Wedding 2"},{"id":105,"title":"Neighbors 2: Sorority Rising"},{"id":106,"title":"Nerdland"},{"id":107,"title":"Nerve"},{"id":108,"title":"Nine Lives"},{"id":109,"title":"Nocturnal Animals"},{"id":110,"title":"Norm of the North"},{"id":111,"title":"Now You See Me 2"},{"id":112,"title":"Office Christmas Party"},{"id":113,"title":"Ouija: Origin of Evil"},{"id":114,"title":"Passengers"},{"id":115,"title":"Patriots Day"},{"id":116,"title":"Pete's Dragon"},{"id":117,"title":"Popstar: Never Stop Never Stopping"},{"id":118,"title":"Pride and Prejudice and Zombies"},{"id":119,"title":"Queen of Katwe"},{"id":120,"title":"Race"},{"id":121,"title":"Ratchet & Clank"},{"id":122,"title":"Ride Along 2"},{"id":123,"title":"Risen"},{"id":124,"title":"Rogue One"},{"id":125,"title":"Rules Don't Apply"},{"id":126,"title":"Sausage Party"},{"id":127,"title":"Shut In"},{"id":128,"title":"Silence"},{"id":129,"title":"Sing"},{"id":130,"title":"Snowden"},{"id":131,"title":"Solace"},{"id":132,"title":"Star Trek Beyond"},{"id":133,"title":"Storks"},{"id":134,"title":"Suicide Squad"},{"id":135,"title":"Sully"},{"id":136,"title":"Teenage Mutant Ninja Turtles: Out of the Shadows"},{"id":137,"title":"The 5th Wave"},{"id":138,"title":"The Accountant"},{"id":139,"title":"The Angry Birds Movie"},{"id":140,"title":"The BFG"},{"id":141,"title":"The Birth of a Nation"},{"id":142,"title":"The Boss"},{"id":143,"title":"The Boy"},{"id":144,"title":"The Bronze"},{"id":145,"title":"The Choice"},{"id":146,"title":"The Comedian"},{"id":147,"title":"The Conjuring 2"},{"id":148,"title":"The Darkness"},{"id":149,"title":"The Disappointments Room"},{"id":150,"title":"The Divergent Series: Allegiant"},{"id":151,"title":"The Edge of Seventeen"},{"id":152,"title":"The Finest Hours"},{"id":153,"title":"The Forest"},{"id":154,"title":"The Founder"},{"id":155,"title":"The Girl on the Train"},{"id":156,"title":"The Huntsman: Winter's War"},{"id":157,"title":"The Infiltrator"},{"id":158,"title":"The Jungle Book"},{"id":159,"title":"The Legend of Tarzan"},{"id":160,"title":"The Light Between Oceans"},{"id":161,"title":"The Magnificent Seven"},{"id":162,"title":"The Masked Saint"},{"id":163,"title":"The Mermaid"},{"id":164,"title":"The Monkey King 2"},{"id":165,"title":"The Neon Demon"},{"id":166,"title":"The Nice Guys"},{"id":167,"title":"The Other Side of the Door"},{"id":168,"title":"The Perfect Match"},{"id":169,"title":"The Purge: Election Year"},{"id":170,"title":"The Secret Life of Pets"},{"id":171,"title":"The Shallows"},{"id":172,"title":"The Witch"},{"id":173,"title":"The Young Messiah"},{"id":174,"title":"They're Watching"},{"id":175,"title":"Trolls"},{"id":176,"title":"Voyage of Time"},{"id":177,"title":"War Dogs"},{"id":178,"title":"Warcraft"},{"id":179,"title":"When the Bough Breaks"},{"id":180,"title":"Whiskey Tango Foxtrot"},{"id":181,"title":"Why Him?"},{"id":182,"title":"X-Men: Apocalypse"},{"id":183,"title":"Yoga Hosers"},{"id":184,"title":"Your Name"},{"id":185,"title":"Zoolander 2"},{"id":186,"title":"Zootopia"}]};

/***/ }),

/***/ 86:
/***/ (function(module, exports) {

module.exports = require("core-js/es6/promise");

/***/ })

/******/ });