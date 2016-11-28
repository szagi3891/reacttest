/* @flow */

import React, { PureComponent } from 'react';
import logo from './logo.svg';
import './App.css';
import UserModel from './Models/UserModel';
import ListItems from './Lista';
import { List } from 'immutable';
import BookModel from './Models/BookModel';

type StateType = {|
    list: List<UserModel>,
    books: List<BookModel>,
|};

class App extends PureComponent {

    state: StateType;

    constructor() {
        super();

        const list: List<UserModel> = List.of(
            new UserModel({
                id: 4,
                firstName: 'user1a',
                lastName: 'user1b',
                tags: []
            }),
            new UserModel({
                id: 66,
                firstName: 'user2a',
                lastName: 'user2b',
                tags: []
            }),
            new UserModel({
                id: 429,
                firstName: 'user3a',
                lastName: 'user3b',
                tags: ['aa', 'bb', 'cc']
            }),
            new UserModel({
                id: 450,
                firstName: 'user4a',
                lastName: 'user4b',
                tags: []
            }),
            new UserModel({
                id: 590,
                firstName: 'user5a',
                lastName: 'user5b',
                tags: []
            }),
            new UserModel({
                id: 492,
                firstName: 'user6a',
                lastName: 'user6b',
                tags: []
            })
        );

        const books = List.of(
            new BookModel({
                id: '321',
                title: 'Antek',
                idn: '4355-42-32',
                autors: List.of('Lewandowski', 'Ten od żab')
            }),
            new BookModel({
                id: '6423',
                title: 'Książka o żabach',
                idn: '4355-4232-765',
                autors: List.of('Mickiewicz', 'Słowak')
            }),
            new BookModel({
                id: '95843',
                title: 'O nieznanym tytule',
                idn: '321-312-121321',
                autors: List.of('Autor1', 'Autor2')
            }),
        );

/*
        const bookItem = new BookModel({
            id: '321',
            title: 'Antek',
            idn: '4355-42-32',
            autors: List.of('Lewandowski', 'Ten od żab')
        });
        bookItem.title = 'dasda';
        console.warn(bookItem.title);
*/

        this.state = {
            list: list,
            books: books
        };
        
        setInterval(() => {
            const newList = this.state.list.update(3, (item: UserModel): UserModel => {
                return item.update({
                    lastName: item.lastName + '!'
                });
            });

            this.setState({
                list: newList
            });
        }, 5000);
        
        setInterval(() => {
            const newList = this.state.list.update(4, (item: UserModel): UserModel => {
                return item.update({
                    tags: item.tags.push('!')
                });
            });

            this.setState({
                list: newList
            });
        }, 7000);

        setInterval(() => {
            const newList = this.state.books.update(2, (item: BookModel): BookModel => {
                return item.update({
                    autors: item.autors.push('nn')
                });
            });

            this.setState({
                books: newList
            });
        }, 11000);

        const bo = new BookModel({
            id: '321',
            title: 'Antek',
            idn: '4355-42-32',
            autors: List.of('Lewandowski', 'Ten od żab')
        });

        const bo2 = bo.update({
            title: 'Antek 222 po updejt'
        });

        console.info('bo2', bo2.title, bo2.idn, bo2.autors.join('-'));

        console.info('dowolna', bo2.dowolna());
    }

    render() {
        const {list, books} = this.state;
        
        console.warn('główny render', list);

        return (
            <div className="App">
                <div className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h2>Welcome to React</h2>
                </div>
                <p className="App-intro">
                    To get started, edit <code>src/App.js</code> and save to reload.
                </p>
                <ListItems list={list} books={books} />
            </div>
        );
    }
}

export default App;
