import React, { Component, PureComponent } from 'react';
import User from './Models/User';

type PropsType = {
    user: User
};

class ListaItem extends PureComponent {

    props: PropsType;

    render(): React.Element<*> {
        const { user } = this.props;

        console.info('rerenderuję,', user);

        return (
            <div className="item_listy">
                {user.fullName()} - ({user.firstName}) - ({user.name})
            </div>
        );
    }
}

export default ListaItem;
