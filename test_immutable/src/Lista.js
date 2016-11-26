/* @flow */
//import autobind from 'autobind-decorator';
import React, { Component } from 'react';
import User from './Models/User';
import { List} from 'immutable';
import ListaItem from './ListaItem';

type PropsType = {
    list: List<User>
};

class ListItems extends Component {
    
    props: PropsType;

    render(): React.Element<*> {
        const { list } = this.props;

        console.warn('odbieram listę', list);
        return (
            <div className="list_list">
                {list.map(this._renderItem)} 
            </div>
        );
    }
    
    _renderItem(item: User): React.Element<*> {
        console.info('wywołuję item', item);
        return (
            <ListaItem
                key={item.id}
                user={item}
            />
        );
    }
}

export default ListItems;
