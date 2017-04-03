//@flow

import React, { Component } from 'react';
import './App.css';
import { Observable, BehaviorSubject } from 'rxjs';
import { createRxComponent } from './Base';

type PageItemType = {
    title: string,
    body: string
};

type PropsInType = {|
    init: {
        [string]: PageItemType
    },
|};

type PropsOutType = {|       //TODO - exact nie działa
    get: (pageId: string) => Observable<PageItemType>,
    interval: Observable<number>,
|};

const mapToProps = (props$: Observable<PropsInType>): Observable<PropsOutType> => {
    return props$.take(1).switchMap(props => {
        console.info('!!!! inicjujace propsy', props);
                                        //stor na strony statyczne
        const data = new Map();

        //TODO - w tym miejscu można inicjujące propsy wpisać do stor-a

        const interval$ = Observable.interval(1000).map(value => value + 1).startWith(0);

        return interval$.map((intervalValue: number) => {
            console.warn('pierwszy tick');

            return {
                get : (pageId: string): Observable<PageItemType> => {
                    return Observable.of({
                        title: 'test33',
                        body: 'test33'
                    });
                },
                interval: intervalValue
            };
        });
    });
};

const AppFn = (props: PropsOutType): React.Element<*> => {
    console.info('mam takie propsy', props);
    const { interval } = props;

    return (
        <div className="App">
            dadas - funkcyjnie, {interval}
        </div>
    );
};

const AppExport: (props: PropsInType) => React.Element<*> = createRxComponent(mapToProps, AppFn);
export default AppExport;

//export default createRxComponent(mapToProps, AppFn);
