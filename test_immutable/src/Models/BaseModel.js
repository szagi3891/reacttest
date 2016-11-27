/* @flow */

import { Map } from 'extendable-immutable';

class BaseModel<T1, T2> extends Map {

    constructor(value: T1) {
        super(value);
    }

    update(newData: $Shape<T1>): T2 {
        return super.merge(newData);
    }
}

export default BaseModel;
