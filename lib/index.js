'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _class;

var _debug2 = require('debug');

var _debug3 = _interopRequireDefault(_debug2);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _autobindDecorator = require('autobind-decorator');

var _autobindDecorator2 = _interopRequireDefault(_autobindDecorator);

var _cqssc = require('./cqssc');

var _cqssc2 = _interopRequireDefault(_cqssc);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var debug = (0, _debug3.default)('app:server:lottery:index');

var Lottery = (0, _autobindDecorator2.default)(_class = function () {
    function Lottery() {
        (0, _classCallCheck3.default)(this, Lottery);
    }

    (0, _createClass3.default)(Lottery, [{
        key: 'init',
        value: function init() {
            this.cqssc = new _cqssc2.default();
            this.database = {
                cqssc: { init: true }
            };
            this.eventLoop();
        }
    }, {
        key: 'eventLoop',
        value: function eventLoop() {
            var _this = this;

            this.cqssc.getInfo().then(function (ret) {
                debug("[" + new Date().toLocaleString() + "]", ret);
                if (_this.database.cqssc.init) {
                    //debug ("warning! ignore first result of cqssc!");
                    //this.database.cqssc.init = false;
                    debug("[" + new Date().toLocaleString() + "], not init! ignored! ");
                } else {
                    _this.database.cqssc['result'] = ret;
                }
                return new _promise2.default(function (resolve, reject) {
                    setTimeout(function () {
                        _this.cqssc.getNextTime().then(function (ret) {
                            resolve(ret);
                        }).catch(function (error) {
                            reject(error);
                        });
                    }, 60000);
                });
            }).then(function (ret) {
                debug("[" + new Date().toLocaleString() + "]", ret);
                if (_this.database.cqssc.init) {
                    debug("warning! ignore first result of cqssc!");
                    _this.database.cqssc.init = false;
                } else {
                    _this.database.cqssc['result'] = ret;
                }
                var date = (0, _moment2.default)(ret.yMdHms, "YYYY-MM-DD HH:mm:ss").toDate();
                _this.database.cqssc['next'] = date;
                return parseInt(ret.nextTime) + 60000;
            }).catch(function (error) {
                debug("error! getNextTimeLoop: ", error);
                return 60000;
            }).then(function (ret) {
                return setTimeout(function () {
                    _this.eventLoop();
                }, ret);
            });
        }
    }, {
        key: 'getResultAfterTime',
        value: function () {
            var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(checkDate) {
                var name = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'cqssc';
                var lotteryTpye, lottery, result, lastDate;
                return _regenerator2.default.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                if (checkDate) {
                                    _context.next = 3;
                                    break;
                                }

                                debug("error! should supply checkDate!");
                                //return {errcode: -1, message: 'should supply checkDate!'};
                                return _context.abrupt('return', null);

                            case 3:
                                checkDate = new Date(checkDate);
                                lotteryTpye = 'cqssc';
                                lottery = this.database[lotteryTpye];
                                result = lottery && lottery.result;

                                if (result) {
                                    _context.next = 10;
                                    break;
                                }

                                debug("error! none result!");
                                //return {errcode: -2, message: 'none result!'};
                                return _context.abrupt('return', null);

                            case 10:
                                lastDate = result.date;

                                if (!(checkDate < lastDate)) {
                                    _context.next = 14;
                                    break;
                                }

                                debug("get result:", result);
                                return _context.abrupt('return', result.kjZNum);

                            case 14:
                                return _context.abrupt('return', null);

                            case 15:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function getResultAfterTime(_x) {
                return _ref.apply(this, arguments);
            }

            return getResultAfterTime;
        }()
    }, {
        key: 'getResultCqssc',
        value: function () {
            var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(ctx, next) {
                var ret, lottery, result;
                return _regenerator2.default.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                ret = {};
                                lottery = this.database['cqssc'];
                                result = lottery && lottery.result;

                                if (!result) {
                                    ret = { lottery: result };
                                }
                                ctx.body = ret;

                            case 5:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, this);
            }));

            function getResultCqssc(_x3, _x4) {
                return _ref2.apply(this, arguments);
            }

            return getResultCqssc;
        }()
    }]);
    return Lottery;
}()) || _class;

exports.default = Lottery;