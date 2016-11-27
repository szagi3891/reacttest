/* @flow */
//import autobind from 'autobind-decorator';
import React, { PureComponent } from 'react';
import User from './Models/User';
import Book from './Models/Book';
import { List} from 'immutable';
import ListaItem from './ListaItem';
import BookItem from './BookItem';

type PropsType = {|
    list: List<User>,
    books: List<>
|};

class ListItems extends PureComponent {
    
    props: PropsType;

    render(): React.Element<*> {
        const { list, books } = this.props;

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

    _renderItem(item: User): React.Element<*> {
        return (
            <ListaItem
                key={item.id}
                user={item}
            />
        );
    }
    
    _renderBookItem(bookItem: Book): React.Element<*> {
        return (
            <BookItem
                key={bookItem.id}
                book={bookItem}
            />
        );
    }
}

export default ListItems;
