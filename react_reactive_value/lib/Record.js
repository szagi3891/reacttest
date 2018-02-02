'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.BaseRecord = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _immutable = require('immutable');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BaseRecord = exports.BaseRecord = function () {
    //eslint-disable-line flowtype/no-weak-types

    function BaseRecord(data) {
        _classCallCheck(this, BaseRecord);

        this._data = (0, _immutable.Map)(data);
    } //eslint-disable-line flowtype/no-weak-types

    _createClass(BaseRecord, [{
        key: 'get',
        value: function get(name) {
            return this._data.get(name);
        }
    }, {
        key: '_create',
        value: function _create(data) {
            //eslint-disable-line flowtype/no-weak-types
            var constructor = this.constructor;
            var result = Object.create(constructor.prototype);
            result._data = data;
            //$FlowFixMe
            return result;
        }
    }, {
        key: 'merge',
        value: function merge(newData) {
            var newInnerData = this._data.merge(newData);

            if ((0, _immutable.is)(this._data, newInnerData)) {
                return this;
            }

            return this._create(newInnerData);
        }
    }, {
        key: 'equals',
        value: function equals(other) {
            return this._data.equals(other._data);
        }
    }, {
        key: 'hashCode',
        value: function hashCode() {
            return this._data.hashCode();
        }
    }]);

    return BaseRecord;
}();