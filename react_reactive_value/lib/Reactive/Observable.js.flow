//@flow
import Rx from 'rxjs';

import { Subscription } from './Subscription';
import { logError } from '../Log';

type ObserverType<T> = {
    next: (data: T) => void,
};

type FnCreateResponseVoidType = () => void;
type FnCreateType<T> = (observer: ObserverType<T>) => (FnCreateResponseVoidType | void);

export class Observable<T> {

    _data: Rx.Observable<T>;

    constructor(fnCreate: FnCreateType<T>) {
        this._data = Rx.Observable.create((observerInner) => {
            const obs = {
                next: (data: T) => {
                    observerInner.next(data);
                }
            };

            return fnCreate(obs);
        });
    }

    static _create<K>(observer: Rx.Observable<K>): Observable<K> {
        const result = Object.create(Observable.prototype);                 //eslint-disable-line flowtype/no-weak-types
        result._data = observer;
        return result; 
    }

    distinctUntilChanged(compare?: (a: T, b: T) => bool): Observable<T> {
        const newObserver = this._data.distinctUntilChanged(compare);
        return Observable._create(newObserver);
    }

    map<K>(mapper: (value: T) => K): Observable<K> {
        const newObserver = this._data.map(mapper);
        return Observable._create(newObserver);
    }

    switchMapObservable<K>(switchFn: (value: T) => Observable<K>): Observable<K> {
        const newObserver = this._data.switchMap((value: T) => switchFn(value)._data);
        return Observable._create(newObserver);
    }

    mergeMap<K>(mapFn: (value: T) => Observable<K>): Observable<K> {
        const newObserver = this._data.mergeMap((value: T) => mapFn(value)._data);
        return Observable._create(newObserver);
    }

    subscribe(onValue: (value:T) => void): Subscription {
        return new Subscription(
            this._data.subscribe(onValue, error => {
                logError('Subscription error', error);
            })
        );
    }

    merge<B>(b: Observable<B>): Observable<T | B> {
        const newObserver = Rx.Observable.merge(this._data, b._data);
        return Observable._create(newObserver);
    }

    mapTo<K>(value: K): Observable<K> {
        const newObserver = this._data.mapTo(value);
        return Observable._create(newObserver);
    }

    do(doFn: (mess: T) => void): Observable<T> {
        const newObserver = this._data.do(doFn);
        return Observable._create(newObserver);
    }

    filter(filterFn: (value: T) => bool): Observable<T> {
        const newObserver = this._data.filter(filterFn);
        return Observable._create(newObserver);
    }

    take(count: number): Observable<T> {
        const z = this._data.take(count);
        return Observable._create(z);
    }

    static empty<K>(): Observable<K> {
        const newObserver = Rx.Observable.empty();
        return Observable._create(newObserver);
    }

    static fromEvent<K>(target: any, event: string): Observable<K> {            //eslint-disable-line flowtype/no-weak-types
        const newObserver: Rx.Observable<K> = Rx.Observable.fromEvent(target, event);
        return Observable._create(newObserver);
    }
}
