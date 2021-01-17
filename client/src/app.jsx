/* eslint-disable no-console */
import React from 'react';
import axios from 'axios';
import Thumbs from './thumbs';

console.log(`Updated: ${new Date().toLocaleTimeString('en-US', {
  hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: false,
})}`);

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      images: ['https://static8.depositphotos.com/1229718/862/i/600/depositphotos_8622033-stock-photo-out-of-order.jpg'],
      main: 0,
      favorite: false,
      fav: 'whiteHeart.svg',
    };
    this.getNames = this.getNames.bind(this);
    this.thumbClick = this.thumbClick.bind(this);
    this.leftClick = this.leftClick.bind(this);
    this.rightClick = this.rightClick.bind(this);
    this.changeFav = this.changeFav.bind(this);
  }

  componentDidMount() {
    this.getNames();
  }

  getNames() {
    axios.get('/items')
      .then(({ data }) => {
        let newFav;
        if (data[0].favorite) {
          newFav = 'redHeart.svg';
        } else {
          newFav = 'whiteHeart.svg';
        }
        this.setState({ images: data[0].images, favorite: data[0].favorite, fav: newFav });
      });
  }

  thumbClick(index) {
    this.setState({ main: Number(index) });
  }

  leftClick() {
    const { images, main } = this.state;
    const max = images.length;
    if (main === 0) {
      this.setState({ main: max - 1 });
    } else {
      this.setState({ main: main - 1 });
    }
  }

  rightClick() {
    const { images, main } = this.state;
    const max = images.length;
    if (main === max - 1) {
      this.setState({ main: 0 });
    } else {
      this.setState({ main: main + 1 });
    }
  }

  changeFav() {
    // eslint-disable-next-line no-unused-vars
    const { favorite, fav } = this.state;
    const newFav = !favorite ? 'redHeart.svg' : 'whiteHeart.svg';
    this.setState({ favorite: !favorite, fav: newFav });
  }

  render() {
    const { images, main, fav } = this.state;
    return (
      <div>

        <div className="col1"><Thumbs images={images} thumbs={this.thumbClick} /></div>

        <div className="col2">
          <span onClick={this.leftClick} role="button" tabIndex={0} onKeyUp={this.leftClick}><img className="thumb" alt="noimage" src="left.svg" /></span>
        </div>

        <div className="col3">
          <img name="main" className="main" alt="noimage" src={images[main]} />
        </div>

        <div className="col4">
          <span onClick={this.rightClick} role="button" tabIndex={0} onKeyUp={this.rightClick}><img className="thumb" alt="noimage" src="right.svg" /></span>
        </div>

        <div className="col5">
          <span onClick={this.changeFav} role="button" tabIndex={0} onKeyUp={this.changeFav}><img className="thumb" alt="noimage" src={fav} /></span>
        </div>

      </div>
    );
  }
}
export default App;
