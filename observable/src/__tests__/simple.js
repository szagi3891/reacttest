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
        const wrapper = mount(<Simple bar="baz" />);
    });
});
