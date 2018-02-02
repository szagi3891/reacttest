//@flow
import { Subscription } from './Subscription';
import { Subject } from './Subject';
import { Observable } from './Observable';
import { ValueSubject } from './ValueSubject';
import { ValueObservable } from './ValueObservable';

export {
    Subscription,
    Subject,
    Observable,
    ValueSubject,
    ValueObservable
};

/*
function createState(reducer$, initialState$ = Rx.Observable.of({})) {
  return initialState$
    .merge(reducer$)
    .scan((state, [scope, reducer]) =>
      ({ ...state, [scope]: reducer(state[scope]) }))
    .publishReplay(1)
    .refCount();
}
*/
