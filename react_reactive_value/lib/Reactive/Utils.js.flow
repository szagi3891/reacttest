//@flow

import Rx from "rxjs";
import type { Observer } from 'rxjs';

import { Subscription } from './Subscription';
import { createHot } from './UtilsHot';
import { logInfo, logError } from '../Log';

const hotCounter = new Rx.BehaviorSubject(0);

hotCounter.subscribe(value => {
    logInfo(`Hot counter ${value}`);
});

export const subscribeTo = <K>(target: Rx.Observable<K>, observer: Observer<K>, noInitialValueOccursError: mixed | null, emitFirst: bool): Subscription => {
    let initiation = true;
    let startValueCount = 0;

    const subscribe = target.subscribe(
        (value) => {
            if (initiation === true) {
                if (emitFirst) {
                    observer.next(value);
                }

                startValueCount++;

            } else {
                observer.next(value);
            }

        },
        (err) => {
            observer.error(err);
        },
        () => {
            observer.complete();
        }
    );

    initiation = false;

    if (noInitialValueOccursError !== null) {
        if (startValueCount !== 1) {
            logError(`Spodziewano się jednej wyemitowanej wartości, wyemitowano: ${startValueCount}`, noInitialValueOccursError);
        }
    }

    return new Subscription(subscribe);
};

const upgradeCounter = (counter: Rx.BehaviorSubject<number>, delta: number) => {
    const value = counter.getValue();
    counter.next(value + delta);
};

export const createProxyDebug = <K>(counter: Rx.BehaviorSubject<number>, target: Rx.Observable<K>): Rx.Observable<K> =>
    Rx.Observable.create(observer => {
        //const subscription = subscribeTo(target, observer, null, true);

        const subscription = target.subscribe(
            (value) => {
                observer.next(value);
            },
            (err) => {
                observer.error(err);
            },
            () => {
                observer.complete();
            }
        );
        upgradeCounter(counter, 1);

        return () => {
            upgradeCounter(counter, -1);
            subscription.unsubscribe();
        };
    })
;

export const createValueObservable = <K>(targetCould: Rx.Observable<K>): Rx.Observable<K> => {

    const createBy = new Error('No initial value occurs');
    let activeSubscription: Map<Observer<K>, Subscription> = new Map();

    let isHot = false;

    const localSubscribeTo = (target: Rx.Observable<K>, observer: Observer<K>, emitFirst: bool) => {
        const subscription = subscribeTo(target, observer, createBy, emitFirst);
        activeSubscription.set(observer, subscription);
    };

    const targetHot = createHot(createProxyDebug(hotCounter, targetCould));

    const newObserver = observer => {
        if (isHot) {
            localSubscribeTo(targetHot, observer, true);
        } else {
            if (activeSubscription.size === 0) {

                localSubscribeTo(targetCould, observer, true);

            } else if (activeSubscription.size === 1) {
                isHot = true;

                const oldList = Array.from(activeSubscription);
                activeSubscription = new Map();

                for (const [observer, subscription] of oldList) {
                    localSubscribeTo(targetHot, observer, false);
                    subscription.unsubscribe();
                }

                localSubscribeTo(targetHot, observer, true);

            } else {
                throw Error('Nieosiągalne odgałęzienie');
            }
        }

        return () => {
            const subscription = activeSubscription.get(observer);
            activeSubscription.delete(observer);

            if (!subscription) {
                throw Error('Nieosiągalne odgałęzienie');
            }

            subscription.unsubscribe();
        };
    };

    return Rx.Observable.create(newObserver);
};