//@flow

import Rx from 'rxjs';

describe('Rx', () => {
    it('Base', () => {
        let count = 0;

        const obs = Rx.Observable.create(observer => {
            count++;
            return () => {
                count--;
            };
        });

        expect(count).toBe(0)
        
        const tok1 = obs.subscribe();

        expect(count).toBe(1)
        
        tok1.unsubscribe();

        expect(count).toBe(0);

        const tok2 = obs.subscribe();
        const tok3 = obs.subscribe();
        const tok4 = obs.subscribe();

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

    it('shareReplay', () => {
        let count = 0;

        const obs = Rx.Observable.create(observer => {
            count++;
            return () => {
                count--;
            };
        });

        expect(count).toBe(0);

        const replay = obs.publishReplay(1).refCount();

        expect(count).toBe(0);

        const tok1 = replay.subscribe();

        expect(count).toBe(1);

        const tok2 = replay.subscribe();
        
        expect(count).toBe(1);

        tok2.unsubscribe();
        expect(count).toBe(1);

        tok1.unsubscribe();
        expect(count).toBe(0);
    });
});
