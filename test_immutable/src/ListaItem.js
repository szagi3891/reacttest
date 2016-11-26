import React, { Component } from 'react';
import User from './Models/User';

type PropsType = {
    user: User
};

class ListaItem extends Component {

    props: PropsType;

    render(): React.Element<*> {
        const { user } = this.props;

        console.info('item,', user);

        return (
            <div className="item_listy">
                {user.fullName()} - ({user.firstName}) - ({user.name})
            </div>
        );
    }
}

export default ListaItem;
