'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.createComponent = exports.createComponentState = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _react = require('react');

var React = _interopRequireWildcard(_react);

var _immutable = require('immutable');

var _Reactive = require('./Reactive');

var _Log = require('./Log');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var shoudUpdate = function shoudUpdate(oldObj, newObj) {
    if (oldObj === newObj) {
        return false;
    }

    if ((typeof newObj === 'undefined' ? 'undefined' : _typeof(newObj)) !== 'object' || (typeof oldObj === 'undefined' ? 'undefined' : _typeof(oldObj)) !== 'object') {
        return true;
    }

    if (newObj === null || oldObj === null) {
        return true;
    }

    var oldKeys = Object.keys(newObj);
    var newKeys = Object.keys(oldObj);

    if (oldKeys.length !== newKeys.length) {
        return true;
    }

    for (var i = 0; i < oldKeys.length; i++) {
        var oldData = oldObj[oldKeys[i]];
        var newData = newObj[newKeys[i]];

        if (!(0, _immutable.is)(oldData, newData)) {
            return true;
        }
    }

    return false;
};

var isSSR = typeof window === 'undefined';

var _blank = function _blank() {};

var createComponentState = exports.createComponentState = function createComponentState(buildRender) {

    return function (_React$Component) {
        _inherits(NodeComponent, _React$Component);

        function NodeComponent(props) {
            _classCallCheck(this, NodeComponent);

            var _this = _possibleConstructorReturn(this, (NodeComponent.__proto__ || Object.getPrototypeOf(NodeComponent)).call(this, props));

            _this.getValue$ = function (stream) {

                var isSet = false;
                //$FlowFixMe
                var result = null;

                var subscription = stream.subscribe(function (data) {
                    if (isSet === false) {
                        isSet = true;
                        result = data;
                    } else {
                        _this.forceUpdate();
                    }
                });

                if (isSet !== true) {
                    throw Error('panic');
                }

                if (isSSR) {
                    subscription.unsubscribe();
                } else {
                    _this._subscriptionForRender.push(subscription);
                }

                return result;
            };

            _this.subscribe$ = function (obs) {
                var subscription = obs.subscribe(_blank);

                _this._mounted.push(function () {
                    subscription.unsubscribe();
                });
            };

            _this.mount$ = function (_ref) {
                var _ref2 = _slicedToArray(_ref, 2),
                    observable = _ref2[0],
                    disconnect = _ref2[1];

                _this._mounted.push(disconnect);
                return observable;
            };

            _this._subscriptionForRender = [];
            _this._mounted = [];

            _this._props$ = new _Reactive.ValueSubject(props);

            var context = {
                props$: _this._props$.asObservable(),
                subscribe$: _this.subscribe$,
                mount$: _this.mount$
            };

            _this._render = buildRender(context);
            return _this;
        }

        _createClass(NodeComponent, [{
            key: 'shouldComponentUpdate',
            value: function shouldComponentUpdate(nextProps) {
                return shoudUpdate(this.props, nextProps);
            }
        }, {
            key: 'componentDidCatch',
            value: function componentDidCatch(error, info) {
                (0, _Log.logError)('componentDidCatch -> ', error, info);
            }
        }, {
            key: 'componentWillReceiveProps',
            value: function componentWillReceiveProps(nextProps) {
                this._props$.next(nextProps);
            }
        }, {
            key: 'componentWillUnmount',
            value: function componentWillUnmount() {
                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    for (var _iterator = this._subscriptionForRender[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var sub = _step.value;

                        sub.unsubscribe();
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

                var _iteratorNormalCompletion2 = true;
                var _didIteratorError2 = false;
                var _iteratorError2 = undefined;

                try {
                    for (var _iterator2 = this._mounted[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                        var mountItem = _step2.value;

                        mountItem();
                    }
                } catch (err) {
                    _didIteratorError2 = true;
                    _iteratorError2 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion2 && _iterator2.return) {
                            _iterator2.return();
                        }
                    } finally {
                        if (_didIteratorError2) {
                            throw _iteratorError2;
                        }
                    }
                }
            }
        }, {
            key: 'render',
            value: function render() {
                var old_sub = this._subscriptionForRender;
                this._subscriptionForRender = [];

                var renderOut = this._render(this.props, this.getValue$);

                var _iteratorNormalCompletion3 = true;
                var _didIteratorError3 = false;
                var _iteratorError3 = undefined;

                try {
                    for (var _iterator3 = old_sub[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                        var sub = _step3.value;

                        sub.unsubscribe();
                    }
                } catch (err) {
                    _didIteratorError3 = true;
                    _iteratorError3 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion3 && _iterator3.return) {
                            _iterator3.return();
                        }
                    } finally {
                        if (_didIteratorError3) {
                            throw _iteratorError3;
                        }
                    }
                }

                return renderOut;
            }
        }]);

        return NodeComponent;
    }(React.Component);
};

var createComponent = exports.createComponent = function createComponent(render) {
    return createComponentState(function (context) {
        return render;
    });
};