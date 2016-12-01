import {Component} from 'react';
import Immutable from 'immutable';

class PureComponent extends Component {

    constructor(props) {
        super(props);
    }

    shouldComponentUpdate(nextProps: mixed, nextState: mixed): bool {
        return (
            !this._shallowEqual(this.props, nextProps) ||
            !this._shallowEqual(this.state, nextState)
        );
    }

    _shallowEqual(oldObj: mixed, newObj: mixed): bool {
        if (oldObj === newObj) {
            return true;
        }

        if (typeof newObj !== 'object' ||
            typeof oldObj !== 'object') {
            console.info('shallow ', arguments);
            throw Error('cos poszło nie tak');
        }

        const oldKeys = Object.keys(newObj);
        const newKeys = Object.keys(oldObj);

        if (oldKeys.length !== newKeys.length) {
            return false;
        }
        
        for (let i = 0; i < oldKeys.length; i++) {
            const oldData = oldObj[oldKeys[i]];
            const newData = newObj[newKeys[i]];

            if (!Immutable.is(oldData, newData)) {
                return false;
            }
        }

        return true;
    }
}

export default PureComponent;

/*
    https://gist.github.com/samwgoldman/79d0da4bda25738c20c1

    var React = require("react")
    var Immutable = require("immutable")

    // In order to use any type as props, including Immutable objects, we
    // wrap our prop type as the sole "data" key passed as props.
    type Component<P> = ReactClass<{},{ data: P },{}>
    type Element = ReactElement<any, any, any>

    // Our componenets are truly a function of props, and immutability is
    // assumed. This discipline is a feature, not a bug.
    function component<P>(render: (props: P) => Element): Component<P> {
      return (React.createClass({
        shouldComponentUpdate(props) {
          return !Immutable.is(this.props.data, props.data)
        },
        render() {
          return render((this.props.data : any))
        }
      }) : any)
    }

    // Defining components couldn't be simpler.
    var Example: Component<string> = component((foo) => {
      return <span>{foo}</span>
    })

    // In order to use JSX, we need to pass our props as `data`, but flow
    // will still type check this for us.
    var foo = <Example data={"bar"} />
*/