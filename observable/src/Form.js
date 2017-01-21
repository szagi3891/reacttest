/* @flow */
import React, { Component } from 'react';
import Rx from 'rxjs';

import { createRxComponent } from './Base';


type SenderSubjectType<T> = {
    send: (value: T) => void,
    receive: Rx.Observable<T>
};

function senderSubject<T>(): SenderSubjectType<T> {
    const subject: Rx.Subject<T> = new Rx.Subject();

    return {
        receive: subject.asObservable(),
        send: (value: T) => {
            subject.next(value);
        }
    };
}


type MessageItem = {
    id: string,
    message: string
};

type PropsInType = {};

type PropsOutType = {
    message1: string | null,
    message2: string | null,
    message3: string | null,
    messages: Array<MessageItem>,
    sender1: (value: SyntheticEvent) => void,
    sender2: (value: SyntheticEvent) => void,
    sender3: (value: SyntheticEvent) => void,
    submit: (value: SyntheticEvent) => void,
};



const mapToProps = (props$: Rx.Observable<PropsInType>): Rx.Observable<PropsOutType> => {

    const sender1 = senderSubject();
    const sender2 = senderSubject();
    const sender3 = senderSubject();
    const submit  = senderSubject();

    const message1$ = sender1.receive
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
    ): PropsOutType => {
        return {
            message1: message1,
            message2: message2,
            message3: message3,
            messages: messages,
            sender1: sender1.send,
            sender2: sender2.send,
            sender3: sender3.send,
            submit: submit.send
        };
    };

    return Rx.Observable.combineLatest(
        message1$,
        message2$,
        message3$,
        messages$,
        combineResult
    );
}


class Form extends Component {

    props: PropsOutType;

    render(): React.Element<*> {
        const { message1, message2, message3, messages, sender1, sender2, sender3, submit} = this.props;

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
                <button onClick={submit}>WyślijSS</button>
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

const FormFn = (props: PropsOutType): React.Element<*> => {
    return (
        <Form {...props} />
    );
};

const FormExport: (props: PropsInType) => React.Element<*> = createRxComponent(mapToProps, FormFn);

export default FormExport;
