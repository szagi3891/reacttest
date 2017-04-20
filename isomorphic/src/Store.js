// @flow

import { BehaviorSubject } from 'rxjs';

const data$: BehaviorSubject<string> = new BehaviorSubject('początkowa wartość');

const init = (newValue: string) => {
    data$.next(newValue);
};

export default {
    data$,
    init
};
