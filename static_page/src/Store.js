//@flow

import { Observable, BehaviorSubject } from 'rxjs';

export type PageItemType = {
    title: string,
    body: string
};

class Store {

    data: Map<string, BehaviorSubject<PageItemType|null>> = new Map();

    init() {
        console.warn('inicjuj stora jakimiś danymi');
    }
 
    get(pageId: string): Observable<PageItemType|null> {

        const page$ = this.data.get(pageId);
        if (page$) {
            return page$.asObservable();
        }

        const newPage$ = new BehaviorSubject(null);

        setTimeout(() => {
            newPage$.next({
                title: 'test33',
                body: 'test33'
            });
        }, 2000);

        this.data.set(pageId, newPage$);

        return newPage$;
    }

}

export default new Store();
