// @flow

import React, { Component } from 'react';

type PropsType = {|
    title: string,
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
            <div>
                { title }
            </div>
        );
    }
}

export default Simple;
