/* @flow */
import React, { PureComponent } from 'react';
import BookModel from './Models/BookModel';

type PropsType = {|
    book: BookModel
|};

class BookItem extends PureComponent {

    props: PropsType;

    render(): React.Element<*> {
        const { book } = this.props;

        console.info('rerenderuję książkę', book);

        return (
            <div className="item_listy">
                {book.title} - autorzy: "{book.autors.join('-')}"
            </div>
        );
    }
}

export default BookItem;
