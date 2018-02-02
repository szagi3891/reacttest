'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var React = _interopRequireWildcard(_react);

var _Reactive = require('./Reactive');

var _Log = require('./Log');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var isSSR = typeof window === 'undefined';

var BaseComponent = function (_React$Component) {
    _inherits(BaseComponent, _React$Component);

    _createClass(BaseComponent, [{
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
    }]);

    function BaseComponent(props) {
        _classCallCheck(this, BaseComponent);

        var _this = _possibleConstructorReturn(this, (BaseComponent.__proto__ || Object.getPrototypeOf(BaseComponent)).call(this));

        _this._blank = function () {};

        _this._subscriptionForRender = [];
        _this._mounted = [];

        _this._props$ = new _Reactive.ValueSubject(props);

        var oldRender = _this.render.bind(_this);

        //$FlowFixMe
        _this.render = function () {

            var old_sub = _this._subscriptionForRender;
            _this._subscriptionForRender = [];

            var renderOut = oldRender();

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
        };
        return _this;
    }

    _createClass(BaseComponent, [{
        key: 'getProps$',
        value: function getProps$() {
            return this._props$.asObservable();
        }
    }, {
        key: 'getValue$',
        value: function getValue$(stream) {
            var _this2 = this;

            var isSet = false;
            //$FlowFixMe
            var result = null;

            var subscription = stream.subscribe(function (data) {
                if (isSet === false) {
                    isSet = true;
                    result = data;
                } else {
                    _this2.forceUpdate();
                }
            });

            if (isSet !== true) {
                throw Error('panic');
            }

            if (isSSR) {
                subscription.unsubscribe();
            } else {
                this._subscriptionForRender.push(subscription);
            }

            return result;
        }
    }, {
        key: 'subscribe$',
        value: function subscribe$(obs) {
            var subscription = obs.subscribe(this._blank);

            this._mounted.push(function () {
                subscription.unsubscribe();
            });
        }
    }, {
        key: 'mount$',
        value: function mount$(_ref) {
            var _ref2 = _slicedToArray(_ref, 2),
                observable = _ref2[0],
                disconnect = _ref2[1];

            this._mounted.push(disconnect);
            return observable;
        }
    }]);

    return BaseComponent;
}(React.Component);

exports.default = BaseComponent;