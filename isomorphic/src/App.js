import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            test: 1,
            test2: 2
        };
        this._trzecia = 3;
    }

  componentWillMount() {
    this.setState({
      test : 111
    });
    setTimeout(() => {
        console.warn('zaszedł timeout');

        this.setState({
            test2: 222
        });
        this._trzecia = 333;
    }, 1000);

    setTimeout(() => {
        console.warn('force update');
        this.forceUpdate();
    }, 2000);
  }

  render() {
    console.warn('rerender ....');

    const { test, test2 } = this.state;

    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React "__{ test }__{ test2 }....{ this._trzecia }===="</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
