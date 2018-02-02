//@flow
import Rx from 'rxjs';

import senderSync from './SenderSync';
import { ValueObservable } from './ValueObservable';

export class ValueSubject<T> {
    
    _data: Rx.BehaviorSubject<T>;

    constructor(initValue: T) {
        this._data = new Rx.BehaviorSubject(initValue);
    }

    asObservable(): ValueObservable<T> {
        return ValueObservable._createValueObservable(this._data.asObservable());
    }

    next(value: T) {
        senderSync(() => {
            this._data.next(value);
        });
    }

    update(fnUpdate: (old: T) => T) {
        senderSync(() => {
            const value = this._data.getValue();
            const newValue = fnUpdate(value);
            this._data.next(newValue);
        });
    }
}
                                    