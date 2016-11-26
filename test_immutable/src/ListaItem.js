import React, { PureComponent } from 'react';
import User from './Models/User';

type PropsType = {
    user: User
};

class ListaItem extends PureComponent {

    props: PropsType;

    render(): React.Element<*> {
        const { user } = this.props;

        console.info('rerenderuję element', user);

        return (
            <div className="item_listy">
                {user.fullName()} - ({user.firstName}) - ({user.name}) - tags: "{user.tags.join('-')}"
            </div>
        );
    }
}

export default ListaItem;
