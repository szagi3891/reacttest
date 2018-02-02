'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ValueSubject = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _rxjs = require('rxjs');

var _rxjs2 = _interopRequireDefault(_rxjs);

var _SenderSync = require('./SenderSync');

var _SenderSync2 = _interopRequireDefault(_SenderSync);

var _ValueObservable = require('./ValueObservable');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ValueSubject = exports.ValueSubject = function () {
    function ValueSubject(initValue) {
        _classCallCheck(this, ValueSubject);

        this._data = new _rxjs2.default.BehaviorSubject(initValue);
    }

    _createClass(ValueSubject, [{
        key: 'asObservable',
        value: function asObservable() {
            return _ValueObservable.ValueObservable._createValueObservable(this._data.asObservable());
        }
    }, {
        key: 'next',
        value: function next(value) {
            var _this = this;

            (0, _SenderSync2.default)(function () {
                _this._data.next(value);
            });
        }
    }, {
        key: 'update',
        value: function update(fnUpdate) {
            var _this2 = this;

            (0, _SenderSync2.default)(function () {
                var value = _this2._data.getValue();
                var newValue = fnUpdate(value);
                _this2._data.next(newValue);
            });
        }
    }]);

    return ValueSubject;
}();