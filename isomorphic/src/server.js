import React from 'react';
import { renderToString } from 'react-dom/server'
import App from './App';

const app = <App />;
//const app = React.createElement(App);

setTimeout(() => {
  console.warn(renderToString(app));
}, 5000);
