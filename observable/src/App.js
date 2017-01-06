/* @flow */
import React, { Component } from 'react';
import logo from './logo.svg';
import AppItem3 from './AppItem3';
import './App.css';
import Store from './Store';
import Suggester from './Suggester';

type StateType = {
    list: Array<string>
};

class App extends Component {

    state: StateType;

    constructor() {
        super();

        this.state = {
            list: ['0','1','2','3','4']
        };
    }

    render() {
        return (
            <div className="App">
                <div className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h2>Welcome to React</h2>
                </div>
                <div style={{marginTop: '20px', marginBottom: '20px'}}>
                    <button onClick={this._addNew.bind(this)}>Dodaj kolejny element</button>
                    <button onClick={this._update.bind(this)}>Niespodziewany update drugiego elementu</button>
                </div>
                <div className="list">
                    <div className="listLeft">
                        {this._renderList()}
                    </div>
                    <div className="listRight">
                        {this._renderList()}
                    </div>
                </div>

                <Suggester />
            </div>
        );
    }

    _addNew() {
        const { list } = this.state;
        this.setState({
            list: list.concat([list.length.toString()])
        });
    }

    _update() {
        Store.updateAge('2', '444');
    }

    _renderList() {
        const { list } = this.state;

        return list.map((itemId) => <AppItem3 key={itemId} id={itemId} />);
    }
}

export default App;
