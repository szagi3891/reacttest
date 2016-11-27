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

//https://developer.mozilla.org/pl/docs/Web/JavaScript/Referencje/Obiekty/Object/getOwnPropertyNames
//

/*
http://stackoverflow.com/questions/20730324/how-to-make-dynamic-getter-with-defineproperty-in-javascript

var obj = {"one":1, "two":2, "three":3};
var cloned = {};

function makeReadOnlyProperty(cloned, obj, prop) {
    Object.defineProperty(cloned, prop, 
    {
        set: function() 
        {
            throw new UnableRewriteException('original cannot be rewrite');
        },
        get: function() 
        {
            return obj[prop]
        },
        enumerable: true
    });
}

for (var prop in obj) 
{
    makeReadOnlyProperty(cloned, obj, prop);
}
*/