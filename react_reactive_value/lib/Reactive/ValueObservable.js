'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ValueObservable = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _rxjs = require('rxjs');

var _rxjs2 = _interopRequireDefault(_rxjs);

var _Observable2 = require('./Observable');

var _Subscription = require('./Subscription');

var _Utils = require('./Utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ValueObservable = exports.ValueObservable = function (_Observable) {
    _inherits(ValueObservable, _Observable);

    function ValueObservable() {
        _classCallCheck(this, ValueObservable);

        return _possibleConstructorReturn(this, (ValueObservable.__proto__ || Object.getPrototypeOf(ValueObservable)).apply(this, arguments));
    }

    _createClass(ValueObservable, [{
        key: 'debounceTime',
        value: function debounceTime(time) {
            var newObserver = this._data.debounceTime(time).merge(this._data.take(1)).distinctUntilChanged();
            return ValueObservable._createValueObservable(newObserver);
        }
    }, {
        key: 'distinctUntilChanged',
        value: function distinctUntilChanged(compare) {
            var newObserver = this._data.distinctUntilChanged(compare);
            return ValueObservable._createValueObservable(newObserver);
        }
    }, {
        key: 'map',
        value: function map(mapper) {
            var newObserver = this._data.map(mapper);
            return ValueObservable._createValueObservable(newObserver);
        }
    }, {
        key: 'mapTo',
        value: function mapTo(value) {
            var newObserver = this._data.mapTo(value);
            return ValueObservable._createValueObservable(newObserver);
        }
    }, {
        key: 'switchMap',
        value: function switchMap(switchFn) {
            var newObserver = this._data.switchMap(function (value) {
                return switchFn(value)._data;
            });
            return ValueObservable._createValueObservable(newObserver);
        }
    }, {
        key: 'do',
        value: function _do(doFn) {
            var newObserver = this._data.do(doFn);
            return ValueObservable._createValueObservable(newObserver);
        }
    }, {
        key: 'withLatestFrom',
        value: function withLatestFrom(b) {
            var z = this._data.withLatestFrom(b._data);
            return ValueObservable._createValueObservable(z);
        }
    }, {
        key: 'withLatestFrom2',
        value: function withLatestFrom2(b, c) {
            //$FlowFixMe
            var z = this._data.withLatestFrom(b._data, c._data);
            return ValueObservable._createValueObservable(z);
        }
    }, {
        key: 'withLatestFrom3',
        value: function withLatestFrom3(b, c, d) {
            //$FlowFixMe
            var z = this._data.withLatestFrom(b._data, c._data, d._data);
            return ValueObservable._createValueObservable(z);
        }
    }], [{
        key: 'create',
        value: function create(initValue, createFn) {
            var subject = new _rxjs2.default.BehaviorSubject(initValue);

            var newObservable = _rxjs2.default.Observable.create(function (observer) {
                var unsubTarget = createFn(function (data) {
                    subject.next(data);
                });

                var sub = (0, _Utils.subscribeTo)(subject, observer, null, true);

                return function () {
                    sub.unsubscribe();
                    unsubTarget();
                };
            });

            return this._createValueObservable(newObservable);
        }
    }, {
        key: 'createFromValue',
        value: function createFromValue(createInitValue) {
            var newObservable = _rxjs2.default.Observable.create(function (observer) {
                var _createInitValue = createInitValue(),
                    _createInitValue2 = _slicedToArray(_createInitValue, 2),
                    initValue = _createInitValue2[0],
                    fnDisconnect = _createInitValue2[1];

                observer.next(initValue);
                return fnDisconnect;
            });

            return ValueObservable._createValueObservable(newObservable);
        }
    }, {
        key: '_createValueObservable',
        value: function _createValueObservable(target) {
            var result = Object.create(ValueObservable.prototype);
            result._data = (0, _Utils.createValueObservable)(target);
            return result;
        }
    }, {
        key: 'scan',
        value: function scan(command, initState, reducer) {
            var newObserver = command._data.scan(reducer, initState);
            return ValueObservable._createFromObserver(initState, newObserver);
        }
    }, {
        key: '_createFromObserver',
        value: function _createFromObserver(initValue, from) {
            var subject = new _rxjs2.default.BehaviorSubject(initValue);
            var unsubTarget = from.subscribe(subject);

            var inst = _rxjs2.default.Observable.create(function (observer) {
                var sub = (0, _Utils.subscribeTo)(subject, observer, null, true);

                return function () {
                    sub.unsubscribe();
                };
            });

            return [ValueObservable._createValueObservable(inst), function () {
                unsubTarget.unsubscribe();
            }];
        }
    }, {
        key: 'observableWithLatestFrom',
        value: function observableWithLatestFrom(a, b) {
            var newObserver = a._data.withLatestFrom(b._data);
            return _Observable2.Observable._create(newObserver);
        }
    }, {
        key: 'observableWithLatestFrom2',
        value: function observableWithLatestFrom2(a, b, c) {
            //$FlowFixMe
            var z = a._data.withLatestFrom(b._data, c._data);
            return _Observable2.Observable._create(z);
        }
    }, {
        key: 'observableWithLatestFrom3',
        value: function observableWithLatestFrom3(a, b, c, d) {
            //$FlowFixMe
            var z = a._data.withLatestFrom(b._data, c._data, d._data);
            return _Observable2.Observable._create(z);
        }
    }, {
        key: 'of',
        value: function of(value) {
            var newObserver = _rxjs2.default.Observable.of(value);
            return ValueObservable._createValueObservable(newObserver);
        }
    }, {
        key: 'combineLatest',
        value: function combineLatest(a, b, combine) {
            var z = _rxjs2.default.Observable.combineLatest(a._data, b._data, combine);
            return ValueObservable._createValueObservable(z);
        }
    }, {
        key: 'combineLatestTupleArr',
        value: function combineLatestTupleArr(k) {
            var inner = k.map(function (item) {
                return item._data;
            });
            //$FlowFixMe
            var z = _rxjs2.default.Observable.combineLatest(inner);
            return ValueObservable._createValueObservable(z);
        }
    }, {
        key: 'combineLatestTuple',
        value: function combineLatestTuple(a, b) {
            var z = _rxjs2.default.Observable.combineLatest(a._data, b._data);
            return ValueObservable._createValueObservable(z);
        }
    }, {
        key: 'combineLatest3',
        value: function combineLatest3(a, b, c, combine) {
            var z = _rxjs2.default.Observable.combineLatest(a._data, b._data, c._data, combine);
            return ValueObservable._createValueObservable(z);
        }
    }, {
        key: 'combineLatest4',
        value: function combineLatest4(a, b, c, d, combine) {
            var z = _rxjs2.default.Observable.combineLatest(a._data, b._data, c._data, d._data, combine);
            return ValueObservable._createValueObservable(z);
        }
    }, {
        key: 'combineLatest5',
        value: function combineLatest5(a, b, c, d, e, combine) {
            var z = _rxjs2.default.Observable.combineLatest(a._data, b._data, c._data, d._data, e._data, combine);
            return ValueObservable._createValueObservable(z);
        }
    }]);

    return ValueObservable;
}(_Observable2.Observable);