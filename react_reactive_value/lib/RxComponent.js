'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.createRxComponent = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _react = require('react');

var React = _interopRequireWildcard(_react);

var _Reactive = require('./Reactive');

var _immutable = require('immutable');

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

/*
    wzorowane na : https://github.com/acdlite/react-rx-component
*/

var isSSR = typeof window === 'undefined';

var isEqualProps = function isEqualProps(a, b) {
    return !shoudUpdate(a, b);
};

var createRxComponent = exports.createRxComponent = function createRxComponent(componentName, mapProps, InnerComponent) {
    var _class, _temp;

    InnerComponent.displayName = componentName + 'Inner';

    return _temp = _class = function (_React$Component) {
        _inherits(RxComponent, _React$Component);

        function RxComponent(props) {
            _classCallCheck(this, RxComponent);

            var _this = _possibleConstructorReturn(this, (RxComponent.__proto__ || Object.getPrototypeOf(RxComponent)).call(this, props));

            _this.receive$ = new _Reactive.ValueSubject(_this.props);
            _this.mounted$ = new _Reactive.ValueSubject(false);
            _this.innerProps = null;

            var newProps$ = mapProps(_this.receive$.asObservable()).distinctUntilChanged(isEqualProps);

            _this.subscription = newProps$.withLatestFrom(_this.mounted$.asObservable()).subscribe(function (_ref) {
                var _ref2 = _slicedToArray(_ref, 2),
                    props = _ref2[0],
                    mounted = _ref2[1];

                _this.innerProps = props;

                if (mounted) {
                    _this.forceUpdate();
                }
            });

            if (isSSR) {
                _this.subscription.unsubscribe();
            }
            return _this;
        }

        _createClass(RxComponent, [{
            key: 'shouldComponentUpdate',
            value: function shouldComponentUpdate() {
                return false;
            }
        }, {
            key: 'componentWillMount',
            value: function componentWillMount() {
                this.mounted$.next(true);
            }
        }, {
            key: 'componentWillReceiveProps',
            value: function componentWillReceiveProps(nextProps) {
                this.receive$.next(nextProps);
            }
        }, {
            key: 'componentWillUnmount',
            value: function componentWillUnmount() {
                this.mounted$.next(false);
                this.subscription.unsubscribe();
            }
        }, {
            key: 'render',
            value: function render() {
                if (this.innerProps !== null) {
                    return React.createElement(InnerComponent, this.innerProps);
                }

                throw Error('panic - to nigdy nie powinno si\u0119 wydarzy\u0107 - ' + componentName);
            }
        }, {
            key: 'componentDidCatch',
            value: function componentDidCatch(error, info) {
                (0, _Log.logError)('RxComponent componentDidCatch -> ', error, info);
            }
        }]);

        return RxComponent;
    }(React.Component), _class.displayName = '' + componentName, _temp;
};