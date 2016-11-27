/* @flow */
import BaseModel from './BaseModel';
import { List } from 'immutable';

type BookTypeModel = {|
    id: string,
    title: string,
    idn: string,
    autors: List<string>,
|}

class Book extends BaseModel<BookTypeModel, Book> {

    get id(): string {
        return this.get('id');
    }

    get title(): string {
        return this.get('title');
    }
    
    get idn(): string {
        return this.get('idn');
    }

    get autors(): List<string> {
        return this.get('autors');
    }
}

export default Book;