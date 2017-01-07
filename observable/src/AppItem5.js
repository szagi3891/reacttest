/* @flow */
import React, { Component } from 'react';
import Rx from 'rxjs';

import Store from './Store';

/*
    TODO - przekazywanie funkcji callbackowych do render-a
    https://github.com/acdlite/react-rx-component/blob/master/src/funcSubject.js
    TODO - enkapsulacja subjecta
    TODO - obsłużyć kontekst ?
*/

function createRxComponent(mapProps, SimpleComponent) {

  class RxComponent extends Component {
    constructor(props/*, context*/) {
      super(props/*, context*/);

      //this.receive$ = funcSubject();
      //this.props$ = this.receive$.map(x => x[0]).startWith(props);
      //this.context$ = this.receive$.map(x => x[1]).startWith(context);

      this.receive$ = new Rx.Subject();

      this.props$ = this.receive$.startWith(props);

      this.childProps$ = mapProps(this.props$);

      this.componentHasMounted = false;

      this.subscription = this.childProps$.subscribe(
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
      this.receive$(nextProps);
    }

    //shouldComponentUpdate = shouldPureComponentUpdate;

    componentWillUnmount() {
      this.subscription.dispose();
    }

    render() {
      return <SimpleComponent {...this.state} />;
    }
  };

  return RxComponent;
}

type ItemType = {
    name: string,
    age: string,
};

type PropsType = {|
    id: string,
    model: ItemType | null,
|};

/*
state: StateType;

constructor(props: PropsType) {
    super(props);

    this.state = {
        model: null
    };

    this.onProps((propsStream: rxjs$Observable<PropsType>): rxjs$Subscription =>
        propsStream
            .map(props => props.id)
            .distinctUntilChanged()
            .switchMap(id => Store.getUser(id))
            .subscribe((nextModel) => this.setState({ model: nextModel }))
    );
}
*/

const mapToProps5 = (props$) => {
    const model$ = props$
        .map(props => props.id)
        .distinctUntilChanged()
        .switchMap(id => Store.getUser(id));

    return Rx.Observable.combineLatest(props$, model$, (props, model) => ({
      ...props,
      model
    }));
};

/*
const createRxComponent = props$ => {
  const increment$ = funcSubject(); // handleIncrement
  const count$ = increment$
    .startWith(0) // state = { count: 0 }
    .scan(count => count + 1); // this.setState((state) => ({ count: count + 1 }))

  return Observable.combineLatest(props$, count$, (props, count) => ({
    ...props,
    increment: increment$,
    count
  }));
};
*/

class AppItem5 extends Component {

    props: PropsType;

    render() {
        const { id, model } = this.props;

        console.info(`RENDER ITEM: ${id}`);

        if (model) {
            return (
                <div>
                    <span>name: {model.name}</span> &nbsp;&nbsp;
                    <span>age: {model.age}</span> &nbsp;&nbsp;
                    <span style={{cursor: 'pointer'}} onClick={this._refresh.bind(this)}>Refresh</span>
                </div>
            );
        }

        return (
            <div> {'loading ' + id} </div>
        );
    }

    _refresh() {
        const { id } = this.props;
        Store.refresh(id);
    }
}

export default createRxComponent(mapToProps5, AppItem5);
