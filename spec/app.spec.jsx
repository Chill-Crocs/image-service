/* eslint-disable quotes */
/* eslint-disable comma-dangle */
/* eslint-disable no-undef */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable object-curly-spacing */
import React from 'react';
import { mount, shallow } from 'enzyme';
import { App } from '../client/src/app';

describe('Render props', () => {
  let wrapper;
  beforeEach(() => { wrapper = shallow(<App />); });
  test('should have required props', () => {
    const one = wrapper.find('span');
    expect(one.text()).toHaveProp('hello');
  });
});
