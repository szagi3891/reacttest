
import React, { Component } from 'react';
import Rx from 'rxjs';
import { is as immutableIs} from 'immutable';

const _shoudUpdate = (oldObj: mixed, newObj: mixed): bool => {
    if (oldObj === newObj) {
        return false;
    }

    if (typeof newObj !== 'object' || typeof oldObj !== 'object') {
        throw Error('incorrect state');
    }

    if (newObj === null || oldObj === null) {
        throw Error('incorrect state');
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

//function createRxComponent<PropsTypeIn, PropsTypeOut>(mapProps: MapFuncType, SimpleComponent: ComponentOut): ComponentIn {
*/
function createRxComponent(mapProps, SimpleComponent) {

    class RxComponent extends Component {

        shouldComponentUpdate = shouldComponentUpdate;
/*
        shouldComponentUpdate(nextProps: mixed, nextState: mixed): bool {
            return _shoudUpdate(this.props, nextProps) || _shoudUpdate(this.state, nextState);
        }
*/
        constructor(props/*, context*/) {
            super(props/*, context*/);

            //this.receive$ = funcSubject();
            //this.props$ = this.receive$.map(x => x[0]).startWith(props);
            //this.context$ = this.receive$.map(x => x[1]).startWith(context);

            this.componentHasMounted = false;

            this.receive$ = new Rx.Subject();
            this.props$ = this.receive$.startWith(props);

            this.subscription = mapProps(this.props$).subscribe(
                childProps =>
                    this.componentHasMounted
                        ? this.setState(childProps)
                        : this.state = childProps
            );
        }

        componentDidMount() {
            this.componentHasMounted = true;
        }

        componentWillReceiveProps(nextProps, /*, nextContext*/) {
            this.receive$.next(nextProps);
        }

        componentWillUnmount() {
            this.subscription.unsubscribe();
        }

        render() {
            return <SimpleComponent {...this.state} />;
        }
    };

    return RxComponent;
}

export {
    createRxComponent,
    shouldComponentUpdate
};
