/* @flow */
import autobind from 'autobind-decorator';
import React, { Component } from 'react';
import User from './Models/User';

class List extends Component {
    
    render(): React.Element<*> {
        return (
            <div className="list_list">
                {this.list.map(this._renderItem)}
            </div>
        );
    }
    
    @autobind
    _renderItem(item) {
        console.info('item,', item);
        return (
            <div className="item_listy">
                {item.fullName}
            </div>
        );
    }
}

