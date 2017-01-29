/* @flow */
//import autobind from 'autobind-decorator';
import React from 'react';
import PureComponent from './PureComponent';
import UserModel from './Models/UserModel';
import BookModel from './Models/BookModel';
import { List} from 'immutable';
import ListaItem from './ListaItem';
import BookItem from './BookItem';

type PropsType = {|
    list: List<UserModel>,
    books: List<BookModel>
|};

class ListItems extends PureComponent {

    props: PropsType;

    render(): React.Element<*> {
        const { list, books } = this.props;
        const dd = 3;
        console.info('renderuję listę', list);

        return (
            <div>
                <div className="list_list">
                    {list.map(this._renderItem)}
                </div>
                <br/><br/>
                <div>
                    {books.map(this._renderBookItem)}
                </div>
            </div>
        );
    }

    _renderItem(item: UserModel): React.Element<*> {
        return (
            <ListaItem
                key={item.id}
                user={item}
            />
        );
    }

    _renderBookItem(bookItem: BookModel): React.Element<*> {
        return (
            <BookItem
                key={bookItem.id}
                book={bookItem}
            />
        );
    }
}

export default ListItems;
