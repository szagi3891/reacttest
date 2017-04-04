//@flow 

import React, { Component } from 'react';
import { Observable, BehaviorSubject } from 'rxjs';

import Store from './Store';
import { createRxComponent } from './Base';

import type { PageItemType } from './Store';

type PropsInType = {|
    pageid: string,
|};

type PropsOutType = {|       //TODO - exact nie działa
    pagedata: PageItemType | null,
    currentUser: string | null,
    setEdit: () => void,
|};

const mapToProps = (props$: Observable<PropsInType>): Observable<PropsOutType> => {
    const pagedata$ = props$
        .map((props: PropsInType): string => props.pageid)
        .switchMap(pageid => Store.get(pageid));
    
    const curentUser$ = Store.getCurrentUser();

    return Observable.combineLatest(props$, pagedata$, curentUser$, (props, pagedata, currentUser) => ({
        pagedata,
        currentUser,
        setEdit: () => {
            Store.setEdit(props.pageid);
        }
    }));
};

const renderUserBox = (currentUser: string | null, setEdit: () => void): React.Element<*> | null => {
    if (currentUser === null) {
        return null;
    } else {
        return (
            <div onClick={setEdit}>Set Edit</div>
        );
    }
};


const renderPage = (title: string, currentUser: string | null, setEdit: () => void): React.Element<*> => {
    return (
        <span>
            { renderUserBox(currentUser, setEdit) }
            { `page ${title}` }
        </span>
    );
};

const PagepFn = (props: PropsOutType): React.Element<*> => {
    console.info('page - mam takie propsy', props);

    const { pagedata, currentUser, setEdit } = props;

    return (
        <div className="Page">
            { pagedata === null ? "loading" : renderPage(pagedata.title, currentUser, setEdit) }
        </div>
    );
};

const PageExport: (props: PropsInType) => React.Element<*> = createRxComponent(mapToProps, PagepFn);
export default PageExport;