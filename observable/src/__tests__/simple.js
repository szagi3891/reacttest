// @flow

import React from 'react';
import { mount } from 'enzyme';
import sinon from 'sinon';
import Simple from '../Simple';

describe('simple', () => {

    it('podstawowy', () => {

      sinon.spy(Simple.prototype, 'componentDidMount');
      const wrapper = mount(<Simple />);
      expect(Simple.prototype.componentDidMount.calledOnce).toEqual(true);
    });

    it('podstawowy2', () => {
        window.ImageConst = 'Jakis tajny tekst';

        const wrapper = mount(<Simple title="baz" />);
        expect(wrapper.props().title).toEqual("baz");
        wrapper.setProps({title: "foo"});
        expect(wrapper.props().title).toEqual("foo");


        const onClick = sinon.spy();
        wrapper.setProps({onClick: onClick});
        wrapper.find('button').simulate('click');
        expect(onClick.calledOnce).toEqual(true);


        let messRet = null;
        wrapper.setProps({onClick: (label: string) => {
            messRet = label;
        }});
        wrapper.find('button').simulate('click');
        expect(messRet).toEqual("Jakis tajny tekst");

        //http://airbnb.io/enzyme/docs/api/mount.html
    });
});
