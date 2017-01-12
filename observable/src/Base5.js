// @flow
import React, { Component, createElement } from 'react';
import Rx from 'rxjs';
import { is as immutableIs} from 'immutable';

const _shoudUpdate = (oldObj: mixed, newObj: mixed): bool => {
    if (oldObj === newObj) {
        return false;
    }

    if (typeof newObj !== 'object' || typeof oldObj !== 'object') {
        console.warn('newObj', newObj);
        console.warn('oldObj', oldObj);
        throw Error('incorrect state');
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

        if (!immutableIs(oldData, newData)) {
            return true;
        }
    }

    return false;
};

function shouldComponentUpdate(nextProps: mixed, nextState: mixed): bool {
    return _shoudUpdate(this.props, nextProps) || _shoudUpdate(this.state, nextState);
};


/*
    wzorowane na :
    https://github.com/acdlite/react-rx-component

    TODO - przekazywanie funkcji callbackowych do render-a
    https://github.com/acdlite/react-rx-component/blob/master/src/funcSubject.js
    TODO - enkapsulacja subjecta
    TODO - obsłużyć kontekst ?
*/


/*
function createRxComponent<PropsTypeIn, PropsTypeOut>(
    mapProps: MapFuncType<PropsTypeIn,PropsTypeOut>,
    innerComponent: React$Component<any, PropsTypeOut, any>
): React$Component<any, PropsTypeIn, PropsTypeOut> {
*/


type MapFuncType<PropsTypeIn, PropsTypeOut> = (observable: Rx.Observable<PropsTypeIn>) => Rx.Observable<PropsTypeOut>;

export function createRxComponent<PropsTypeIn: Object, PropsTypeOut: Object>(
    mapProps: MapFuncType<PropsTypeIn,PropsTypeOut>,
    innerComponent: (prop: PropsTypeOut) => React.Element<*>
): (prop: PropsTypeIn) => React.Element<*> {

    class RxComponent extends Component {

        props: PropsTypeIn;
        innerProps: PropsTypeOut;

        receive$: rxjs$Subject<PropsTypeIn>;
        subscription: rxjs$Subscription;

        constructor(props: PropsTypeIn) {
            super(props);

            this.receive$ = new Rx.Subject();
            const props$ = this.receive$;   //.startWith(props);

            this.subscription = mapProps(props$)
                .subscribe((newInnerProps: PropsTypeOut) => {
                    this.innerProps = newInnerProps;
                    this.forceUpdate();
                });
        }

        shouldComponentUpdate() {
            return false;
        }

        componentDidMount() {
            this.receive$.next(this.props);
        }

        componentWillReceiveProps(nextProps: PropsTypeIn) {
            this.receive$.next(nextProps);
        }

        componentWillUnmount() {
            this.subscription.unsubscribe();
        }

        render() {
            return createElement(innerComponent, this.innerProps);
        }
    };

    return RxComponent;
}
