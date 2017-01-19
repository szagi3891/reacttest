/* @flow */
import React, { Component } from 'react';
import logo from './static/logo.svg';
import AppItem from './AppItem';
import './static/App.css';
import Store from './Store';
import Suggester from './Suggester';
import Form from './Form';
import { createRxComponent } from './Base';
import Rx from 'rxjs';

type PropsInType = {};

type PropsOutType = {
    list: Array<string>,
    addNew: () => void,
};

const mapToProps = (props$: rxjs$Observable<PropsInType>): rxjs$Observable<PropsOutType> => {
/*
    const dd = {
        list: ['0','1','2','3','4'],
        addNew: () => {
            console.warn('ADD NEW');
        }
    };

    return props$.map((props: PropsInType): PropsOutType => dd);
*/
    const action$ = new Rx.Subject();

    const addNew = () => {
        console.warn('ADD NEW2');
        action$.next();
    };

    const initValue = ['0','1','2','3','4'];

    const reducer = (state: Array<string>, action: void): Array<string> => {
        console.warn('redukcja', state);
        const newId = state.length.toString();
        return state.concat([newId]);
    };

    const store$ = action$
        .scan(reducer, initValue)             //scan oraz startWith - nowa maszynka stanu + natychmiastowa emisja początkowego stanu
        .startWith(initValue)
        .map((list) => {
            return {
                list: list,
                addNew: addNew
            };
        });

    return store$;
/*
    return Rx.Observable.of({
        list: ['0','1','2','3','4'],
        addNew: () => {
            console.warn('ADD NEW');
        }
    });
*/
};

class App extends Component {

    props: PropsOutType;

    render() {
        const { addNew } = this.props;

        return (
            <div className="App">
                <div className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h2>Welcome to React</h2>
                </div>
                <div style={{marginTop: '20px', marginBottom: '20px'}}>
                    <button onClick={addNew}>Dodaj kolejny element</button>
                    <button onClick={this._update.bind(this)}>Niespodziewany update drugiego elementu</button>
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

    _update() {
        Store.updateAge('2', '444');
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
