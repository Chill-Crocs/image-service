/* eslint-disable react/no-unused-state */
/* eslint-disable no-underscore-dangle */
import React from 'react';
import axios from 'axios';
import Thumbs from './thumbs';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      _id: 0,
      images: ['https://static8.depositphotos.com/1229718/862/i/600/depositphotos_8622033-stock-photo-out-of-order.jpg'],
      thumbClass: [],
      main: 0,
      favorite: false,
      fav: 'whiteHeart.svg',
    };
    this.getItems = this.getItems.bind(this);
    this.thumbClick = this.thumbClick.bind(this);
    this.leftClick = this.leftClick.bind(this);
    this.rightClick = this.rightClick.bind(this);
    this.changeFav = this.changeFav.bind(this);
  }

  componentDidMount() {
    this.getItems();
  }

  getItems() {
    axios.get('/items')
      .then(({ data }) => {
        let newFav;
        const thumbsArray = ['image-thumbMain'];
        for (let i = 1; i < data[0].images.length; i += 1) {
          thumbsArray.push('image-thumb');
        }
        if (data[0].favorite) {
          newFav = 'redHeart.svg';
        } else {
          newFav = 'whiteHeart.svg';
        }
        this.setState({
          _id: data[0]._id,
          images: data[0].images,
          fav: newFav,
          favorite: data[0].favorite,
          thumbClass: thumbsArray,
        });
      });
  }

  thumbClick(index) {
    const { thumbClass } = this.state;
    thumbClass[thumbClass.indexOf('image-thumbMain')] = 'image-thumb';
    thumbClass[index] = 'image-thumbMain';
    this.setState({ main: Number(index), thumbClass });
  }

  leftClick() {
    const { images, main, thumbClass } = this.state;
    thumbClass.push(thumbClass.shift());
    const max = images.length;
    if (main === 0) {
      this.setState({ main: max - 1 });
    } else {
      this.setState({ main: main - 1 });
    }
  }

  rightClick() {
    const { images, main, thumbClass } = this.state;
    thumbClass.unshift(thumbClass.pop());
    const max = images.length;
    if (main === max - 1) {
      this.setState({ main: 0 });
    } else {
      this.setState({ main: main + 1 });
    }
  }

  changeFav() {
    const { _id } = this.state;
    axios.patch('./items', { _id })
      .then(() => {
        this.getItems();
      });
  }

  render() {
    const {
      images, main, fav, thumbClass,
    } = this.state;
    return (
      <div className="image-grid">

        <Thumbs thumbClass={thumbClass} images={images} thumbs={this.thumbClick} />

        <div className="image-col2">
          <span onClick={this.leftClick} name="button" role="button" tabIndex={0} onKeyUp={this.leftClick}><img className="image-left" alt="noimage" src="left.svg" /></span>
        </div>

        <div className="image-col3">
          <img name="main" className="image-main" alt="noimage" src={images[main]} />
        </div>

        <div className="image-col4">
          <span onClick={this.changeFav} name="fav" role="button" tabIndex={0} onKeyUp={this.changeFav}><img className="image-fav" alt="noimage" src={fav} /></span>
          <span onClick={this.rightClick} role="button" tabIndex={0} onKeyUp={this.rightClick}><img className="image-right" alt="noimage" src="right.svg" /></span>
        </div>

      </div>
    );
  }
}
export default App;
