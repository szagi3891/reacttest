// @flow

import React, { Component } from 'react';
import { Observable, Subject, Subscription } from 'rxjs';
import { is as immutableIs, Map, List, Stack, OrderedMap, Set as ImmutableSet, OrderedSet} from 'immutable';

const isImmutable = (obj: mixed): bool => {
    return (Map.isMap(obj)
        || List.isList(obj)
        || Stack.isStack(obj)
        || OrderedMap.isOrderedMap(obj)
        || ImmutableSet.isSet(obj)
        || OrderedSet.isOrderedSet(obj)
    );
};

const shoudUpdate = (oldObj: mixed, newObj: mixed): bool => {
    if (oldObj === newObj) {
        return false;
    }

    if (typeof newObj !== 'object' || typeof oldObj !== 'object') {
        return true;
    }

    if (newObj === null || oldObj === null) {
        return true;
    }

    const oldKeys = Object.keys(newObj);
    const newKeys = Object.keys(oldObj);

    if (oldKeys.length !== newKeys.length) {
        return true;
    }

    for (let i = 0; i < oldKeys.length; i++) {
        const oldData = oldObj[oldKeys[i]];
        const newData = newObj[newKeys[i]];

        if (isImmutable(oldData)) {
            if (!immutableIs(oldData, newData)) {
                return true;
            }
        } else {
            if (shoudUpdate(oldData, newData)) {
                return true;
            }
        }
    }

    return false;
};

export function shouldComponentUpdate(nextProps: mixed, nextState: mixed): bool {
    return shoudUpdate(this.props, nextProps) || shoudUpdate(this.state, nextState);
};

/*
    wzorowane na : https://github.com/acdlite/react-rx-component
*/

const isEqualProps = (a: mixed, b: mixed): bool => !shoudUpdate(a,b);

type MapFuncType<PropsTypeIn, PropsTypeOut> = (observable: Observable<PropsTypeIn>) => Observable<PropsTypeOut>;
type FuncComponentType<PropsType> = (prop: PropsType) => React.Element<*>;

export const createRxComponent = <PropsTypeIn: Object, PropsTypeOut: Object>(
    mapProps: MapFuncType<PropsTypeIn, PropsTypeOut>,
    InnerComponent: FuncComponentType<PropsTypeOut>
): FuncComponentType<PropsTypeIn> => {

    class RxComponent extends Component<void, PropsTypeIn, void> {

        props: PropsTypeIn;

        innerProps: PropsTypeOut | null = null;
        receive$: Subject<PropsTypeIn> = new Subject();
        subscription: Subscription | null = null;

        shouldComponentUpdate() {
            return false;
        }

        componentWillMount() {
            this.subscription = mapProps(this.receive$.asObservable())
                .distinctUntilChanged(isEqualProps)
                .subscribe((newInnerProps: PropsTypeOut) => {
                    this.innerProps = newInnerProps;

                    this.forceUpdate();
                });

            this.receive$.next(this.props);
        }

        componentWillReceiveProps(nextProps: PropsTypeIn) {
            this.receive$.next(nextProps);
        }

        componentWillUnmount() {
            if (this.subscription) {
                this.subscription.unsubscribe();
            }
        }

        render(): React.Element<*> | null {
            if (this.innerProps === null) {
                return null;
            }

            return (
                <InnerComponent {...this.innerProps} />
            );
        }
    };

    return (props: PropsTypeIn): React.Element<*> => {
        return (
            <RxComponent {...props} />
        );
    };
}
