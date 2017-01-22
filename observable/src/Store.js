/* @flow */
import { BehaviorSubject } from 'rxjs';

type ItemType = {
    name: string,
    age: string,
};

class Store {

    data: Map<string, BehaviorSubject<ItemType|null>> = new Map();

    getUser(id: string) {
        const subject = this._getItem(id);
        return subject.asObservable();
    }

    refresh(id: string) {
        const subject = this._getItem(id);
        this._makeFakeRequest(id, subject);
    }

    _getItem(id: string): BehaviorSubject<ItemType|null> {
        const subject = this.data.get(id);
        return subject ? subject : this._makeNewSubject(id);
    }

    _makeNewSubject(id: string) {

        const subject = new BehaviorSubject(null);

        this.data.set(id, subject);

        if (id === '0') {
            subject.next({
                name: 'dla zerowego dane od razu dostępne',
                age: '999'
            });
        } else {
            this._makeFakeRequest(id, subject);
        }

        return subject;
    }

    _makeFakeRequest(id: string, subject: BehaviorSubject<ItemType|null>) {

        console.warn(`request po ${id}`);

        setTimeout(() => {
            console.warn(`response z ${id}`);

            const age = Math.floor(Math.random() * 100);

            subject.next({
                name: `franek ${id}`,
                age: age.toString()
            });

        }, 4000);
    }

    updateAge(id: string, newAge: string) {
        const subject = this.data.get(id);

        if (subject) {
            subject.next({
                name: '_set_',
                age: newAge
            });
        }
    }
}

export default new Store();
