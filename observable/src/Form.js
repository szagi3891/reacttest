/* @flow */
import React from 'react';
import { Observable, Subject } from 'rxjs';

import { createRxComponent } from './Base';


type SenderSubjectType<T> = {
    send: (value: T) => void,
    receive: Observable<T>
};

function senderSubject<T>(): SenderSubjectType<T> {
    const subject: Subject<T> = new Subject();

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
    submitPress: bool,
    sender1: (value: SyntheticEvent) => void,
    sender2: (value: SyntheticEvent) => void,
    sender3: (value: SyntheticEvent) => void,
    submit: (value: SyntheticEvent) => void,
};



const mapToProps = (props$: Observable<PropsInType>): Observable<PropsOutType> => {

    const sender1 = senderSubject();
    const sender2 = senderSubject();
    const sender3 = senderSubject();
    const submit  = senderSubject();

    const submit$ = submit.receive.mapTo(true).startWith(false);

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

    const messages$: Observable<Array<MessageItem>> = Observable.combineLatest(message1$, message2$, message3$, (message1, message2, message3) => {
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

    //submit$.switchMap(paused => true ? message1$ : Observable.never());
/*
    const addPause = (stream$) => {
        return submit$.switchMap(submitPress => submitPress ? stream$ : Observable.never().startWith(null));
    };
*/

    const addPause = (stream$) => {
        return Observable.combineLatest(submit$, stream$, (submit: bool, stream: null | string): null | string => {
            return (submit ? stream : null);
        });
    };

    //animacja true, 3sekundy, false
    const showMessagesAnimation$: Observable<bool> = Observable
        .timer(0, 3000)
        .take(2)
        .map(value => value === 0)
        .do(val => console.warn('komunikty zbiorcze', val));

    const showMessages$: Observable<bool> = submit$.switchMap(submitPress => {
        return submitPress ? showMessagesAnimation$ : Observable.of(false);
    });

    const messagesOut$: Observable<Array<MessageItem>> = Observable.combineLatest(
        showMessages$,
        messages$, (
            showMessages: bool,
            messages: Array<MessageItem>
        ): Array<MessageItem> => {
        return showMessages ? messages : [];
    });


    return Observable.combineLatest(
        addPause(message1$),
        addPause(message2$),
        addPause(message3$),
        messagesOut$,
        submit$,
        (
            message1: string | null,
            message2: string | null,
            message3: string | null,
            messages: Array<MessageItem>,
            submitPress: bool
        ): PropsOutType => {
            return {
                message1: message1,
                message2: message2,
                message3: message3,
                messages: messages,
                sender1: sender1.send,
                sender2: sender2.send,
                sender3: sender3.send,
                submitPress: submitPress,
                submit: submit.send
            };
        }
    );
}

type RenderInputType = {
    onChange: (value: SyntheticEvent) => void,
    message: string | null,
};

const RenderInput = (props: RenderInputType): React.Element<*> => {
    const { onChange, message } = props;

    return (
      <div>
          <input onChange={onChange} />
          { message ? <div style={{color: 'red'}}>{message}</div> : null }
          <br/><br/>
      </div>
    );
};

const renderMessageItem = (item: MessageItem): React.Element<*> => {
    return (
        <div key={item.id}>
            {item.message}
        </div>
    );
}

const ReqenderMessages = (props: { messages: Array<MessageItem> }): React.Element<*> | null => {
    const { messages } = props;

    if (messages.length === 0) {
        return null;
    }

    return (
        <div>
            { messages.map(renderMessageItem) }
        </div>
    );
};

const Form = (props: PropsOutType): React.Element<*> => {

    const { message1, message2, message3, messages, submitPress, sender1, sender2, sender3, submit} = props;

    return (
        <div className="test_form">

            { submitPress ? "press" : "--"}<br/><br/>

            <RenderInput
                key="input1"
                onChange={sender1}
                message={message1}
            />

            <RenderInput
                key="input2"
                onChange={sender2}
                message={message2}
            />

            <RenderInput
                key="input3"
                onChange={sender3}
                message={message3}
            />

            <ReqenderMessages
                messages={messages}
            />

            <button onClick={submit}>Wyślij</button>
        </div>
    );
};

const FormExport: (props: PropsInType) => React.Element<*> = createRxComponent(mapToProps, Form);

export default FormExport;
