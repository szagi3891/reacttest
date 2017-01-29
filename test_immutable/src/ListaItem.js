/* @flow */
import React from 'react';
import PureComponent from './PureComponent';
import UserModel from './Models/UserModel';

type PropsType = {|
    user: UserModel
|};

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

const dead = () => {
    return 'ta funkcja powinna zostać usunięta uu877';
};

export {
    dead
};

export default ListaItem;
