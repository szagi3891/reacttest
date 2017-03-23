/* @flow */
import React from 'react';
import { Observable, Subject } from 'rxjs';

import { createRxComponent } from './Base';

type PropsInType = {||};

type MoutionKindType = 'enter' | 'show' | 'leace' | 'off';

type MessageType = {
    message: string,
    kind: MoutionKindType,
};

type PropsOutType = {         //TODO - exact nie działa
    onClick: () => void,
    message: MessageType | null,
};

const createMessageStream = (tick$): Observable<MoutionKindType> => {
    const getFramesFromSecond = (second: number): number => second * 25;

    return new Observable((observer) => {

        const subscription = tick$.subscribe(
            (count) => {
                if (count === getFramesFromSecond(0)) {
                    observer.next('enter');   //2s
                } else if (count === getFramesFromSecond(2)) {
                    observer.next('show');    //3s
                } else if (count === getFramesFromSecond(5)) {
                    observer.next('leace');   //1s
                } else if (count === getFramesFromSecond(6)) {
                    observer.next('off');     //1s
                } else if (count === getFramesFromSecond(7)) {
                    observer.complete()
                }
            },
            (e) => observer.error(e),
            () => observer.complete()
        );

        return () => {
            console.log('disposed');
            subscription.unsubscribe();
        };
    });
};

const mapToProps = (props$: Observable<PropsInType>): Observable<PropsOutType> => {
    const tick$ = Observable.interval(1000 / 25);
    const onClick$ = new Subject();

    const messages$: Observable<MessageType> = onClick$.concatMap(() => {
        console.log('click');

        const stream$: Observable<MessageType> = createMessageStream(tick$).map((kind: MoutionKindType): MessageType => ({
            message: 'aaasdasda',
            kind: kind
        }));

        return stream$;
    }).startWith(null);

    return messages$.map((message: MessageType): PropsOutType => ({
        message: message,
        onClick: () => {
            console.log('clic zaszedl');
            onClick$.next();
        }
    }));
};

const MessageTestView = (props: PropsOutType): React.Element<*> => {
    const { onClick, message } = props;
    console.log('otrzymane propsy', props);

    const buttonStyle = {
        margin: '0 auto',
        cursor: 'pointer',
        borderRadius: '5px',
        padding: '10px',
        width: '80px',
        border: '1px solid black',
        backgroundColor: '#e0e0e0'
    };

    return (
        <div>
            to jest miejsce w którym się wygeneruje komponent message test
            <div onClick={onClick} style={buttonStyle}>Generuj</div>

            miejsce na komunnikat

            start, stop czas
        </div>
    );
};

const MessageTest: (props: PropsInType) => React.Element<*> = createRxComponent(mapToProps, MessageTestView);

export default MessageTest;
