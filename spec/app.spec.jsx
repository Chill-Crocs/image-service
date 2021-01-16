/* eslint-disable quotes */
/* eslint-disable comma-dangle */
/* eslint-disable no-undef */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable object-curly-spacing */
import { shallow } from 'enzyme';
import React from 'react';
import App from '../client/src/app';

describe('Rendering', () => {
  const wrapper = shallow(<App />);
  it('should render', () => {
    // expect(toJSON(wrapper)).toMatchSnapshot();
    const one = wrapper.find('span');
    expect(one.text()).toBe('hello');
  });
});