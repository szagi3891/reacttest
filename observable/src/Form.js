/* @flow */
import React from 'react';
import Rx from 'rxjs';

import BaseComponent3 from './BaseComponent3';

type MessageItem = {
    id: string,
    message: string
};

type StateType = {
    message1: string | null,
    message2: string | null,
    message3: string | null,
    messages: Array<MessageItem>,
};

class Form extends BaseComponent3 {

    props: {};
    state: StateType;
    _mount: bool;

    input1$: rxjs$Subject<string>;
    input2$: rxjs$Subject<string>;
    input3$: rxjs$Subject<string>;
    submit$: rxjs$Subject<void>;

    constructor(props: {}) {
        super(props);

        this.state = {
            message1: '',
            message2: '',
            message3: '',
            messages: [],
        };

        this.input1$ = new Rx.Subject();
        this.input2$ = new Rx.Subject();
        this.input3$ = new Rx.Subject();
        this.submit$ = new Rx.Subject();

        const message1$ = this.input1$
            .startWith('')
            .map(value => value.length > 3 ? 'Podaj maksymalnie 3 znaki' : null);

        const message2$ = this.input2$
            .startWith('')
            .map(value => value !== 'xx' ? 'Proszę wprowadzić frazę "xx"': null);

        const message3$ = this.input3$
            .startWith('')
            .map(value => value !== 'rr' ? 'Proszę wprowadzić frazę "rr"': null);

        const messages$ = Rx.Observable.combineLatest(message1$, message2$, message3$, (message1, message2, message3) => {
            const messages = [];

            if (message1 !== null) {
                messages.push({
                    id: 'message1',
                    message: message1
                });
            }

            if (message2 !== null) {
                messages.push({
                    id: 'message2',
                    message: message2
                });
            }

            if (message3 !== null) {
                messages.push({
                    id: 'message3',
                    message: message3
                });
            }

            return messages;
        }).distinctUntilChanged();

        const state$ = Rx.Observable.combineLatest(
            message1$,
            message2$,
            message3$,
            messages$,
            (
                message1,
                message2,
                message3,
                messages
            ): StateType => {
            return {
                message1,
                message2,
                message3,
                messages
            };
        });

        state$.subscribe((state: StateType) => {
            if (this._mount === true) {
                this.setState(state);
            } else {
                this.state = state;
            }
        });
        //.debounceTime(1000)
    }

    componentWillMount() {
        this._mount = true;
    }

    componentWillUnmount() {
        this._mount = false;
    }

    _onChange1(e: Object) {
        console.warn('on change 1', this.input1$);
        this.input1$.next(e.target.value);
    }
    _onChange2(e: Object) {
        this.input2$.next(e.target.value);
    }
    _onChange3(e: Object) {
        this.input3$.next(e.target.value);
    }

    _onSubmit(e: Object) {
      this.submit$.next();
    }

    render(): React.Element<*> {
        const { message1, message2, message3, messages} = this.state;

        return (
            <div className="test_form">

                <input onChange={this._onChange1.bind(this)} />
                { message1 ? <div style={{color: 'red'}}>{message1}</div> : null }

                <br/><br/>

                <input onChange={this._onChange2.bind(this)} />
                { message2 ? <div style={{color: 'red'}}>{message2}</div> : null }

                <br/><br/>

                <input onChange={this._onChange3.bind(this)} />
                { message3 ? <div style={{color: 'red'}}>{message3}</div> : null }

                <br/><br/>

                { messages.length > 0 ? this._showMessages(messages): null}
                <button onClick={this._onSubmit.bind(this)}>Wyślij</button>
            </div>
        );
    }

    _showMessages(messages: Array<MessageItem>): React.Element<*> {
        return (
            <ul>
                { messages.map(this._showMessageItem.bind(this)) }
            </ul>
        );
    }

    _showMessageItem(item: MessageItem): React.Element<*> {
        return (
            <li key={item.id}>
                {item.message}
            </li>
        );
    }
}

export default Form;
