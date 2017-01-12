/* @flow */
import React, { Component } from 'react';
import Rx from 'rxjs';

//import { createRxComponent/*, shouldComponentUpdate*/ } from './Base5';
import { createRxComponent } from './Test';
import Store from './Store';

type ItemType = {
    name: string,
    age: string,
};

type PropsTypeIn = {
    id: string,
};

type PropsTypeOut = {
    id: string,
    model: ItemType | null,
};

const mapToProps5 = (props$: rxjs$Observable<PropsTypeIn>): rxjs$Observable<PropsTypeOut> => {
    const model$ = props$
        .map(props => props.id)
        .distinctUntilChanged()
        .switchMap(id => Store.getUser(id));
/*
    const timer$ = Rx.Observable.interval(1000)
          .map(i => i % 2).startWith(true);
*/

    return Rx.Observable.combineLatest(props$, model$, (props, model) => ({
      ...props,
      model
      //timerOdd
    }));
};

class AppItem5 extends Component {

    //shouldComponentUpdate = shouldComponentUpdate;

    props: PropsTypeOut;

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
