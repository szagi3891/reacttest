'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ValueObservable = exports.ValueSubject = exports.Observable = exports.Subject = exports.Subscription = undefined;

var _Subscription = require('./Subscription');

var _Subject = require('./Subject');

var _Observable = require('./Observable');

var _ValueSubject = require('./ValueSubject');

var _ValueObservable = require('./ValueObservable');

exports.Subscription = _Subscription.Subscription;
exports.Subject = _Subject.Subject;
exports.Observable = _Observable.Observable;
exports.ValueSubject = _ValueSubject.ValueSubject;
exports.ValueObservable = _ValueObservable.ValueObservable;

/*
function createState(reducer$, initialState$ = Rx.Observable.of({})) {
  return initialState$
    .merge(reducer$)
    .scan((state, [scope, reducer]) =>
      ({ ...state, [scope]: reducer(state[scope]) }))
    .publishReplay(1)
    .refCount();
}
*/