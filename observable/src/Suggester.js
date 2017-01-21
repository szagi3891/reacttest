/* @flow */
import React, { Component } from 'react';
import Rx from 'rxjs';

import { createRxComponent } from './Base';

/*
    TODO z ponawianiem w przypadku błędu
    TODO z keszowaniem zapytań do serwera   publish().refCount()
*/

class StoreApi {

    list: Map<string, Array<string>> = new Map();

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


type PropsInType = {};

type PropsOutType = {
    list: Array<string>,
    onChange: (evet: SyntheticEvent) => void,
};

const mapToProps = (props$: rxjs$Observable<PropsInType>): rxjs$Observable<PropsOutType> => {
    const storeApi = new StoreApi();
    const input$ = new Rx.Subject();

    const onChange = (event: SyntheticEvent) => {
        const target = event.target;
        if (target instanceof HTMLInputElement) {
            input$.next(target.value);
        }
    };

    return input$
        .do(mess => console.warn('kliknięto ' + mess))
        .debounceTime(1000)
        .switchMap(text => storeApi.getListByText(text))
        .startWith([])
        .do(list => console.warn('otrzymano nową listę: ', list))
        .map(list => {
            return {
                list: list,
                onChange: onChange
            };
        });
};

class Suggester extends Component {

    props: PropsOutType;

    render() {
        const { onChange } = this.props;

        return (
            <div className="suggesterContainer">
                <input onChange={onChange} />
                <div>
                    { this._getSugestions() }
                </div>
            </div>
        );
    }

    _getSugestions() {
        const { list } = this.props;
        return list.map((item, index) => <div key={index}>{item}</div> );
    }
}


const SuggesterFn = (props: PropsOutType): React.Element<*> => {
    return (
        <Suggester {...props} />
    );
};

const SuggesterExport: (props: PropsInType) => React.Element<*> = createRxComponent(mapToProps, SuggesterFn);

export default SuggesterExport;
