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
    currentUser: string | null,
|};

const mapToProps = (props$: Observable<PropsInType>): Observable<PropsOutType> => {

    const currentUser$ = Store.getCurrentUser();

    const interval$ = Observable.interval(1000).map(value => value + 1).startWith(0);

    return Observable.combineLatest(currentUser$, interval$, (currentUser, interval) => ({
        interval,
        currentUser
    }));
};

const renderCurrentUser = (currentUser: string | null): React.Element<*> => {
    if (currentUser === null) {
        return (
            <span>
                Użytkownik niezalogowany
            </span>
        );
    } else {
        return (
            <span>
                Aktualnie zalogowany użytkownik: {currentUser}
            </span>
        );
    }
};

const AppFn = (props: PropsOutType): React.Element<*> => {
    const { interval, currentUser } = props;

    return (
        <div className="App">
            dadas - funkcyjnie, {interval}, { renderCurrentUser(currentUser) }
            <Page
                pageid="page32"
            />
        </div>
    );
};

const AppExport: (props: PropsInType) => React.Element<*> = createRxComponent(mapToProps, AppFn);
export default AppExport;

//export default createRxComponent(mapToProps, AppFn);
