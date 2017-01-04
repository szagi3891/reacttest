import React, { Component } from 'react';
import {Editor, EditorState} from 'draft-js';

import './App.css';
import logo from './logo.svg';

class MyEditor extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            editorState: EditorState.createEmpty()
        };

        this.onChange = (editorState) => this.setState({editorState});
    }

    render() {
        const style = {
            border: '1px solid black'
        };

        return (
            <div style={style}>
                <Editor
                    editorState={this.state.editorState}
                    onChange={this.onChange}
                />
            </div>
        );
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
        <MyEditor />
      </div>
    );
  }
}

export default App;
