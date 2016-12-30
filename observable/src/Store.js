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
        }).startWith(null);
        
        storeItem.subject = new Rx.Subject();
        
        stream.subscribe(storeItem.subject);
        
        this.data.set(id, storeItem);
        
        this._makeFakeRequest(id, storeItem.observer);
        
        return storeItem;
    }
    
    _makeFakeRequest(id, observer) {

        console.warn(`request po ${id}`);

        setTimeout(() => {
            console.warn(`response z ${id}`);

            const age = Math.floor(Math.random() * 100);
            
            observer.next({
                name: `name: ${id}`,
                age: `age: ${age}`
            });

        }, 4000);

    }
}

export default new Store();
