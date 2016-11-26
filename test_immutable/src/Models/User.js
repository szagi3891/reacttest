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
        return super.merge(newData);
    } 
}

export default User;
