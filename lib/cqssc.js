'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _debug2 = require('debug');

var _debug3 = _interopRequireDefault(_debug2);

var _base = require('./base');

var _base2 = _interopRequireDefault(_base);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var debug = (0, _debug3.default)('app:server:lottery:cqssc');

var Cqssc = function (_Base) {
    (0, _inherits3.default)(Cqssc, _Base);

    function Cqssc() {
        (0, _classCallCheck3.default)(this, Cqssc);

        var _this = (0, _possibleConstructorReturn3.default)(this, (Cqssc.__proto__ || (0, _getPrototypeOf2.default)(Cqssc)).call(this));

        _this.name = '重庆时时彩';
        return _this;
    }

    (0, _createClass3.default)(Cqssc, [{
        key: 'getNextTime',
        value: function getNextTime() {
            // {"yMdHms":"2017-03-16 13:30:00","nextTime":"366708","dayOfWeek":"5"}
            return this.get("http://kaijiang.zhcw.com/czKJNextTime.jsp?czId=574").then(function (retobj) {
                //debug ("getNextTime:", retobj);
                if (!(retobj.yMdHms && retobj.nextTime)) {
                    debug("error! retobj:", retobj);
                    throw new Error("error! no yMdHms or nextTime!");
                }
                //var date = moment(retobj.yMdHms,"YYYY-MM-DD HH:mm:ss").toDate();
                //return {...retobj, date};
                return retobj;
            });
        }
    }, {
        key: 'getInfo',
        value: function getInfo() {
            var count = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;

            // {"572":{"20170316038":{"JNum":"","QNum":"","TOne":"","bonusEight":0,"bonusFive":0,"bonusFour":0,"bonusOne":0,"bonusPool":0,"bonusSeven":0,"bonusSix":0,"bonusThree":0,"bonusTop":0,"bonusTwo":0,"czArea":"","czId":"572","czName":"重庆时时彩","czType":"","description":"","dqName":"","issue":"20170316038","kjDate":"2017-03-16 00:00:00","kjTNum":"","kjZNum":"4 5 9 7 5","nextTime":0,"noteEight":0,"noteFive":0,"noteFour":0,"noteOne":0,"noteSeven":0,"noteSix":0,"noteThree":0,"noteTop":0,"noteTwo":0,"sales":0,"sjNum":"","timeBegin":null,"timeEnd":null,"timeSpan":""}}}
            return this.get("http://kaijiang.zhcw.com/kJCZInfo.jsp?czId=572&issueNum=" + count + "&formatType=jsonMap").then(function (retobj) {
                //debug ("getInfo:", retobj);
                var level1Keys = _lodash2.default.keys(retobj);
                for (var i = 0; i < level1Keys.length; i++) {
                    var rtCzId = level1Keys[i];
                    var l1Obj = retobj[rtCzId];
                    var level2Keys = _lodash2.default.keys(l1Obj);
                    for (var j = 0; j < level2Keys.length; j++) {
                        var issue = level2Keys[j];
                        var l2Obj = l1Obj[issue];
                        return { czId: l2Obj.czId,
                            czName: l2Obj.czName,
                            issue: l2Obj.issue,
                            kjZNum: l2Obj.kjZNum,
                            date: new Date() };
                    }
                }
                throw new Error("error! kJCZInfo not get result!");
            });
        }
    }]);
    return Cqssc;
}(_base2.default);

exports.default = Cqssc;