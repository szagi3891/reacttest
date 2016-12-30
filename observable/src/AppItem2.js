import React from 'react';

import BaseComponent from './BaseComponent';
import Store from './Store';

class AppItem extends BaseComponent {
    
    constructor() {
        super();

        this.state = {
            model: null
        };

        this.onProps((prevProps, nextProps) => {
            if (prevProps.id !== nextProps.id) {
                return Store.getUser(nextProps.id).subscribe((nextModel) => {
                    this.setState({ model: nextModel })
                });
            }
        });
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
