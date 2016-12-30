import Rx from 'rxjs';

class Store {
    constructor() {
        this.data = new Map();
    }
    
    getUser(id) {
        const storeItem = this._getItem(id);
        return storeItem.subject;
    }

    refresh(id) {
        const storeItem = this._getItem(id);
        
        this._makeFakeRequest(id, storeItem.observer);
    }
    
    _getItem(id) {
        const readItem = this.data.get(id);
        return readItem ? readItem : this._makeNewStoreItem(id);
    }

    _makeNewStoreItem(id) {
        const storeItem = {
            observer: null,
            subject: null
        };
        
        const stream = new Rx.Observable(observer => {
            storeItem.observer = observer;
        }); //.startWith(null);
        
        //storeItem.subject = new Rx.Subject();
        storeItem.subject = new Rx.BehaviorSubject(null);
        
        stream.subscribe(storeItem.subject);
        
        this.data.set(id, storeItem);
        
        if (id === 0) {
            storeItem.observer.next({
                name: 'dla zerowego dane od razu dostępne',
                age: '999'
            });
        } else {
            this._makeFakeRequest(id, storeItem.observer);
        }
        
        return storeItem;
    }
    
    _makeFakeRequest(id, observer) {

        console.warn(`request po ${id}`);

        setTimeout(() => {
            console.warn(`response z ${id}`);

            const age = Math.floor(Math.random() * 100);
            
            observer.next({
                name: `franek ${id}`,
                age: age
            });

        }, 4000);
    }
    
    updateAge(id, newAge) {
        const readItem = this.data.get(id);

        readItem.observer.next({
            name: '_set_',
            age: newAge
        });
    }
}

export default new Store();
