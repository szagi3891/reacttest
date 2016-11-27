/* @flow */

import { Map } from 'extendable-immutable';

class BaseModel<T> extends Map {

    update(newData: $Shape<T>): T {
        return super.merge(newData);
    }
}

export default BaseModel;
