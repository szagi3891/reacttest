'use strict';

var _rxjs = require('rxjs');

var _rxjs2 = _interopRequireDefault(_rxjs);

var _UtilsHot = require('./UtilsHot');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('UtilsHot', function () {
    it('Test emit', function () {
        var count = 0;

        var subject = new _rxjs2.default.BehaviorSubject('aa');
        var obs = _rxjs2.default.Observable.create(function (observer) {
            count++;

            var sub = subject.subscribe(function (value) {
                observer.next(value);
            });

            return function () {
                count--;
                sub.unsubscribe();
            };
        });

        expect(count).toBe(0);

        var replay = (0, _UtilsHot.createHot)(obs);

        expect(count).toBe(0);

        var tok1 = replay.subscribe();

        expect(count).toBe(1);

        var tok2 = replay.subscribe();

        expect(count).toBe(1);

        var countValues = 0;

        var tok3 = replay.subscribe(function (value) {
            countValues++;
        });

        expect(countValues).toBe(1);

        tok3.unsubscribe();
        expect(count).toBe(1);

        tok2.unsubscribe();
        expect(count).toBe(1);

        tok1.unsubscribe();
        expect(count).toBe(0);

        var countValues2 = 0;
        var tok4 = replay.subscribe(function (value) {
            countValues2++;
        });

        expect(count).toBe(1);
        expect(countValues2).toBe(1);

        tok4.unsubscribe();
        expect(count).toBe(0);
    });

    it('Emit test', function () {
        var count = 0;

        var subject = new _rxjs2.default.BehaviorSubject('aa');
        var obs = _rxjs2.default.Observable.create(function (observer) {
            count++;

            var sub = subject.subscribe(function (value) {
                observer.next(value);
            });

            return function () {
                count--;
                sub.unsubscribe();
            };
        });

        expect(count).toBe(0);
        var replay = (0, _UtilsHot.createHot)(obs);

        var values44 = [];
        var tok5 = replay.subscribe(function (value) {
            return values44.push(value);
        });

        expect(count).toBe(1);

        subject.next('bb');
        subject.next('cc');
        expect(values44).toEqual(['aa', 'bb', 'cc']);

        subject.next('dd');
        subject.next('ee');
        expect(values44).toEqual(['aa', 'bb', 'cc', 'dd', 'ee']);

        expect(count).toBe(1);

        tok5.unsubscribe();
        expect(count).toBe(0);
    });

    it('Unsubscribe', function () {
        var count = 0;

        var subject = new _rxjs2.default.BehaviorSubject('aa');
        var obs = _rxjs2.default.Observable.create(function (observer) {
            count++;

            var sub = subject.subscribe(function (value) {
                observer.next(value);
            });

            return function () {
                count--;
                sub.unsubscribe();
            };
        });

        expect(count).toBe(0);
        var replay = (0, _UtilsHot.createHot)(obs);

        var values44 = [];
        var tok5 = replay.subscribe(function (value) {
            return values44.push(value);
        });

        expect(count).toBe(1);

        subject.next('bb');
        subject.next('cc');
        expect(values44).toEqual(['aa', 'bb', 'cc']);

        subject.next('dd');
        subject.next('ee');
        expect(values44).toEqual(['aa', 'bb', 'cc', 'dd', 'ee']);

        expect(count).toBe(1);

        tok5.unsubscribe();
        expect(count).toBe(0);

        var newValues = [];
        var tok6 = replay.subscribe(function (value) {
            newValues.push(value);
        });

        expect(count).toBe(1);
        expect(newValues).toEqual(['ee']);

        var newValues2 = [];
        var tok7 = replay.subscribe(function (value) {
            newValues2.push(value);
        });

        expect(count).toBe(1);
        expect(newValues2).toEqual(['ee']);

        tok7.unsubscribe();
        expect(count).toBe(1);
        tok6.unsubscribe();
        expect(count).toBe(0);
    });
});