// @flow

import React from 'react';
import logo from './logo.svg';
import './App.css';

import { createRxComponent } from './Base';
import Store from './Store';

type PropsInType = {||};

type PropsOutType = {|
    data: string,
|};

const mapToProps = (props$: Observable<PropsInType>): Observable<PropsOutType> => {
    return Store.data$.map(
        (data: string) => ({
            data
        })
    );
};

const AppFn = (props: PropsOutType): React.Element<*> => {
    console.warn('rerender ....');

    const { data } = props;

    return (
        <div className="App">
            <div className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <h2>Welcome to React "{data}"</h2>
            </div>
            <p className="App-intro">
                To get started, edit <code>src/App.js</code> and save to reload.
            </p>
        </div>
    );
};

const App: (props: PropsInType) => React.Element<*> = createRxComponent(mapToProps, AppFn);
export default App;
