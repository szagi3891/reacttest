import React, { Component } from 'react';

import Store from './Store';

class AppItem extends Component {
    
    constructor() {
        super();
        
        this.state = {
            model: null
        };
    }

    componentDidMount() {
        const { id } = this.props;
        const stream = Store.getUser(id);
        
        this.subscription = stream.subscribe((nextModelVersion) => {
            this.setState({
                model: nextModelVersion
            });
        });
    }

    componentWillUnmount() {
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
