'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Subscription = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _rxjs = require('rxjs');

var _rxjs2 = _interopRequireDefault(_rxjs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Subscription = exports.Subscription = function () {
    function Subscription(from) {
        _classCallCheck(this, Subscription);

        this._data = from;
    }

    _createClass(Subscription, [{
        key: 'unsubscribe',
        value: function unsubscribe() {
            this._data.unsubscribe();
        }
    }]);

    return Subscription;
}();