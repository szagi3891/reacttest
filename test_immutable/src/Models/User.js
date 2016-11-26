/* @flow */
import { Map } from 'extendable-immutable';

type UserRecordType = {|
    id: number,
    firstName: string,
    lastName: string
|};

class User extends Map {

    constructor(value: UserRecordType) {
        super(value);
    }

    get id(): number {
        return this.get('id');
    }

    fullName(): string {
        return this.get('firstName') + ' ' + this.get('lastName');
    }

    get firstName(): string {
        return this.get('firstName');
    }
    
    get lastName(): string {
        return this.get('lastName');
    }

    update(newData: $Shape<UserRecordType>): User {
        console.info('newData', newData);
        //return super.update(newData);
        
        return super.merge(newData);
    } 
}

/*
class Test {
}

const inst_test = new Test();

console.info('inst_test', inst_test.fff);
*/

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