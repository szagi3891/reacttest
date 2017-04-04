//@flow

import React, { Component } from 'react';
import './App.css';
import { Observable, BehaviorSubject } from 'rxjs';
import { createRxComponent } from './Base';
import Store from './Store';
import Page from './Page';

type PropsInType = {|
|};

type PropsOutType = {|       //TODO - exact nie działa
    interval: number,
|};

const mapToProps = (props$: Observable<PropsInType>): Observable<PropsOutType> => {
    console.info('!!!! inicjujace propsy');

    //TODO - w tym miejscu można inicjujące propsy wpisać do stor-a

    const interval$ = Observable.interval(1000).map(value => value + 1).startWith(0);

    return interval$.map((interval: number) => {
        console.warn('tick');
        return {
            interval
        };
    });
};

const AppFn = (props: PropsOutType): React.Element<*> => {
    console.info('mam takie propsy', props);
    const { interval } = props;

    return (
        <div className="App">
            dadas - funkcyjnie, {interval}
            <Page pageid="page32" />
        </div>
    );
};

const AppExport: (props: PropsInType) => React.Element<*> = createRxComponent(mapToProps, AppFn);
export default AppExport;

//export default createRxComponent(mapToProps, AppFn);
