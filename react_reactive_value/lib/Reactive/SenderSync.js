'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _Log = require('../Log');

var isLock = false;
var toRun = [];
var limit = 20;

var showGroup = function showGroup(name, stack) {
    (0, _Log.logGroup)(name, function () {
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
            for (var _iterator = stack[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var item = _step.value;

                (0, _Log.logInfo)(item);
            }
        } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion && _iterator.return) {
                    _iterator.return();
                }
            } finally {
                if (_didIteratorError) {
                    throw _iteratorError;
                }
            }
        }
    });
};

exports.default = function (funcToExec) {
    toRun.push([funcToExec, new Error('stack')]);

    if (isLock === false) {
        isLock = true;

        var counter = 0;
        var stackList = [];

        while (toRun.length > 0) {
            var _toRun$shift = toRun.shift(),
                _toRun$shift2 = _slicedToArray(_toRun$shift, 2),
                toRunItem = _toRun$shift2[0],
                stackItem = _toRun$shift2[1];

            toRunItem();
            stackList.push(stackItem);
            counter++;

            if (counter > limit) {
                showGroup('Grouped next - error (' + stackList.length + ')', stackList);
                throw Error('Exceeding the limit on running subject.next');
            }
        }

        showGroup('Grouped next (' + stackList.length + ')', stackList);

        isLock = false;
    }
};