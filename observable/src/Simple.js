// @flow

import React, { Component } from 'react';

type PropsType = {|
    title?: string,
    onClick?: (imageTitle: string) => void,
|};

class Simple extends Component {

    props: PropsType;

    constructor(props: PropsType) {
        super(props);
        console.warn('jakis konstruktor');
    }

    componentWillMount() {
        console.warn('component will mount');
    }

    componentDidMount() {
        console.warn('component did mount');
    }

/*
    componentWillReceiveProps(nextProps: PropsTypeIn) {
    }

    componentWillUnmount() {
    }
*/

    render(): React.Element<*> {
        const { title } = this.props;

        return (
            <div className="SimpleWrapper">
                { title }
                <button onClick={this._onClick.bind(this)}>kliknij</button>
            </div>
        );
    }

    _onClick() {
        const { onClick } = this.props;

        if (onClick) {
            onClick(window.ImageConst);
        }
    }
}

export default Simple;
