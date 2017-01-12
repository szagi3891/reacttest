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
    sender1: (value: SyntheticEvent) => void,
    sender2: (value: SyntheticEvent) => void,
    sender3: (value: SyntheticEvent) => void,
    submit: (value: SyntheticEvent) => void,
};

//: rxjs$Subject<string | null>

type SenderSubjectType<T> = {
    send: rxjs$Observable<(value: T) => void>,
    receive: rxjs$Observable<T>
};

function senderSubject<T>(): SenderSubjectType<T> {
    const subject: rxjs$Subject<T> = new Rx.Subject();

    const sendValue = (value: T) => {
        subject.next(value);
    };
    const behaviorSubject: rxjs$BehaviorSubject<(value: T) => void> = new Rx.BehaviorSubject(sendValue);

    return {
        receive: subject.asObservable(),
        send: behaviorSubject.asObservable()
    };
}

class Form extends BaseComponent3 {

    props: {};
    state: StateType;
    _mount: bool;

    constructor(props: {}) {
        super(props);

        const sender1: SenderSubjectType<SyntheticEvent> = senderSubject();
        const sender2: SenderSubjectType<SyntheticEvent> = senderSubject();
        const sender3: SenderSubjectType<SyntheticEvent> = senderSubject();
        const submit : SenderSubjectType<SyntheticEvent> = senderSubject();

        const message1$: rxjs$Observable<string | null> = sender1.receive
            .map((e: SyntheticEvent): string => e.target instanceof HTMLInputElement ? e.target.value : '')
            .startWith('')
            .map(value => value.length > 3 ? 'Podaj maksymalnie 3 znaki' : null);

        const message2$ = sender2.receive
            .map((e: SyntheticEvent): string => e.target instanceof HTMLInputElement ? e.target.value : '')
            .startWith('')
            .map(value => value !== 'xx' ? 'Proszę wprowadzić frazę "xx"': null);

        const message3$ = sender3.receive
            .map((e: SyntheticEvent): string => e.target instanceof HTMLInputElement ? e.target.value : '')
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

        const combineResult = (
            message1: string | null,
            message2: string | null,
            message3: string | null,
            messages: Array<MessageItem>,
            sender1: (value: SyntheticEvent) => void,
            sender2: (value: SyntheticEvent) => void,
            sender3: (value: SyntheticEvent) => void,
            submit: (value: SyntheticEvent) => void
        ): StateType => {
            return {
                message1: message1,
                message2: message2,
                message3: message3,
                messages: messages,
                sender1: sender1,
                sender2: sender2,
                sender3: sender3,
                submit: submit
            };
        };

        const state$: rxjs$Observable<StateType> = Rx.Observable.combineLatest(
            message1$,
            message2$,
            message3$,
            messages$,
            sender1.send,
            sender2.send,
            sender3.send,
            submit.send,
            combineResult
        );

        state$.subscribe((state: StateType) => {
            if (this._mount === true) {
                this.setState(state);
            } else {
                this.state = state;
            }
        });

/*
        this.onProps((propsStream: rxjs$Observable<PropsType>): rxjs$Subscription =>
            state$.subscribe((state: StateType) => this.setState(state))
        );
*/

/*
this.onProps((propsStream: rxjs$Observable<PropsType>): rxjs$Subscription =>
    propsStream
        .map(props => props.id)
        .distinctUntilChanged()
        .switchMap(id => Store.getUser(id))
        .subscribe((nextModel) => this.setState({ model: nextModel }))
);
*/
        //.debounceTime(1000)
    }

    componentWillMount() {
        this._mount = true;
    }

    componentWillUnmount() {
        this._mount = false;
    }

    render(): React.Element<*> {
        const { message1, message2, message3, messages, sender1, sender2, sender3, submit} = this.state;

        return (
            <div className="test_form">

                <input onChange={sender1} />
                { message1 ? <div style={{color: 'red'}}>{message1}</div> : null }

                <br/><br/>

                <input onChange={sender2} />
                { message2 ? <div style={{color: 'red'}}>{message2}</div> : null }

                <br/><br/>

                <input onChange={sender3} />
                { message3 ? <div style={{color: 'red'}}>{message3}</div> : null }

                <br/><br/>

                { messages.length > 0 ? this._showMessages(messages): null}
                <button onClick={submit}>Wyślij</button>
            </div>
        );
    }

    _showMessages(messages: Array<MessageItem>): React.Element<*> {
        return (
            <div>
                { messages.map(this._showMessageItem) }
            </div>
        );
    }

    _showMessageItem(item: MessageItem): React.Element<*> {
        return (
            <div key={item.id}>
                {item.message}
            </div>
        );
    }
}

export default Form;
