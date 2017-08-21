import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


type PropsType = {
    id: string,
};

class View extends ViewBase<PropsType> {
   render() {
      const model = this.models.message.get(this.props.id);

      if (model) {
          return (
              <div>
                  model tenże
              </div>
          );
      }

      return null;
   }
}


class App extends Component {
    render() {
        return (
            <div className="App">
                <div className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h2>Welcome to React</h2>
                </div>
                <p className="App-intro">
                    To get started, edit <code>src/App.js</code> and save to reload.
                </p>
            </div>
        );
    }
}

export default App;
