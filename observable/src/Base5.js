
import React, { Component } from 'react';
import Rx from 'rxjs';

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

//function createRxComponent<PropsType1, PropsType2>(mapProps: MapFuncType, SimpleComponent: ComponentIn): ComponentOut {
*/
function createRxComponent(mapProps, SimpleComponent) {

    class RxComponent extends Component {
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

        //shouldComponentUpdate = shouldPureComponentUpdate;

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
    createRxComponent
};
