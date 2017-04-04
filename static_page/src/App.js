//@flow

import React, { Component } from 'react';
import './App.css';
import { Observable, BehaviorSubject } from 'rxjs';
import { createRxComponent } from './Base';
import Store from './Store';
import Page from './Page';
import type { EditingType } from './Store';

type PropsInType = {|
|};

type PropsOutType = {|       //TODO - exact nie działa
    interval: number,
    currentUser: string | null,
    currentEdited: EditingType | null,
    editingCancel: () => void,
|};

const mapToProps = (props$: Observable<PropsInType>): Observable<PropsOutType> => {

    const interval$ = Observable.interval(1000).map(value => value + 1).startWith(0);
    const currentUser$ = Store.getCurrentUser();
    const currentEdited$ = Store.getCurrentEdited();

    return Observable.combineLatest(currentUser$, interval$, currentEdited$, (currentUser, interval, currentEdited) => ({
        interval,
        currentUser,
        currentEdited,
        editingCancel: () => {
            Store.turnOffEdit();
        }
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

const renderEditPage = (currentEdited, editingCancel): React.Element<*> => {
    return (
        <div>
            <input value={currentEdited.title} />
            <input value={currentEdited.body} />
            <div onClick={editingCancel}>Cancel</div>
        </div>
    );
};

const AppFn = (props: PropsOutType): React.Element<*> => {
    const { interval, currentUser, currentEdited, editingCancel } = props;

    return (
        <div className="App">
            dadas - funkcyjnie, {interval}, { renderCurrentUser(currentUser) }
            { currentUser && currentEdited !== null ? renderEditPage(currentEdited, editingCancel) : <Page pageid="page32" /> }
        </div>
    );
};

const AppExport: (props: PropsInType) => React.Element<*> = createRxComponent(mapToProps, AppFn);
export default AppExport;

//export default createRxComponent(mapToProps, AppFn);
