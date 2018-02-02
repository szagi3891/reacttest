//@flow

import * as React from 'react';
import { Observable, ValueSubject, ValueObservable, Subscription } from './Reactive';
import { logError } from './Log';

const isSSR = typeof window === 'undefined';

export default class BaseComponent<Props> extends React.Component<Props, void> {

    _subscriptionForRender: Array<Subscription>;
    _mounted: Array<() => void>;

    _props$: ValueSubject<Props>;

    componentDidCatch(error: {}, info: {}) {
        logError('componentDidCatch -> ', error, info);
    }

    componentWillReceiveProps(nextProps: Props) {
        this._props$.next(nextProps);
    }

    componentWillUnmount() {
        for (const sub of this._subscriptionForRender) {
            sub.unsubscribe();
        }

        for (const mountItem of this._mounted) {
            mountItem();
        }
    }

    constructor(props: Props) {
        super();

        this._subscriptionForRender = [];
        this._mounted = [];

        this._props$ = new ValueSubject(props);

        const oldRender = this.render.bind(this);

        //$FlowFixMe
        this.render = () => {

            const old_sub = this._subscriptionForRender;
            this._subscriptionForRender = [];

            const renderOut = oldRender();

            for (const sub of old_sub) {
                sub.unsubscribe();
            }

            return renderOut;
        };
    }

    getProps$(): ValueObservable<Props> {
        return this._props$.asObservable();
    }

    getValue$<T>(stream: ValueObservable<T>): T {

        let isSet = false;
        //$FlowFixMe
        let result: T = null;

        const subscription = stream.subscribe(data => {
            if (isSet === false) {
                isSet = true;
                result = data;
            } else {
                this.forceUpdate();
            }
        });

        if (isSet !== true) {
            throw Error('panic');
        }

        if (isSSR) {
            subscription.unsubscribe();
        } else {
            this._subscriptionForRender.push(subscription);
        }

        return result;
    }

    _blank = () => {};

    subscribe$<T>(obs: Observable<T>) {
        const subscription = obs.subscribe(this._blank);

        this._mounted.push(() => {
            subscription.unsubscribe();
        });
    }

    mount$<T>([observable, disconnect]: [T, () => void]): T {
        this._mounted.push(disconnect);
        return observable
    }
}
