//@flow

import Rx from 'rxjs';

import { createProxyDebug, createValueObservable } from './Utils';

describe('Utils', () => {
    it('Test unsubscribe', () => {
        const counter = new Rx.BehaviorSubject(0);
        const subject = new Rx.BehaviorSubject('aaa');

        const proxy = createProxyDebug(counter, subject);

        const newObs = createValueObservable(proxy);

        expect(counter.getValue()).toBe(0);

        const tick = newObs.subscribe();

        expect(counter.getValue()).toBe(1);

        tick.unsubscribe();

        expect(counter.getValue()).toBe(0);

        const tick2 = newObs.subscribe();
        expect(counter.getValue()).toBe(1);        
        const tick3 = newObs.subscribe();
        expect(counter.getValue()).toBe(1);

        tick3.unsubscribe();
        expect(counter.getValue()).toBe(1);
        tick2.unsubscribe();
        expect(counter.getValue()).toBe(0);


        const tick4 = newObs.subscribe();
        expect(counter.getValue()).toBe(1);        
        const tick5 = newObs.subscribe();
        expect(counter.getValue()).toBe(1);
        const tick6 = newObs.subscribe();
        expect(counter.getValue()).toBe(1);

        tick6.unsubscribe();
        expect(counter.getValue()).toBe(1);
        tick5.unsubscribe();
        expect(counter.getValue()).toBe(1);
        tick4.unsubscribe();
        expect(counter.getValue()).toBe(0);
    });

    it('Test swith to hot', () => {
        const counter = new Rx.BehaviorSubject(0);
        const subject = new Rx.BehaviorSubject('aaa');
        
        const proxy = createProxyDebug(counter, subject);
        const newObs = createValueObservable(proxy);

        expect(counter.getValue()).toBe(0);
        
        const tick1 = newObs.subscribe();
        expect(counter.getValue()).toBe(1);        
        const tick2 = newObs.subscribe();
        expect(counter.getValue()).toBe(1);

        tick2.unsubscribe();
        expect(counter.getValue()).toBe(1);
        tick1.unsubscribe();
        expect(counter.getValue()).toBe(0);
    });

    it('Test multisubscribers', () => {
        const counter = new Rx.BehaviorSubject(0);
        const subject = new Rx.BehaviorSubject('aaa');
        
        const proxy = createProxyDebug(counter, subject);
        const newObs = createValueObservable(proxy);

        expect(counter.getValue()).toBe(0);
        
        const tok1 = newObs.subscribe();

        expect(counter.getValue()).toBe(1);
        
        subject.next('bbb');
        subject.next('ccc');
        
        let countValue = 0;

        const tok2 = newObs.subscribe((value) => {
            countValue++;
        });
        expect(counter.getValue()).toBe(1);
        expect(countValue).toBe(1);


        subject.next('ddd');

        
        let countValue2 = 0;
        
        const tok3 = newObs.subscribe((value) => {
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
    })
});
