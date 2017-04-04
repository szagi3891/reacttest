//@flow 

import React, { Component } from 'react';
import { Observable, BehaviorSubject } from 'rxjs';

import Store from './Store';
import { createRxComponent } from './Base';

import type { PageContextType } from './Store';

type PropsInType = {|
    pageid: string,
|};

type PropsOutType = {|       //TODO - exact nie działa
    pagedata: PageContextType | null,
    editMode: bool,
    currentUser: string | null,
    toogleEditMode: () => void,
|};

const mapToProps = (props$: Observable<PropsInType>): Observable<PropsOutType> => {
    const pagedata$ = props$
        .map((props: PropsInType): string => props.pageid)
        .switchMap(pageid => Store.get(pageid));
    
    const curentUser$ = Store.getCurrentUser();

    const editMode$: BehaviorSubject<bool> = new BehaviorSubject(false);

    const toogleEditMode = () => {
        const current = editMode$.getValue();
        editMode$.next(!current);
    };

    return Observable.combineLatest(editMode$, pagedata$, curentUser$, (editMode, pagedata, currentUser) => ({
        pagedata,
        editMode,
        currentUser,
        toogleEditMode 
    }));
};

const renderUserBox = (currentUser: string | null, toogleEditMode: () => void, editMode: bool): React.Element<*> | null => {
    if (currentUser === null) {
        return null;
    } else {
        if (editMode) {
            return (
                <div onClick={toogleEditMode}>{currentUser} - Turn off edit</div>
            );
        } else {
            return (
                <div onClick={toogleEditMode}>{currentUser} - Turn on edit</div>
            );
        }
    }
};

const renderEditPage = (title: string): React.Element<*> => {
    return (
        <input defaultValue={title} />
    )
};

const renderPage = (title: string, currentUser: string | null, toogleEditMode: () => void, editMode: bool): React.Element<*> => {
    return (
        <span>
            { renderUserBox(currentUser, toogleEditMode, editMode) }
            { currentUser && editMode ? renderEditPage(title) : `page ${title}`}
        </span>
    );
};

const PagepFn = (props: PropsOutType): React.Element<*> => {
    console.info('page - mam takie propsy', props);

    const { pagedata, currentUser, toogleEditMode, editMode } = props;

    return (
        <div className="Page">
            { pagedata === null ? "loading" : renderPage(pagedata.page.title, currentUser, toogleEditMode, editMode) }
        </div>
    );
};

const PageExport: (props: PropsInType) => React.Element<*> = createRxComponent(mapToProps, PagepFn);
export default PageExport;