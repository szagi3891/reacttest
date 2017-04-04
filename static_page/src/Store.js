//@flow

import { Observable, BehaviorSubject } from 'rxjs';

export type PageItemType = {
    title: string,
    body: string
};

export type EditingType = {
    pageid: string,
    title: string,
    body: string,
    isSaving: bool,         //określa czy obecnie trwa akcja zapisująca nową zawartość na serwerze
};

class Store {

    currentEdited: BehaviorSubject<EditingType | null> = new BehaviorSubject(null);     //określa aktualnie edytowaną treść
    user: BehaviorSubject<string | null> = new BehaviorSubject(null);                   //określa aktualnie zalogowanego użytkownika
    data: Map<string, BehaviorSubject<PageItemType|null>> = new Map();

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
 
    setEdit(pageid: string) {
        const item = this.data.get(pageid);
        if (item) {
            const itemValue = item.getValue();

            if (itemValue) {
                this.currentEdited.next({
                    pageid,
                    title: itemValue.title,
                    body: itemValue.body,
                    isSaving: false
                });
            }
        }
    }

    turnOffEdit() {
        this.currentEdited.next(null);
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
                body: 'test33',
            });
        }, 2000);

        this.data.set(pageId, newPage$);

        return newPage$;
    }

    getCurrentUser(): Observable<string | null> {
        return this.user.asObservable();
    }

    getCurrentEdited(): Observable<EditingType | null> {
        return this.currentEdited.asObservable();
    }
}

export default new Store();
