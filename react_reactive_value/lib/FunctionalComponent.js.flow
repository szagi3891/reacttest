//@flow
import * as React from 'react';
import { is as isEqualImmutable } from 'immutable';
import { Observable, ValueSubject, ValueObservable, Subscription } from './Reactive';
import { logError } from './Log';

const shoudUpdate = (oldObj: mixed, newObj: mixed): bool => {
    if (oldObj === newObj) {
        return false;
    }

    if (typeof newObj !== 'object' || typeof oldObj !== 'object') {
        return true;
    }

    if (newObj === null || oldObj === null) {
        return true;
    }

    const oldKeys = Object.keys(newObj);
    const newKeys = Object.keys(oldObj);

    if (oldKeys.length !== newKeys.length) {
        return true;
    }

    for (let i = 0; i < oldKeys.length; i++) {
        const oldData = oldObj[oldKeys[i]];
        const newData = newObj[newKeys[i]];

        if (!isEqualImmutable(oldData, newData)) {
            return true;
        }
    }

    return false;
};

const isSSR = typeof window === 'undefined';

const _blank = () => {};

export type RenderType<PropsType> = (
    props: PropsType,
    getValue$: <P>(obs: ValueObservable<P>) => P
) => React.Node;

export type MountArg<T> = [T, () => void];

export type ContextType<PropsType> = {
    props$: ValueObservable<PropsType>,
    subscribe$: <T>(obs: Observable<T>) => void,
    mount$: <T>(arg: MountArg<T>) => T,
};

export type BuildRenderType<PropsType> = (context: ContextType<PropsType>) => RenderType<PropsType>;

export const createComponentState = <PropsType>(buildRender: BuildRenderType<PropsType>): React.ComponentType<PropsType> => {

    return class NodeComponent extends React.Component<PropsType> {

        _subscriptionForRender: Array<Subscription>;
        _mounted: Array<() => void>;
    
        _props$: ValueSubject<PropsType>;
    
        _render: RenderType<PropsType>;

        constructor(props: PropsType) {
            super(props);
    
            this._subscriptionForRender = [];
            this._mounted = [];
    
            this._props$ = new ValueSubject(props);

            const context: ContextType<PropsType> = {
                props$: this._props$.asObservable(),
                subscribe$: this.subscribe$,
                mount$: this.mount$
            };

            this._render = buildRender(context);
        }

        shouldComponentUpdate(nextProps: PropsType) {
            return shoudUpdate(this.props, nextProps);
        }

        componentDidCatch(error: {}, info: {}) {
            logError('componentDidCatch -> ', error, info);
        }
    
        componentWillReceiveProps(nextProps: PropsType) {
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

        render(): React.Node {
            const old_sub = this._subscriptionForRender;
            this._subscriptionForRender = [];

            const renderOut = this._render(this.props, this.getValue$);

            for (const sub of old_sub) {
                sub.unsubscribe();
            }

            return renderOut;
        }
    
        getValue$ = <T>(stream: ValueObservable<T>): T => {
    
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

        subscribe$ = <T>(obs: Observable<T>) => {
            const subscription = obs.subscribe(_blank);
    
            this._mounted.push(() => {
                subscription.unsubscribe();
            });
        }
    
        mount$ = <T>([observable, disconnect]: [T, () => void]): T => {
            this._mounted.push(disconnect);
            return observable
        }
    };
};

export const createComponent = <PropsType>(render: RenderType<PropsType>): React.ComponentType<PropsType> => {
    return createComponentState((context) => {
        return render;
    });
};
