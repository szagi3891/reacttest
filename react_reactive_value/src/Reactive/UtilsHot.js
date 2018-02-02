//@flow

import Rx from 'rxjs';
import { logError } from '../Log';

type StateHot<K> = {
    subscription: Rx.Subscription,
    value: K
};

/*
const createHot = <K>(target: Rx.Observable<K>): Rx.Observable<K> => {
    return target.publishReplay(1).refCount();
}
*/

export const createHot = <K>(target: Rx.Observable<K>): Rx.Observable<K> => {
    let state: null | StateHot<K> = null;
    const observerSet = new Set();

    const flush = () => {
        if (state !== null) {
            const list = Array.from(observerSet);

            for (const observerItem of list) {
                observerItem.next(state.value);
            }
        } else {
            throw Error('Nieprawidłowe odgałęzienie programu');
        }
    };

    const flushItem = (observer) => {
        if (state !== null) {
            observer.next(state.value);
        } else {
            throw Error('Nieprawidłowe odgałęzienie programu');
        }
    };

    return Rx.Observable.create(observer => {
        observerSet.add(observer);

        if (state === null) {
            let isInit = true
            const values = [];

            const subscription = target.subscribe(value => {
                if (isInit) {
                    values.push(value);
                } else {
                    if (state === null) {
                        throw Error('Nieprawidłowe odgałęzienie');
                    }

                    state.value = value;
                    flush();
                }
            }, error => {
                logError('Error hot', error);
            }, () => {
                logError('Error complete');
            });

            isInit = false;

            if (values.length === 1) {
                let valueOnce = values.shift();
                
                state = {
                    subscription,
                    value: valueOnce
                };

                flushItem(observer);
            } else {
                throw Error('Nieprawidłowe odgałęzienie programu 22');
            }
        } else {
            flushItem(observer);
        }

        return () => {
            observerSet.delete(observer);

            if (observerSet.size === 0) {
                if (state !== null) {
                    state.subscription.unsubscribe();
                    state = null;
                }
            }
        }
    });
};
