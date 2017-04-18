import React from 'react';
import { renderToString } from 'react-dom/server'
import App from './App';

const app = <App />;
//const app = React.createElement(App);

console.log("\n\n\n");
console.log('app', app);
console.log("\n\n\n");

setTimeout(() => {
  console.warn(renderToString(app));
}, 1000);
