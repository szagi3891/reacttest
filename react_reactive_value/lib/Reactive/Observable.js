'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Observable = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _rxjs = require('rxjs');

var _rxjs2 = _interopRequireDefault(_rxjs);

var _Subscription = require('./Subscription');

var _Log = require('../Log');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Observable = exports.Observable = function () {
    function Observable(fnCreate) {
        _classCallCheck(this, Observable);

        this._data = _rxjs2.default.Observable.create(function (observerInner) {
            var obs = {
                next: function next(data) {
                    observerInner.next(data);
                }
            };

            return fnCreate(obs);
        });
    }

    _createClass(Observable, [{
        key: 'distinctUntilChanged',
        value: function distinctUntilChanged(compare) {
            var newObserver = this._data.distinctUntilChanged(compare);
            return Observable._create(newObserver);
        }
    }, {
        key: 'map',
        value: function map(mapper) {
            var newObserver = this._data.map(mapper);
            return Observable._create(newObserver);
        }
    }, {
        key: 'switchMapObservable',
        value: function switchMapObservable(switchFn) {
            var newObserver = this._data.switchMap(function (value) {
                return switchFn(value)._data;
            });
            return Observable._create(newObserver);
        }
    }, {
        key: 'mergeMap',
        value: function mergeMap(mapFn) {
            var newObserver = this._data.mergeMap(function (value) {
                return mapFn(value)._data;
            });
            return Observable._create(newObserver);
        }
    }, {
        key: 'subscribe',
        value: function subscribe(onValue) {
            return new _Subscription.Subscription(this._data.subscribe(onValue, function (error) {
                (0, _Log.logError)('Subscription error', error);
            }));
        }
    }, {
        key: 'merge',
        value: function merge(b) {
            var newObserver = _rxjs2.default.Observable.merge(this._data, b._data);
            return Observable._create(newObserver);
        }
    }, {
        key: 'mapTo',
        value: function mapTo(value) {
            var newObserver = this._data.mapTo(value);
            return Observable._create(newObserver);
        }
    }, {
        key: 'do',
        value: function _do(doFn) {
            var newObserver = this._data.do(doFn);
            return Observable._create(newObserver);
        }
    }, {
        key: 'filter',
        value: function filter(filterFn) {
            var newObserver = this._data.filter(filterFn);
            return Observable._create(newObserver);
        }
    }, {
        key: 'take',
        value: function take(count) {
            var z = this._data.take(count);
            return Observable._create(z);
        }
    }], [{
        key: '_create',
        value: function _create(observer) {
            var result = Object.create(Observable.prototype); //eslint-disable-line flowtype/no-weak-types
            result._data = observer;
            return result;
        }
    }, {
        key: 'empty',
        value: function empty() {
            var newObserver = _rxjs2.default.Observable.empty();
            return Observable._create(newObserver);
        }
    }, {
        key: 'fromEvent',
        value: function fromEvent(target, event) {
            //eslint-disable-line flowtype/no-weak-types
            var newObserver = _rxjs2.default.Observable.fromEvent(target, event);
            return Observable._create(newObserver);
        }
    }]);

    return Observable;
}();