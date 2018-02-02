'use strict';

var _rxjs = require('rxjs');

var _rxjs2 = _interopRequireDefault(_rxjs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Rx', function () {
    it('Base', function () {
        var count = 0;

        var obs = _rxjs2.default.Observable.create(function (observer) {
            count++;
            return function () {
                count--;
            };
        });

        expect(count).toBe(0);

        var tok1 = obs.subscribe();

        expect(count).toBe(1);

        tok1.unsubscribe();

        expect(count).toBe(0);

        var tok2 = obs.subscribe();
        var tok3 = obs.subscribe();
        var tok4 = obs.subscribe();

        expect(count).toBe(3);

        tok4.unsubscribe();
        expect(count).toBe(2);

        tok3.unsubscribe();
        expect(count).toBe(1);

        //nic się nie dzieje
        tok3.unsubscribe();
        expect(count).toBe(1);

        tok2.unsubscribe();
        expect(count).toBe(0);
    });

    it('shareReplay', function () {
        var count = 0;

        var obs = _rxjs2.default.Observable.create(function (observer) {
            count++;
            return function () {
                count--;
            };
        });

        expect(count).toBe(0);

        var replay = obs.publishReplay(1).refCount();

        expect(count).toBe(0);

        var tok1 = replay.subscribe();

        expect(count).toBe(1);

        var tok2 = replay.subscribe();

        expect(count).toBe(1);

        tok2.unsubscribe();
        expect(count).toBe(1);

        tok1.unsubscribe();
        expect(count).toBe(0);
    });
});