//@flow 

import React, { Component } from 'react';
import { Observable } from 'rxjs';

import Store from './Store';
import { createRxComponent } from './Base';

import type { PageItemType } from './Store';

type PropsInType = {|
    pageid: string
|};

type PropsOutType = {|       //TODO - exact nie działa
    pagedata: PageItemType | null,
|};

const mapToProps = (props$: Observable<PropsInType>): Observable<PropsOutType> => {
    return props$
        .map((props: PropsInType): string => props.pageid)
        .switchMap(pageid => Store.get(pageid))
        .map((pagedata: PageItemType | null): PropsOutType => ({
            pagedata
        }));
};

const PagepFn = (props: PropsOutType): React.Element<*> => {
    console.info('page - mam takie propsy', props);

    const { pagedata } = props;

    return (
        <div className="Page">
            { pagedata === null ? (
                "loading"
            ) : (
                `page ${pagedata.title}`
            )}
        </div>
    );
};

const PageExport: (props: PropsInType) => React.Element<*> = createRxComponent(mapToProps, PagepFn);
export default PageExport;