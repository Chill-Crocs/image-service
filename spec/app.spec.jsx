/* eslint-disable max-len */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/jsx-closing-tag-location */
/* eslint-disable react/jsx-indent */
/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable quotes */
/* eslint-disable comma-dangle */
/* eslint-disable no-undef */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable object-curly-spacing */
import { shallow, render, mount } from 'enzyme';
import React from 'react';
import App from '../client/src/app';
import Thumbs from '../client/src/thumbs';

describe('App', () => {
  it('It should render elements without crashing', () => {
    const appWrapper = shallow(<App />);
    const element = (<img className="image-left" alt="noimage" src="left.svg" />);
    expect(appWrapper.contains(element)).toEqual(true);
  });

  it('It should change the main image when button is clicked', () => {
    const spy = jest.spyOn(App.prototype, 'leftClick');
    const wrapper = shallow(<App />);
    wrapper.find('span').at(0).simulate('click', { preventDefault: () => {}});
    expect(spy).toHaveBeenCalled();
  });

  it('It should change the favorite button when it is clicked', () => {
    const spy = jest.spyOn(App.prototype, 'changeFav');
    const wrapper = shallow(<App />);
    wrapper.find('span').at(3).simulate('click', { preventDefault: () => {}});
    expect(spy).toHaveBeenCalled();
  });
});
