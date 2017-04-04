//@flow

import { Observable, BehaviorSubject } from 'rxjs';

export type PageItemType = {
    title: string,
    body: string
};

export type EditingType = {
    title: string,
    body: string,
    isSaving: bool,         //określa czy obecnie trwa akcja zapisująca nową zawartość na serwerze
};

export type PageContextType = {
    page: PageItemType,
    editing: EditingType | null,
};

class Store {

    user: BehaviorSubject<string | null> = new BehaviorSubject(null);
    data: Map<string, BehaviorSubject<PageContextType|null>> = new Map();

    constructor() {
                            //symulowane zalogowanie i wylogowanie
        setInterval(() => {
            if (this.user.getValue() === null) {
                this.user.next('szagi3891');
            } else {
                this.user.next(null);
            }
        }, 4000);
    }

    init() {
        console.warn('inicjuj stora jakimiś danymi');
    }
 
    get(pageId: string): Observable<PageContextType|null> {

        const page$ = this.data.get(pageId);
        if (page$) {
            return page$.asObservable();
        }

        const newPage$ = new BehaviorSubject(null);

        setTimeout(() => {
            newPage$.next({
                page: {
                    title: 'test33',
                    body: 'test33',
                },
                editing: null,
            });
        }, 2000);

        this.data.set(pageId, newPage$);

        return newPage$;
    }

    getCurrentUser(): Observable<string | null> {
        return this.user.asObservable();
    }
}

export default new Store();
