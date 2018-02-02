//@flow

import Rx from 'rxjs';

import { createHot } from './UtilsHot';

describe('UtilsHot', () => {
    it('Test emit', () => {
        let count = 0;

        const subject = new Rx.BehaviorSubject('aa');
        const obs = Rx.Observable.create(observer => {
            count++;

            const sub = subject.subscribe((value) => {
                observer.next(value);
            });

            return () => {
                count--;
                sub.unsubscribe();
            };
        });

        expect(count).toBe(0);

        const replay = createHot(obs);

        expect(count).toBe(0);

        const tok1 = replay.subscribe();

        expect(count).toBe(1);

        const tok2 = replay.subscribe();
        
        expect(count).toBe(1);

        let countValues = 0;

        const tok3 = replay.subscribe((value) => {
            countValues++
        });

        expect(countValues).toBe(1);

        tok3.unsubscribe();
        expect(count).toBe(1);

        tok2.unsubscribe();
        expect(count).toBe(1);

        tok1.unsubscribe();
        expect(count).toBe(0);

        let countValues2 = 0;
        const tok4 = replay.subscribe((value) => {
            countValues2++;
        });

        expect(count).toBe(1);
        expect(countValues2).toBe(1);

        tok4.unsubscribe();
        expect(count).toBe(0);

    });

    it('Emit test', () => {
        let count = 0;
        
        const subject = new Rx.BehaviorSubject('aa');
        const obs = Rx.Observable.create(observer => {
            count++;

            const sub = subject.subscribe((value) => {
                observer.next(value);
            });

            return () => {
                count--;
                sub.unsubscribe();
            };
        });

        expect(count).toBe(0);
        const replay = createHot(obs);

        const values44 = [];
        const tok5 = replay.subscribe(value => values44.push(value));

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

    it('Unsubscribe', () => {
        let count = 0;
        
        const subject = new Rx.BehaviorSubject('aa');
        const obs = Rx.Observable.create(observer => {
            count++;

            const sub = subject.subscribe((value) => {
                observer.next(value);
            });

            return () => {
                count--;
                sub.unsubscribe();
            };
        });

        expect(count).toBe(0);
        const replay = createHot(obs);

        const values44 = [];
        const tok5 = replay.subscribe(value => values44.push(value));

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

        const newValues = [];
        const tok6 = replay.subscribe((value) => {
            newValues.push(value);
        });

        expect(count).toBe(1);
        expect(newValues).toEqual(['ee']);

        const newValues2 = [];
        const tok7 = replay.subscribe((value) => {
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

