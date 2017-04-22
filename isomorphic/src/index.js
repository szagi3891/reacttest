import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

import Store from './Store';

const root = document.getElementById('root');

const dataInit = JSON.parse(root.getAttribute('data-init'));
Store.init(dataInit);

console.log('hot test - start');

ReactDOM.render(
  <App />,
  root
);

console.log('hot test');

if (module.hot) {
    console.log('hot accept');
    module.hot.accept();
    module.hot.dispose(() => {
        console.log('dospose');
    })
}