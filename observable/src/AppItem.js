/* @flow */
import React/*, { Component }*/ from 'react';
import Rx from 'rxjs';

import { createRxComponent } from './Base';
//import { createRxComponent } from './Test';
import Store from './Store';

type ItemType = {
    name: string,
    age: string,
};

type PropsInType = {|
    id: string,
|};

type PropsOutType = {
    id: string,
    model: ItemType | null,
};

const mapToProps = (props$: rxjs$Observable<PropsInType>): rxjs$Observable<PropsOutType> => {
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

//TODO - sprawdzić czy jak się utowrzy PropsTypeOut lekko zmodyfikowany, to czy rzuci błędem że jest niezgodność

const AppItem = (props: PropsOutType): React.Element<*> => {
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

const AppItemExport: (props: PropsInType) => React.Element<*> = createRxComponent(mapToProps, AppItem);

export default AppItemExport;
