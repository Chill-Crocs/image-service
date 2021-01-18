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

describe('Rendering', () => {
  it('It should render App without crashing', () => {
    render(<App />);
  });

  it('It should render elements without crashing', () => {
    const wrapper = shallow(<App />);
    const element = (<img className="thumb" alt="noimage" src="left.svg" />);
    expect(wrapper.contains(element)).toEqual(true);
  });
});

describe('Thumbs', () => {
  const testProp = { images: ['one', 'two', 'three'] };
  const appWrapper = mount(<App />);
  appWrapper.setState({ images: ['one', 'two', 'three'], main: 0 });
  const thumbWrapper = mount(<Thumbs images={testProp.images} />);
  it('It should pass props to Thumbs', () => {
    expect(thumbWrapper.find('img').at(0).prop('src')).toEqual('one');
    const child = thumbWrapper.find('div');
    const click = child.find('div').at(2);
    click.simulate('click', { preventDefault: () => {}});
    expect(appWrapper.state('main')).toEqual(2);
  });
});

describe('Buttons', () => {
  const wrapper = shallow(<App />);
  wrapper.setState({ images: ['one', 'two', 'three'], main: 0 });
  it('It should change main state when button is clicked', () => {
    expect(wrapper.state('main')).toEqual(0);
    const click = wrapper.find('span').at(0);
    click.simulate('click', { preventDefault: () => {}});
    expect(wrapper.state('main')).toEqual(2);
  });
});

describe('Favorite', () => {
  const wrapper = shallow(<App />);
  wrapper.setState({ favorite: false });
  it('It should change main state when button is clicked', () => {
    // expect(wrapper.find('span').at(2).prop('name')).toEqual('fav');
    expect(wrapper.state('favorite')).toEqual(false);
    const click = wrapper.find('span').at(2);
    click.simulate('click', { preventDefault: () => {}});
    expect(wrapper.state('favorite')).toEqual(true);
  });
});


// class Thumbs extends React.Component {
//   constructor(props) {
//     super(props);
//     this.thumbClick = this.thumbClick.bind(this);
//   }

//   thumbClick(event) {
//     event.preventDefault();
//     const { thumbs } = this.props;
//     thumbs(event.target.src);
//   }

//   render() {
//     const { images } = this.props;
//     return (
//       <div className="col1">
//         {images.map((image) => <div role="button" tabIndex={0} onClick={this.thumbClick} onKeyUp={this.thumbClick} key={image + (Math.random() * Math.floor(100))}><img className="thumb" alt="noimage" src={image} /></div>)}
//       </div>
//     );
//   }
// }
