/* @flow */
import React from 'react';
import Rx from 'rxjs';
import { Component } from 'react';
import { is as immutableIs} from 'immutable';

class BaseComponent3<DefaultPropsType, PropsType, StateType> extends Component<DefaultPropsType, PropsType, StateType>  {

    static defaultProps: $Abstract<DefaultPropsType>;
    props: PropsType;
    state: $Abstract<StateType>;

    _propsSubject: rxjs$Subject<PropsType>;
    _subscribeList: Array<rxjs$Subscription>;

    constructor(props: PropsType) {
        super(props);

        this._propsSubject = new Rx.Subject();
        this._subscribeList = [];
    }

    onProps(callback: (propsStream: rxjs$Observable<PropsType>) => rxjs$Subscription) {
        this._subscribeList.push(callback(this._propsSubject.asObservable()));
    }
/*
    render() {
        return (
            <div> z komponentu podstawowego </div>
        );
    }
*/
    componentWillMount() {
        this._propsSubject.next(this.props);
    }

    componentWillReceiveProps(nextProps: PropsType) {
      this._propsSubject.next(nextProps);
    }

    componentWillUnmount() {
        this._subscribeList.forEach(subscribeItem => subscribeItem.unsubscribe());
    }

    shouldComponentUpdate(nextProps: mixed, nextState: mixed): bool {
        return (
            this._shoudUpdate(this.props, nextProps) ||
            this._shoudUpdate(this.state, nextState)
        );
    }

    _shoudUpdate(oldObj: mixed, newObj: mixed): bool {
        if (oldObj === newObj) {
            return false;
        }

        if (typeof newObj !== 'object' || typeof oldObj !== 'object') {
            throw Error('incorrect state');
        }

        if (newObj === null || oldObj === null) {
            throw Error('incorrect state');
        }

        const oldKeys = Object.keys(newObj);
        const newKeys = Object.keys(oldObj);

        if (oldKeys.length !== newKeys.length) {
            return true;
        }

        for (let i = 0; i < oldKeys.length; i++) {
            const oldData = oldObj[oldKeys[i]];
            const newData = newObj[newKeys[i]];

            if (!immutableIs(oldData, newData)) {
                return true;
            }
        }

        return false;
    }
}

export default BaseComponent3;
