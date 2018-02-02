//@flow
import Rx from 'rxjs';

import senderSync from './SenderSync';
import { Observable } from './Observable';
import { ValueObservable } from './ValueObservable';

export class Subject<T> {

    _data: Rx.Subject<T>;

    constructor() {
        this._data = new Rx.Subject();
    }

    asObservable(): Observable<T> {
        return Observable._create(this._data.asObservable());
    }

    next(value: T) {
        senderSync(() => {
            this._data.next(value);
        });
    }

    complete() {
        senderSync(() => {
            this._data.complete();
        });
    }
    
}
