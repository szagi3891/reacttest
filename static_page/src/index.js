//@flow

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

const root = document.getElementById('root');

    //czytaj inicjace dane z tego atrybutu
//root.getAttribute('data-init');

const initData = {
    page32 : {                          //      /page32
        title: "page 32 title",
        body: "jakies tam se body"
    }
};

const component = (
    <App
        init={initData}
        //dasda="12"
    />
);

ReactDOM.render(component, root);
