'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.createHot = undefined;

var _rxjs = require('rxjs');

var _rxjs2 = _interopRequireDefault(_rxjs);

var _Log = require('../Log');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
const createHot = <K>(target: Rx.Observable<K>): Rx.Observable<K> => {
    return target.publishReplay(1).refCount();
}
*/

var createHot = exports.createHot = function createHot(target) {
    var state = null;
    var observerSet = new Set();

    var flush = function flush() {
        if (state !== null) {
            var list = Array.from(observerSet);

            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = list[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var observerItem = _step.value;

                    observerItem.next(state.value);
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
        } else {
            throw Error('Nieprawidłowe odgałęzienie programu');
        }
    };

    var flushItem = function flushItem(observer) {
        if (state !== null) {
            observer.next(state.value);
        } else {
            throw Error('Nieprawidłowe odgałęzienie programu');
        }
    };

    return _rxjs2.default.Observable.create(function (observer) {
        observerSet.add(observer);

        if (state === null) {
            var isInit = true;
            var values = [];

            var _subscription = target.subscribe(function (value) {
                if (isInit) {
                    values.push(value);
                } else {
                    if (state === null) {
                        throw Error('Nieprawidłowe odgałęzienie');
                    }

                    state.value = value;
                    flush();
                }
            }, function (error) {
                (0, _Log.logError)('Error hot', error);
            }, function () {
                (0, _Log.logError)('Error complete');
            });

            isInit = false;

            if (values.length === 1) {
                var valueOnce = values.shift();

                state = {
                    subscription: _subscription,
                    value: valueOnce
                };

                flushItem(observer);
            } else {
                throw Error('Nieprawidłowe odgałęzienie programu 22');
            }
        } else {
            flushItem(observer);
        }

        return function () {
            observerSet.delete(observer);

            if (observerSet.size === 0) {
                if (state !== null) {
                    state.subscription.unsubscribe();
                    state = null;
                }
            }
        };
    });
};