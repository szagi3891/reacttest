//@flow

import { Observable, BehaviorSubject } from 'rxjs';

type PageItemType = {
    title: string,
    body: string
};

class Store {

    data: Map<string, BehaviorSubject<PageItemType|null>> = new Map();

    init() {
        console.warn('inicjuj stora jakimiś danymi');
    }
 
    get(pageId: string): Observable<PageItemType> {

        return Observable.of({
            title: 'test33',
            body: 'test33'
        });
    }
}

export default new Store();
