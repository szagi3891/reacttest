/* @flow */
import React from 'react';
import Rx, { Observable, Subject } from 'rxjs';

import { createRxComponent } from './Base';

type OutCommandType = 'show' | 'hide';
type CommandType = 'trigger' | 'show' | 'hide';

type PropsInType = {|
    command?: Observable<OutCommandType>,
|};

type PropsOutType = {         //TODO - exact nie działa
    show: bool,
    trigger: () => void,
};

const reduceNewState = (state: bool, command: CommandType): bool => {
    if (command === 'trigger') {
        return !state;
    }

    if (command === 'show') {
        return true;
    }

    if (command === 'hide') {
        return false;
    }

    return state;
};

const mapToProps = (props$: Observable<PropsInType>): Observable<PropsOutType> => {
    const trigger = new Subject();

    const command$ = Rx.Observable.merge(
        trigger
            .do(sig => {console.warn(`przyszedł sygnał wewnętrzny ${sig}`)}),
        props$
            .map(props => props.command ? props.command : Observable.empty())
            .switch()
            .do((sig: OutCommandType) => {console.warn(`przyszedł sygnał zewnętrzny ${sig}`)})
    );

    const show$ = command$.scan(reduceNewState, false).startWith(false);

    return show$.map(show => ({
        show,
        trigger: () => {
            trigger.next('trigger');
        }
    }));
};

const getOverlay = (props: PropsOutType): React.Element<*> | null => {
    const { show } = props;

    if (show) {
        return (
            <div>
                overlay
            </div>
        );
    }

    return null;
}

const Tooltip = (props: PropsOutType): React.Element<*> => {
    const { trigger } = props;
    console.warn('tooltip render');                               //TODO
    return (
        <div>
          <div onClick={trigger}>Trigger</div>
          { getOverlay(props) }
        </div>
    );
};

const TooltipExport: (props: PropsInType) => React.Element<*> = createRxComponent(mapToProps, Tooltip);

export default TooltipExport;
