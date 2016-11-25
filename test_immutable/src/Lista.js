/* @flow */
import autobind from 'autobind-decorator';
import React, { Component } from 'react';
import User from './Models/User';
import { List} from 'immutable';

type PropsType = {
    list: List<User>
};

class ListItems extends Component {
    
    props: PropsType;

    render(): React.Element<*> {
        console.warn('odbieram listę', this.props.list);
        return (
            <div className="list_list">
                {this.props.list.map(this._renderItem.bind(this))}
            </div>
        );
    }
    
    //@autobind
    _renderItem(item: User) {
        console.info('item,', item);
        return (
            <div className="item_listy" key={item.id}>
                {item.fullName()}
            </div>
        );
    }
}

export default ListItems;
