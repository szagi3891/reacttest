import { Component } from 'react';
import Immutable from 'immutable';

class BaseComponent extends Component {
    
    constructor(props) {
        super(props);

        this._onPropsList = null;
    }

    onProps(...callbackList) {
        if (this._onPropsList === null) {
            this._onPropsList = callbackList.map(callback => {
                return {callback, sub: null}
            });
        } else {
            throw Error('Metodę onProps można wywołać tylko raz');
        }
    }

    componentWillMount() {
        this._execOnProps({}, this.props);
    }
    
    componentWillReceiveProps(nextProps) {
        this._execOnProps(this.props, nextProps);
    }

    componentWillUnmount() {    
        if (this._onPropsList) {
            this._onPropsList.forEach(item => {
                if (item.sub) {
                    item.sub();
                    item.sub = null;
                }
            });
        }
    }

    _execOnProps(currentProps, nextProps) {
        if (this._onPropsList) {
            this._onPropsList.forEach(item => {
                const newSubscription = item.callback(currentProps, nextProps);

                if (newSubscription) {
                    if (item.sub) {
                        item.sub();
                    }

                    item.sub = newSubscription;
                }
            });
        }
    }

    shouldComponentUpdate(nextProps: mixed, nextState: mixed): bool {
        return (
            !this._shallowEqual(this.props, nextProps) ||
            !this._shallowEqual(this.state, nextState)
        );
    }

    _shallowEqual(oldObj: mixed, newObj: mixed): bool {
        if (oldObj === newObj) {
            return true;
        }

        if (typeof newObj !== 'object' ||
            typeof oldObj !== 'object') {
            console.info('shallow ', arguments);
            throw Error('cos poszło nie tak');
        }

        const oldKeys = Object.keys(newObj);
        const newKeys = Object.keys(oldObj);

        if (oldKeys.length !== newKeys.length) {
            return false;
        }
        
        for (let i = 0; i < oldKeys.length; i++) {
            const oldData = oldObj[oldKeys[i]];
            const newData = newObj[newKeys[i]];

            if (!Immutable.is(oldData, newData)) {
                return false;
            }
        }

        return true;
    }
}

export default BaseComponent;

