import React from 'react';
import { renderToString } from 'react-dom/server'
import App from './App';

import Express from 'express';
import Html from './Html';

const app = Express();
const port = 8000;

app.get('/', (req, res) => {
    res.setHeader('Content-Type', 'text/html');

    //TODO - tutaj dane ...
/*
    let items = [
        'Item 0',
        'Item 1',
    ];
*/

    res.end(renderToString(<Html />));
});

app.use('/static', Express.static('static'));

app.listen(port, function () {
    console.log(`Example app listening on port ${port}!`);
});

export default app;



/*
const app = <App />;
//const app = React.createElement(App);

console.log("\n\n\n");
console.log('app', app);
console.log("\n\n\n");

setTimeout(() => {
  console.warn(renderToString(app));
}, 1000);
*/