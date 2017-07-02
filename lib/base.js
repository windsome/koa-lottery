'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _debug2 = require('debug');

var _debug3 = _interopRequireDefault(_debug2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var debug = (0, _debug3.default)('app:server:lottery:base');

var Base = function () {
    function Base() {
        (0, _classCallCheck3.default)(this, Base);
    }

    (0, _createClass3.default)(Base, [{
        key: '_request',
        value: function _request(url) {
            var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

            //debug ("_request", url, opts);
            return fetch(url, (0, _extends3.default)({}, opts, { credentials: 'include' })).then(function (data) {
                return data.json();
            }).then(function (retobj) {
                if (!retobj) {
                    throw new Error("error! get null from " + url);
                }
                return retobj;
            });
        }
    }, {
        key: 'get',
        value: function get(url) {
            var opts = {
                //dataType: 'json',
                method: 'GET',
                headers: {
                    'Host': 'kaijiang.zhcw.com',
                    'Referer': 'http://www.zhcw.com/kj/xndg/cq/ssc/index.shtml',
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            };
            return this._request(url, opts);
        }
    }, {
        key: 'post',
        value: function post(url, data) {
            var opts = {
                //dataType: 'json',
                method: 'POST',
                body: (0, _stringify2.default)(data),
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            };
            return this._request(url, opts);
        }
    }]);
    return Base;
}();

exports.default = Base;