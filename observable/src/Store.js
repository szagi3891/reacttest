import Rx from 'rxjs';

class Store {

    constructor() {
        this.data = new Map();
    }

    getUser(id) {
        const subject = this._getItem(id);        
        return Rx.Observable.from(subject);
    }

    refresh(id) {
        const subject = this._getItem(id);
        this._makeFakeRequest(id, subject);
    }
    
    _getItem(id) {
        const subject = this.data.get(id);
        return subject ? subject : this._makeNewSubject(id);
    }

    _makeNewSubject(id) {

        const subject = new Rx.BehaviorSubject(null);
        
        this.data.set(id, subject);
        
        if (id === 0) {
            subject.next({
                name: 'dla zerowego dane od razu dostępne',
                age: '999'
            });
        } else {
            this._makeFakeRequest(id, subject);
        }
        
        return subject;
    }
    
    _makeFakeRequest(id, subject) {

        console.warn(`request po ${id}`);

        setTimeout(() => {
            console.warn(`response z ${id}`);

            const age = Math.floor(Math.random() * 100);
            
            subject.next({
                name: `franek ${id}`,
                age: age
            });

        }, 4000);
    }
    
    updateAge(id, newAge) {
        const subject = this.data.get(id);

        subject.next({
            name: '_set_',
            age: newAge
        });
    }
}

export default new Store();

/*
const stream = new Rx.Observable(observer => {
    storeItem.observer = observer;
}); //.startWith(null);
*/
//storeItem.subject = new Rx.Subject();
//stream.subscribe(storeItem.subject);
