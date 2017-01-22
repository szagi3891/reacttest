/* @flow */
import { Observable, BehaviorSubject } from 'rxjs';

class StoreTime {

    time = Observable
        .interval(1000)
        .map(value => ({
            count: value,
            current: new Date()
        }))
        .publish()
        .refCount();

    getFormat() {
        return this.time.map((item) => ({
            count: item.count,
            time: item.current.toString()
        }));
    }

    getTimestamp() {
        return this.time.map((item) => ({
            count: item.count,
            time: item.current.getTime()
        }));
    }
}

export default new StoreTime();
