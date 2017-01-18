/* @flow */
import React/*, { Component }*/ from 'react';
import Rx from 'rxjs';

import { createRxComponent } from './Base5';
//import { createRxComponent } from './Test';
import Store from './Store';

type ItemType = {
    name: string,
    age: string,
};

type PropsTypeIn = {|
    id: string,
|};

type PropsTypeOut = {
    id: string,
    model: ItemType | null,
};

const mapToProps5 = (props$: rxjs$Observable<PropsTypeIn>): rxjs$Observable<PropsTypeOut> => {
    const model$ = props$
        .map(props => props.id)
        .distinctUntilChanged()
        .switchMap(id => Store.getUser(id));

        //.switchMap(id => Store.getUser(id));  ---> .switchMap(id => Store.getUser(id).map( -> model + metoda refresh ));
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

const AppItem5 = (props: PropsTypeOut): React.Element<*> => {
    const { id, model } = props;
    const refresh = () => {
        Store.refresh(id);
    };

    console.info(`RENDER ITEM: ${id}`);

    if (model) {
        return (
            <div>
                <span>name: {model.name}</span> &nbsp;&nbsp;
                <span>age: {model.age}</span> &nbsp;&nbsp;
                <span style={{cursor: 'pointer'}} onClick={refresh}>Refresh</span>
            </div>
        );
    }

    return (
        <div> {'loading ' + id} </div>
    );
};

const AppItem5Bis: (props: PropsTypeIn) => React.Element<*> = createRxComponent(mapToProps5, AppItem5);

export default AppItem5Bis;

//export default createRxComponent(mapToProps5, AppItem5);
//export default createRxComponent<PropsTypeIn, PropsTypeOut>(mapToProps5, AppItem5);
