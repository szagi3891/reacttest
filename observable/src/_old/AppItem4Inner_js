/* @flow */
import React from 'react';

import BaseComponent3 from './BaseComponent3';
import Store from './Store';

type ItemType = {
    name: string,
    age: string,
};

type PropsType = {|
    id: string,
    model: ItemType | null,
|};

class AppItem4Inner extends BaseComponent3 {

    props: PropsType;

    render() {
        const { id, model } = this.props;

        console.info(`RENDER ITEM: ${id}`);

        if (model) {
            return (
                <div>
                    <span>name: {model.name}</span> &nbsp;&nbsp;
                    <span>age: {model.age}</span> &nbsp;&nbsp;
                    <span style={{cursor: 'pointer'}} onClick={this._refresh.bind(this)}>Refresh</span>
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

export default AppItem4Inner;
