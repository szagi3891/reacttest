import React, { Component } from 'react';
import logo from './logo.svg';
import AppItem from './AppItem';
import './App.css';

class App extends Component {
    
    constructor() {
        super();

        this.state = {
            list: [0,1]
        };
    }
    
    render() {
    return (
        <div className="App">
            <div className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <h2>Welcome to React</h2>
            </div>
            <div style={{marginTop: '20px', marginBottom: '20px'}}>
                <button onClick={this._addNew.bind(this)}>Dodaj kolejny element</button>
            </div>
            <div className="list">
                <div className="listLeft">
                    {this._renderList()}
                </div>
                <div className="listRight">
                    {this._renderList()}
                </div>
            </div>
        </div>
        );
    }
  
  _addNew() {
      const { list } = this.state;
      this.setState({
          list: list.concat([list.length])
      });
  }

  _renderList() {
      const { list } = this.state;
      
      return list.map((itemId) => <AppItem key={itemId} id={itemId} />);
  }
}

export default App;
