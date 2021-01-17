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

  it('It should render divisions without crashing', () => {
    const wrapper = shallow(<App />);
    const div2 = (<div className="col2"><img className="thumb" alt="noimage" src="left.png" /></div>);
    expect(wrapper.contains(div2)).toEqual(true);
  });
});

describe('Props', () => {
  const testProp = { images: ['one', 'two', 'three'] };
  const appWrapper = mount(<App />);
  appWrapper.setState({ images: ['one', 'two', 'three'], main: 'one' });
  const thumbWrapper = mount(<Thumbs images={testProp.images} />);
  it('It should pass props', () => {
    expect(thumbWrapper.find('img').at(0).prop('src')).toEqual('one');
    const child = thumbWrapper.find('div');
    const click = child.find('div').at(2);
    click.simulate('click', { preventDefault: () => {}});
    expect(appWrapper.state('main')).toEqual('two');
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
