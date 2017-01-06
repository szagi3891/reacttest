/* @flow */
import React, { Component } from 'react';

import Store from './Store';

type ItemType = {
    name: string,
    age: string,
};

type StateType = {
    model: ItemType | null
};

type PropsType = {
    id: string
};

class AppItem extends Component {

    props: PropsType;
    state: StateType;
    _mounted: bool;
    subscription: rxjs$Subscription;

    constructor(props: PropsType) {
        super(props);

        this._mounted = false;

                    //trzeba sprawdzać w subskrybencie czy ten komponent jest zamontowany
        this.state = {
            model: null
        };
    }

    shouldComponentUpdate(nextProps: PropsType, nextState: StateType) {
        return this.props.id !== nextProps.id || this.state.model !== nextState.model;
    }

    componentDidMount() {
        const { id } = this.props;
        const stream = Store.getUser(id);

        this._mounted = true;

        this.subscription = stream.subscribe((nextModelVersion) => {
            this.setState({
                model: nextModelVersion
            });
        });
    }

    componentWillUnmount() {

        this._mounted = false;
        //TODO - trzeba odsubskrybować strumień
    }

    render() {
        const { id } = this.props;
        const { model } = this.state;

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

export default AppItem;
