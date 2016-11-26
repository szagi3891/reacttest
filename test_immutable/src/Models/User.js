/* @flow */
import { Map } from 'extendable-immutable';
import { List } from 'immutable';

type UserModelType = {|
    id: number,
    firstName: string,
    lastName: string,
    tags: Array<string>,
|};

type UserRecordType = {|
    id: number,
    firstName: string,
    lastName: string,
    tags: List<string>,
|};

const toImmutable = (model: UserModelType): UserRecordType => {
    return {
        id: model.id,
        firstName: model.firstName,
        lastName: model.lastName,
        tags: List.of(...model.tags)
    };
};

class User extends Map {

    constructor(value: UserModelType) {
        super(toImmutable(value));
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

    get tags(): List<string> {
        return this.get('tags');
    }
}

export default User;
