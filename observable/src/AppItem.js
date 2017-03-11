/* @flow */
import React, { Component } from 'react';
import  { Observable, BehaviorSubject } from 'rxjs';

import { createRxComponent } from './Base';
import Store from './Store';
import StoreTime from './StoreTime';

type ItemType = {
    name: string,
    age: string,
};

type TimerModeType = 'off' | 'mode1' | 'mode2';

type PropsInType = {|
    id: string,
|};

type PropsOutType = {         //TODO - exact nie działa
    id: string,
    model: ItemType | null,
    timerValue: string | null,
    timerSwitch: () => void,
};

const mapToProps = (props$: Observable<PropsInType>): Observable<PropsOutType> => {

    const timerMode$: BehaviorSubject<TimerModeType> = new BehaviorSubject('off');

    const timerSwitch = () => {
        const currentMode = timerMode$.getValue();

        switch (currentMode) {
            case 'off':
                timerMode$.next('mode1');
                break;
            case 'mode1':
                timerMode$.next('mode2');
                break;
            case 'mode2':
                timerMode$.next('off');
                break;
        }
    };

    const timerValue$: Observable<null | string> = timerMode$.switchMap((value: TimerModeType): Observable<null | string> => {
        switch (value) {
            case 'off':
                return Observable.of(null);
            case 'mode1':
                return StoreTime
                    .getFormat()
                    .map(item => `${item.count} - ${item.time}`);
            case 'mode2':
                return StoreTime
                    .getTimestamp()
                    .map(item => `${item.count} - ${item.time}`);
            default:
                //(value: empty);
                return Observable.of(null);
        }
    });

    const model$ = props$
        .map(props => props.id)
        .distinctUntilChanged()
        .switchMap(id => Store.getUser(id));

    return Observable.combineLatest(props$, model$, timerValue$, (props, model, timerValue) => ({
        ...props,
        model,
        timerValue,
        timerSwitch
    }));
};


//TODO - sprawdzić czy jak się utowrzy PropsTypeOut lekko zmodyfikowany, to czy rzuci błędem że jest niezgodność

class AppItem extends Component {

    props: PropsOutType;

    render(): React.Element<*> {

//const AppItem = (props: PropsOutType): React.Element<*> => {
        const { id, model, timerValue, timerSwitch } = this.props;


        console.info(`RENDER ITEM: ${id}`);

        if (model) {
            return (
                <div>
                    <span>name: {model.name}</span> &nbsp;&nbsp;
                    <span>age: {model.age}</span> &nbsp;&nbsp;
                    <span style={{cursor: 'pointer'}} onClick={this._refresh.bind(this)}>Refresh</span> &nbsp;&nbsp;
                    <span style={{cursor:'pointer', border: '1px solid black'}} onClick={timerSwitch}>timer: {timerValue}</span>
                </div>
            );
        }

        return (
            <div> {'loading ' + id} </div>
        );
    }

    _refresh() {
        const { id } = this.props;
        Store.refresh(id);
    }
}

const AppItemExport: (props: PropsInType) => React.Element<*> = createRxComponent(mapToProps, (props: PropsOutType): React.Element<*> => <AppItem {...props} />);

export default AppItemExport;
