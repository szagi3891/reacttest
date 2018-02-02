//@flow

import Rx from "rxjs";
import type { Observer } from 'rxjs';

import { Observable } from './Observable';
import { Subscription } from './Subscription';
import { subscribeTo, createValueObservable } from './Utils';
    
export class ValueObservable<T> extends Observable<T> {

    static create<K>(initValue: K, createFn: (next: (data: K) => void) => () => void): ValueObservable<K> {
        const subject = new Rx.BehaviorSubject(initValue);

        const newObservable = Rx.Observable.create(observer => {
            const unsubTarget = createFn((data: K) => {
                subject.next(data);
            });
    
            const sub = subscribeTo(subject, observer, null, true);

            return () => {
                sub.unsubscribe();
                unsubTarget();
            };
        });

        return this._createValueObservable(newObservable);
    }

    static createFromValue<K>(createInitValue: () => [K, () => void]): ValueObservable<K> {
        const newObservable = Rx.Observable.create(observer => {
            const [initValue, fnDisconnect] = createInitValue();
            observer.next(initValue);
            return fnDisconnect;
        });

        return ValueObservable._createValueObservable(newObservable);
    }

    static _createValueObservable<K>(target: Rx.Observable<K>): ValueObservable<K> {
        const result = Object.create(ValueObservable.prototype);
        result._data = createValueObservable(target);
        return result;
    }

    static scan<K,S>(command: Observable<K>, initState: S, reducer: (prevState: S, command: K) => S): [ValueObservable<S>, () => void] {
        const newObserver = command._data.scan(reducer, initState);
        return ValueObservable._createFromObserver(initState, newObserver);
    }

    static _createFromObserver<K>(initValue: K, from: Rx.Observable<K>): [ValueObservable<K>, () => void] {
        const subject = new Rx.BehaviorSubject(initValue);
        const unsubTarget = from.subscribe(subject);
        
        const inst = Rx.Observable.create((observer) => {
            const sub = subscribeTo(subject, observer, null, true);

            return () => {
                sub.unsubscribe();
            };
        });

        return [
            ValueObservable._createValueObservable(inst),
            () => {
                unsubTarget.unsubscribe();
            }
        ];
    }

    debounceTime(time: number): ValueObservable<T> {
        const newObserver = this._data.debounceTime(time)
            .merge(this._data.take(1))
            .distinctUntilChanged()
        ;
        return ValueObservable._createValueObservable(newObserver);
    }

    distinctUntilChanged(compare?: (a: T, b: T) => bool): ValueObservable<T> {
        const newObserver = this._data.distinctUntilChanged(compare);
        return ValueObservable._createValueObservable(newObserver);
    }

    map<K>(mapper: (value: T) => K): ValueObservable<K> {
        const newObserver = this._data.map(mapper);
        return ValueObservable._createValueObservable(newObserver);
    }

    mapTo<K>(value: K): ValueObservable<K> {
        const newObserver = this._data.mapTo(value);
        return ValueObservable._createValueObservable(newObserver);
    }

    switchMap<K>(switchFn: (value: T) => ValueObservable<K>): ValueObservable<K> {
        const newObserver = this._data.switchMap((value: T) => switchFn(value)._data);
        return ValueObservable._createValueObservable(newObserver);
    }

    do(doFn: (mess: T) => void): ValueObservable<T> {
        const newObserver = this._data.do(doFn);
        return ValueObservable._createValueObservable(newObserver);
    }

    static observableWithLatestFrom<A, B>(a: Observable<A>, b: ValueObservable<B>): Observable<[A, B]> {
        const newObserver = a._data.withLatestFrom(b._data);
        return Observable._create(newObserver);
    }

    static observableWithLatestFrom2<A, B, C>(a: Observable<A>, b: ValueObservable<B>, c: ValueObservable<C>): Observable<[A, B, C]> {
        //$FlowFixMe
        const z = a._data.withLatestFrom(b._data, c._data);
        return Observable._create(z);
    }

    static observableWithLatestFrom3<A, B, C, D>(a: Observable<A>, b: ValueObservable<B>, c: ValueObservable<C>, d: ValueObservable<D>): Observable<[A, B, C, D]> {
        //$FlowFixMe
        const z = a._data.withLatestFrom(b._data, c._data, d._data);
        return Observable._create(z);
    }

    withLatestFrom<B>(b: ValueObservable<B>): ValueObservable<[T, B]> {
        const z = this._data.withLatestFrom(b._data);
        return ValueObservable._createValueObservable(z);
    }

    withLatestFrom2<B, C>(b: ValueObservable<B>, c: ValueObservable<C>): ValueObservable<[T, B, C]> {
        //$FlowFixMe
        const z = this._data.withLatestFrom(b._data, c._data);
        return ValueObservable._createValueObservable(z);
    }

    withLatestFrom3<B, C, D>(b: ValueObservable<B>, c: ValueObservable<C>, d: ValueObservable<D>): ValueObservable<[T, B, C, D]> {
        //$FlowFixMe
        const z = this._data.withLatestFrom(b._data, c._data, d._data);
        return ValueObservable._createValueObservable(z);
    }

    static of<K>(value: K): ValueObservable<K> {
        const newObserver = Rx.Observable.of(value);
        return ValueObservable._createValueObservable(newObserver);
    }

    static combineLatest<A, B, Z>(
        a: ValueObservable<A>,
        b: ValueObservable<B>,
        combine: (value1: A, value2: B) => Z
    ): ValueObservable<Z> {
        const z = Rx.Observable.combineLatest(a._data, b._data, combine);
        return ValueObservable._createValueObservable(z);
    }

    static combineLatestTupleArr<K>(
        k: Array<ValueObservable<K>>,
    ): ValueObservable<Array<K>> {
        const inner = k.map(item => item._data);
        //$FlowFixMe
        const z = Rx.Observable.combineLatest(inner);
        return ValueObservable._createValueObservable(z);
    }

    static combineLatestTuple<A, B>(
        a: ValueObservable<A>,
        b: ValueObservable<B>,
    ): ValueObservable<[A, B]> {
        const z = Rx.Observable.combineLatest(a._data, b._data);
        return ValueObservable._createValueObservable(z);
    }

    static combineLatest3<A, B, C, Z>(
        a: ValueObservable<A>,
        b: ValueObservable<B>,
        c: ValueObservable<C>,
        combine: (value1: A, value2: B, value3: C) => Z
    ): ValueObservable<Z> {
        const z = Rx.Observable.combineLatest(a._data, b._data, c._data, combine);
        return ValueObservable._createValueObservable(z);
    }

    static combineLatest4<A, B, C, D, Z>(
        a: ValueObservable<A>,
        b: ValueObservable<B>,
        c: ValueObservable<C>,
        d: ValueObservable<D>,
        combine: (value1: A, value2: B, value3: C, value4: D) => Z
    ): ValueObservable<Z> {
        const z = Rx.Observable.combineLatest(a._data, b._data, c._data, d._data, combine);
        return ValueObservable._createValueObservable(z);
    }

    static combineLatest5<A, B, C, D, E, Z>(
        a: ValueObservable<A>,
        b: ValueObservable<B>,
        c: ValueObservable<C>,
        d: ValueObservable<D>,
        e: ValueObservable<E>,
        combine: (value1: A, value2: B, value3: C, value4: D, value5: E) => Z
    ): ValueObservable<Z> {
        const z = Rx.Observable.combineLatest(a._data, b._data, c._data, d._data, e._data, combine);
        return ValueObservable._createValueObservable(z);
    }
}
