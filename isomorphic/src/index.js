import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

import Store from './Store';

const root = document.getElementById('root');

const dataInit = JSON.parse(root.getAttribute('data-init'));
Store.init(dataInit);

ReactDOM.render(
  <App />,
  root
);
