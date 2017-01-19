/* @flow */
import React from 'react';
import Rx from 'rxjs';

import BaseComponent3 from './_old/BaseComponent3';

/*
    TODO z ponawianiem w przypadku błędu
    TODO z keszowaniem zapytań do serwera   publish().refCount()
*/

class StoreApi {

    list: Map<>;

    constructor() {
        this.list = new Map();
    }

    getListByText(text): rxjs$Observable<Array<string>> {
        console.warn('suggester request po: ' + text);

        return new Rx.Observable(observer => {

            setTimeout(() => {
                console.warn('suggester response z: ' + text);

                observer.next([text].concat([text], [text], [text]));
            }, 1000);
        });
    }
}

type StateType = {
    list: Array<string>
};

class Suggester extends BaseComponent3 {

    props: {};
    state: StateType;

    input$: rxjs$Subject<string>;

    constructor(props: {}) {
        super(props);

        const storeApi = new StoreApi();

        this.input$ = new Rx.Subject();
        this.state = {
            list: []
        };

        this.input$.subscribe(mess => console.warn('kliknięto ' + mess));

        this.input$
            .debounceTime(1000)
            .switchMap(text => storeApi.getListByText(text))
            .subscribe(list => {
                console.warn('otrzymano nową listę: ', list);
                this.setState({ list });
            });
    }

    _onChange(e: Object) {
        this.input$.next(e.target.value);
    }

    render() {

        return (
            <div className="suggesterContainer">

                <input onChange={this._onChange.bind(this)} />

                <div>
                    { this._getSugestions() }
                </div>
            </div>
        );
    }

    _getSugestions() {
        const { list } = this.state;

        return list.map((item, index) => <div key={index}>{item}</div> );
    }
}

export default Suggester;
