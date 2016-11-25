import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import User from './Models/User';
import { List } from 'immutable';

class App extends Component {

    constructor() {
        this.state = List.of([
            User({
                firstName: 'user1a',
                lastName: 'user1b'
            }),
            User({
                firstName: 'user2a',
                lastName: 'user2b'
            }),
            User({
                firstName: 'user3a',
                lastName: 'user3b'
            })
        ])
    }

    render() {
        return (
            <div className="App">
                <div className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h2>Welcome to React</h2>
                </div>
                <p className="App-intro">
                    To get started, edit <code>src/App.js</code> and save to reload.
                </p>
                <List list={list} />
            </div>
        );
    }
}

export default App;
