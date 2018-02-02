'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.createValueObservable = exports.createProxyDebug = exports.subscribeTo = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _rxjs = require('rxjs');

var _rxjs2 = _interopRequireDefault(_rxjs);

var _Subscription = require('./Subscription');

var _UtilsHot = require('./UtilsHot');

var _Log = require('../Log');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var hotCounter = new _rxjs2.default.BehaviorSubject(0);

hotCounter.subscribe(function (value) {
    (0, _Log.logInfo)('Hot counter ' + value);
});

var subscribeTo = exports.subscribeTo = function subscribeTo(target, observer, noInitialValueOccursError, emitFirst) {
    var initiation = true;
    var startValueCount = 0;

    var subscribe = target.subscribe(function (value) {
        if (initiation === true) {
            if (emitFirst) {
                observer.next(value);
            }

            startValueCount++;
        } else {
            observer.next(value);
        }
    }, function (err) {
        observer.error(err);
    }, function () {
        observer.complete();
    });

    initiation = false;

    if (noInitialValueOccursError !== null) {
        if (startValueCount !== 1) {
            (0, _Log.logError)('Spodziewano si\u0119 jednej wyemitowanej warto\u015Bci, wyemitowano: ' + startValueCount, noInitialValueOccursError);
        }
    }

    return new _Subscription.Subscription(subscribe);
};

var upgradeCounter = function upgradeCounter(counter, delta) {
    var value = counter.getValue();
    counter.next(value + delta);
};

var createProxyDebug = exports.createProxyDebug = function createProxyDebug(counter, target) {
    return _rxjs2.default.Observable.create(function (observer) {
        //const subscription = subscribeTo(target, observer, null, true);

        var subscription = target.subscribe(function (value) {
            observer.next(value);
        }, function (err) {
            observer.error(err);
        }, function () {
            observer.complete();
        });
        upgradeCounter(counter, 1);

        return function () {
            upgradeCounter(counter, -1);
            subscription.unsubscribe();
        };
    });
};

var createValueObservable = exports.createValueObservable = function createValueObservable(targetCould) {

    var createBy = new Error('No initial value occurs');
    var activeSubscription = new Map();

    var isHot = false;

    var localSubscribeTo = function localSubscribeTo(target, observer, emitFirst) {
        var subscription = subscribeTo(target, observer, createBy, emitFirst);
        activeSubscription.set(observer, subscription);
    };

    var targetHot = (0, _UtilsHot.createHot)(createProxyDebug(hotCounter, targetCould));

    var newObserver = function newObserver(observer) {
        if (isHot) {
            localSubscribeTo(targetHot, observer, true);
        } else {
            if (activeSubscription.size === 0) {

                localSubscribeTo(targetCould, observer, true);
            } else if (activeSubscription.size === 1) {
                isHot = true;

                var oldList = Array.from(activeSubscription);
                activeSubscription = new Map();

                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    for (var _iterator = oldList[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var _step$value = _slicedToArray(_step.value, 2),
                            _observer = _step$value[0],
                            subscription = _step$value[1];

                        localSubscribeTo(targetHot, _observer, false);
                        subscription.unsubscribe();
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return) {
                            _iterator.return();
                        }
                    } finally {
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }

                localSubscribeTo(targetHot, observer, true);
            } else {
                throw Error('Nieosiągalne odgałęzienie');
            }
        }

        return function () {
            var subscription = activeSubscription.get(observer);
            activeSubscription.delete(observer);

            if (!subscription) {
                throw Error('Nieosiągalne odgałęzienie');
            }

            subscription.unsubscribe();
        };
    };

    return _rxjs2.default.Observable.create(newObserver);
};