/* @flow */
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import User from './Models/User';
import ListItems from './Lista';
import { List } from 'immutable';

type StateType = {
    list: List<User>,
};

class App extends Component {

    state: StateType;

    constructor() {
        super();

        const list: List<User> = List.of(
            new User({
                id: 4,
                firstName: 'user1a',
                lastName: 'user1b',
                tags: []
            }),
            new User({
                id: 66,
                firstName: 'user2a',
                lastName: 'user2b',
                tags: []
            }),
            new User({
                id: 429,
                firstName: 'user3a',
                lastName: 'user3b',
                tags: ['aa', 'bb', 'cc']
            }),
            new User({
                id: 450,
                firstName: 'user4a',
                lastName: 'user4b',
                tags: []
            }),
            new User({
                id: 590,
                firstName: 'user5a',
                lastName: 'user5b',
                tags: []
            }),
            new User({
                id: 492,
                firstName: 'user6a',
                lastName: 'user6b',
                tags: []
            })
        );

        this.state = {
            list: list
        };
        
        setInterval(() => {
            const newList = this.state.list.update(3, (item: User): User => {
                return item.update({
                    lastName: item.lastName + '!'
                });
            });

            this.setState({
                list: newList
            });
        }, 4000);
        
        setInterval(() => {
            const newList = this.state.list.update(4, (item: User): User => {
                return item.update({
                    tags: item.tags.push('!')
                });
            });

            this.setState({
                list: newList
            });
        }, 5000);
    }

    render() {
        const list_items = this.state.list;

        console.warn('wysyłam listę', list_items);

        return (
            <div className="App">
                <div className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h2>Welcome to React</h2>
                </div>
                <p className="App-intro">
                    To get started, edit <code>src/App.js</code> and save to reload.
                </p>
                <ListItems list={list_items} />
            </div>
        );
    }
}

export default App;
