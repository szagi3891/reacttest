// @flow
import { Component, createElement } from 'react';
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
type MapFuncType = (obser: Rx.Observable<PropsType1>) => Rx.Observable<PropsType2>
type ComponentIn = Component<*,*,*>;
type ComponentOut = Component<*,*,*>;
*/

type MapFuncType<PropsTypeIn, PropsTypeOut> = (observable: Rx.Observable<PropsTypeIn>) => Rx.Observable<PropsTypeOut>;

function createRxComponent<PropsTypeIn, PropsTypeOut>(mapProps: MapFuncType<PropsTypeIn, PropsTypeOut>, SimpleComponent: any): any {

//function createRxComponent(mapProps, SimpleComponent) {

    class RxComponent extends Component {

        state: PropsTypeOut;
        shouldComponentUpdate = shouldComponentUpdate;

        componentHasMounted: bool;
        receive$: rxjs$Subject<PropsTypeIn>;
        subscription: rxjs$Subscription;

        constructor(props: PropsTypeIn/*, context*/) {
            super(props/*, context*/);

            //this.receive$ = funcSubject();
            //this.props$ = this.receive$.map(x => x[0]).startWith(props);
            //this.context$ = this.receive$.map(x => x[1]).startWith(context);

            this.componentHasMounted = false;

            this.receive$ = new Rx.Subject();
            const props$ = this.receive$.startWith(props);

            this.subscription = mapProps(props$).subscribe(
                (childProps: PropsTypeOut) =>
                    this.componentHasMounted
                        ? this.setState(childProps)
                        : this.state = childProps
            );
        }

        componentDidMount() {
            this.componentHasMounted = true;
        }

        componentWillReceiveProps(nextProps: PropsTypeIn, /*, nextContext*/) {
            this.receive$.next(nextProps);
        }

        componentWillUnmount() {
            this.subscription.unsubscribe();
        }

        render() {
            return createElement(SimpleComponent, this.state);
            //return <SimpleComponent {...this.state} />;
        }
    };

    return RxComponent;
}

export {
    createRxComponent,
    shouldComponentUpdate
};
