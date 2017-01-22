/* @flow */
import React, { Component } from 'react';
import logo from './static/logo.svg';
import AppItem from './AppItem';
import './static/App.css';
import Store from './Store';
import Suggester from './Suggester';
import Form from './Form';
import { createRxComponent } from './Base';
import { Observable, BehaviorSubject } from 'rxjs';

type PropsInType = {};

type PropsOutType = {       //TODO - exact nie działa
    list: Array<string>,
    addNew: () => void,
    update: () => void,
};

const mapToProps = (props$: Observable<PropsInType>): Observable<PropsOutType> => {

    const list$ = new BehaviorSubject(['0','1','2','3','4']);

    const addNew = () => {
        const currentList = list$.getValue();
        const newId = currentList.length.toString();
        list$.next(currentList.concat([newId]));
    };

    const update = () => {
        Store.updateAge('2', '444');
    };

    return list$.map((list) => {
        return {
            list: list,
            addNew: addNew,
            update: update
        };
    });
};

class App extends Component {

    props: PropsOutType;

    render() {
        const { addNew, update } = this.props;

        return (
            <div className="App">
                <div className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h2>Welcome to React</h2>
                </div>
                <div style={{marginTop: '20px', marginBottom: '20px'}}>
                    <button onClick={addNew}>Dodaj kolejny element</button>
                    <button onClick={update}>Niespodziewany update drugiego elementu</button>
                </div>
                <div className="list">
                    <div className="listLeft">
                        { this._renderList() }
                    </div>
                    <div className="listRight">
                        { this._renderList() }
                    </div>
                </div>

                <Suggester />

                <div style={{border: "1px solid black", padding: "20px"}}>
                    <Form />
                </div>

                <br/>

                <div style={{border: "1px solid black", padding: "20px"}}>
                    <Form />
                </div>
            </div>
        );
    }

    _renderList() {
        const { list } = this.props;

        return list.map((itemId) => <AppItem key={itemId} id={itemId} />);
    }
}


const AppFn = (props: PropsOutType): React.Element<*> => {
    return (
        <App {...props} />
    );
};

const AppExport: (props: PropsInType) => React.Element<*> = createRxComponent(mapToProps, AppFn);

export default AppExport;
