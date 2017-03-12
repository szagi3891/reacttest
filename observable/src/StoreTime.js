/* @flow */
import { Observable } from 'rxjs';

class StoreTime {

    //time = Observable.interval(1000)
    time = Observable.timer(0, 1000)
        .map(value => ({
            count: value,
            current: new Date()
        }))
        //.publish().refCount();
        .publishReplay(1).refCount();

    getFormat() {
        return this.time.map((item) => {
            const { current, count } = item;
            const hours = current.getHours();
            const minutes = current.getMinutes();
            const seconds = current.getSeconds();

            return {
                count: count,
                time:  `${hours}-${minutes}-${seconds}`
            };
        });
    }

    getTimestamp() {
        return this.time.map((item) => ({
            count: item.count,
            time: item.current.getTime()
        }));
    }
}

export default new StoreTime();
