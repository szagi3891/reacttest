import { Map } from 'extendable-immutable';

class User extends Map {

    constructor(value) {
        super(value);
    }

    fullName() {
        return this.get('firstName') + ' ' + this.get('lastName');
    }

    firstName() {
        return this.get('firstName');
    }
    
    lastName() {
        return this.get('lastName');
    }
}

export default User;

/*
import { Map } from 'extendable-immutable';

class User extends Map {

  constructor(value) {
    return super(value)/
  }

  fullName() {
    return this.get('firstName') + ' ' + this.get('lastName');
  }

}

const user = new User({
    firstName: 'sadsa',
    lastName: 'zzz'
});

console.info('full -> ' + user.fullName());
*/

/*
import { OrderedMap } from 'extendable-immutable'
 
class Collection extends OrderedMap {
  static isCollection(val) {
    return val && val instanceof Collection;
  }
 
  doMagic() {
    return this.map(x => x.set("magic", true));
  }
}
*/