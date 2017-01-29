/* @flow */

import React from 'react';
import PureComponent from './PureComponent';
import logo from './logo.svg';
import './App.css';
import UserModel from './Models/UserModel';
import ListItems from './Lista';
import { List } from 'immutable';
import BookModel from './Models/BookModel';

type modeType = 'idle' | 'update1' | 'update2' | 'update3';

type StateType = {|
    mode: modeType,
    list: List<UserModel>,
    books: List<BookModel>,
|};

class Buttons extends PureComponent {

    propsType: {|
        mode: modeType,
        updateMode: (newMode: modeType) => void,
    |};

    render(): React.Element<*> {
        const {mode} = this.props;

        return (
            <div>
                { this._renderButton(mode === 'idle'   , 'idle'   , this._onClick0.bind(this)) }
                { this._renderButton(mode === 'update1', 'update1', this._onClick1.bind(this)) }
                { this._renderButton(mode === 'update2', 'update2', this._onClick2.bind(this)) }
                { this._renderButton(mode === 'update3', 'update3', this._onClick3.bind(this)) }
            </div>
        );
    }

    _renderButton(isDisable: bool, label: string, callback: () => void): React.Element<*> {

        const attr = isDisable ? {
            disabled: 'disabled'
        } : {
            onClick: callback
        };

        return (
            <button {...attr}>{label}</button>
        );
    }

    _onClick0() {
        this.props.updateMode('idle');
    }
    _onClick1() {
        this.props.updateMode('update1');
    }
    _onClick2() {
        this.props.updateMode('update2');
    }
    _onClick3() {
        this.props.updateMode('update3');
    }
}

class App extends PureComponent {

    state: StateType;

    _timer1: number;
    _timer2: number;
    _timer3: number;
    _timer4: number;

    constructor() {
        super();

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
            mode: 'idle',
            list: this._getInitList(),
            books: this._getInitBook()
        };

        this._refreshTimers();

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
        const {mode, list, books} = this.state;

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

                <Buttons
                    mode={mode}
                    updateMode={this._updateMode.bind(this)}
                />

                <ListItems list={list} books={books} />
            </div>
        );
    }

    _updateMode(newMode: modeType) {
        this.setState({
            mode: newMode
        }, this._refreshTimers.bind(this));
    }

    _refreshTimers() {
        const { mode } = this.state;

        this._clearTimer(this._timer1);
        this._clearTimer(this._timer2);
        this._clearTimer(this._timer3);
        this._clearTimer(this._timer4);
        
        if (mode === 'update1') {

            this._timer1 = setInterval(() => {
                console.info('timer1 exec');
                const newList = this.state.list.update(3, (item: UserModel): UserModel => {
                    return item.update({
                        lastName: item.lastName + '!'
                    });
                });

                this.setState({
                    list: newList
                });
            }, 5000);

            this._timer2 = setInterval(() => {
                console.info('timer2 exec');
                const newList = this.state.list.update(4, (item: UserModel): UserModel => {
                    return item.update({
                        tags: item.tags.push('!')
                    });
                });

                this.setState({
                    list: newList
                });
            }, 7000);
        }

        if (mode === 'update2') {
            this._timer3 = setInterval(() => {
                console.info('timer3 exec');
                const newList = this.state.books.update(2, (item: BookModel): BookModel => {
                    return item.update({
                        autors: item.autors.push('nn')
                    });
                });

                this.setState({
                    books: newList
                });
            }, 5000);
        }

        if (mode === 'update3') {
            this._timer4 = setInterval(() => {
                console.info('timer4 exec');
                this.setState({
                    books: this._getInitBook()
                });
            }, 3000);
        }
    }

    _clearTimer(timer: number | null) {
        if (timer) {
            clearInterval(timer);
        }
    }

    _getInitList(): List<UserModel> {
        return List.of(
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
    }

    _getInitBook(): List<BookModel> {
        return List.of(
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
    }
}

export default App;
