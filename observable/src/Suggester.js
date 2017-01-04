import React from 'react';
import Rx from 'rxjs';

import BaseComponent from './BaseComponent';

/*
    TODO z ponawianiem w przypadku błędu
    TODO z keszowaniem zapytań do serwera   publish().refCount()
*/

class StoreApi {

    constructor() {
        this.list = new Map();
    }

    getListByText(text) {
        //const stream = this.list.get(text);
        console.warn('suggester request po: ' + text);

        return new Rx.Observable(observer => {
            
            setTimeout(() => {
                console.warn('suggester response z: ' + text);

                observer.next([text].concat([text], [text], [text]));
            }, 1000);
        });
    }
}

class Suggester extends BaseComponent {
    
    constructor() {
        super();
        
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

    _onChange(e) {
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
