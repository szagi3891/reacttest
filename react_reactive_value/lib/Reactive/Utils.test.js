'use strict';

var _rxjs = require('rxjs');

var _rxjs2 = _interopRequireDefault(_rxjs);

var _Utils = require('./Utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Utils', function () {
    it('Test unsubscribe', function () {
        var counter = new _rxjs2.default.BehaviorSubject(0);
        var subject = new _rxjs2.default.BehaviorSubject('aaa');

        var proxy = (0, _Utils.createProxyDebug)(counter, subject);

        var newObs = (0, _Utils.createValueObservable)(proxy);

        expect(counter.getValue()).toBe(0);

        var tick = newObs.subscribe();

        expect(counter.getValue()).toBe(1);

        tick.unsubscribe();

        expect(counter.getValue()).toBe(0);

        var tick2 = newObs.subscribe();
        expect(counter.getValue()).toBe(1);
        var tick3 = newObs.subscribe();
        expect(counter.getValue()).toBe(1);

        tick3.unsubscribe();
        expect(counter.getValue()).toBe(1);
        tick2.unsubscribe();
        expect(counter.getValue()).toBe(0);

        var tick4 = newObs.subscribe();
        expect(counter.getValue()).toBe(1);
        var tick5 = newObs.subscribe();
        expect(counter.getValue()).toBe(1);
        var tick6 = newObs.subscribe();
        expect(counter.getValue()).toBe(1);

        tick6.unsubscribe();
        expect(counter.getValue()).toBe(1);
        tick5.unsubscribe();
        expect(counter.getValue()).toBe(1);
        tick4.unsubscribe();
        expect(counter.getValue()).toBe(0);
    });

    it('Test swith to hot', function () {
        var counter = new _rxjs2.default.BehaviorSubject(0);
        var subject = new _rxjs2.default.BehaviorSubject('aaa');

        var proxy = (0, _Utils.createProxyDebug)(counter, subject);
        var newObs = (0, _Utils.createValueObservable)(proxy);

        expect(counter.getValue()).toBe(0);

        var tick1 = newObs.subscribe();
        expect(counter.getValue()).toBe(1);
        var tick2 = newObs.subscribe();
        expect(counter.getValue()).toBe(1);

        tick2.unsubscribe();
        expect(counter.getValue()).toBe(1);
        tick1.unsubscribe();
        expect(counter.getValue()).toBe(0);
    });

    it('Test multisubscribers', function () {
        var counter = new _rxjs2.default.BehaviorSubject(0);
        var subject = new _rxjs2.default.BehaviorSubject('aaa');

        var proxy = (0, _Utils.createProxyDebug)(counter, subject);
        var newObs = (0, _Utils.createValueObservable)(proxy);

        expect(counter.getValue()).toBe(0);

        var tok1 = newObs.subscribe();

        expect(counter.getValue()).toBe(1);

        subject.next('bbb');
        subject.next('ccc');

        var countValue = 0;

        var tok2 = newObs.subscribe(function (value) {
            countValue++;
        });
        expect(counter.getValue()).toBe(1);
        expect(countValue).toBe(1);

        subject.next('ddd');

        var countValue2 = 0;

        var tok3 = newObs.subscribe(function (value) {
            countValue2++;
        });
        expect(countValue2).toBe(1);

        expect(counter.getValue()).toBe(1);
        tok3.unsubscribe();
        expect(counter.getValue()).toBe(1);
        tok2.unsubscribe();
        expect(counter.getValue()).toBe(1);
        tok1.unsubscribe();
        expect(counter.getValue()).toBe(0);
    });
});