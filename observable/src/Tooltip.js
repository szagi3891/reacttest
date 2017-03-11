/* @flow */
import React, { Component } from 'react';
import Rx, { Observable, BehaviorSubject, Subject } from 'rxjs';

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

const mapToProps = (props$: Observable<PropsInType>): Observable<PropsOutType> => {
    const trigger = new Subject();

    const command$ = Rx.Observable.merge(
        trigger
            .do(sig => console.warn(`przyszedł sygnał wewnętrzny ${sig}`)),
        props$
            .map(props => props.command ? props.command : Observable.empty())
            .switch()
            .do(sig => console.warn(`przyszedł sygnał zewnętrzny ${sig}`))
    );

    const show$ = command$.scan((state: bool, command: CommandType): bool => {
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
    }, false).startWith(false);

    return show$.map(show => ({
        show,
        trigger: () => {
            trigger.next('trigger');
        }
    }));
};

class Tooltip extends Component {

    props: PropsOutType;

    render() {
        const { trigger } = this.props;

        return (
            <div>
              <div onClick={trigger}>Trigger</div>
              { this._getOverlay() }
            </div>
        );
    }

    _getOverlay(): React.Element<*> | null {
        const { show } = this.props;

        if (show) {
            return (
                <div>
                    overlay
                </div>
            );
        }

        return null;
    }
}

const TooltipStateless = (props: PropsOutType): React.Element<*> => <Tooltip {...props} />;

const TooltipExport: (props: PropsInType) => React.Element<*> = createRxComponent(mapToProps, TooltipStateless);

export default TooltipExport;
