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
      main: 'https://static8.depositphotos.com/1229718/862/i/600/depositphotos_8622033-stock-photo-out-of-order.jpg',
    };
    this.getNames = this.getNames.bind(this);
    this.thumbClick = this.thumbClick.bind(this);
  }

  componentDidMount() {
    this.getNames();
  }

  getNames() {
    axios.get('/items')
      .then(({ data }) => {
        this.setState({ images: data[0].images, main: data[0].images[0] });
      });
  }

  thumbClick(src) {
    this.setState({ main: src });
  }

  render() {
    const { images, main } = this.state;
    return (
      <div>

        <div className="col1"><Thumbs images={images} thumbs={this.thumbClick} /></div>

        <div className="col2">
          <img className="thumb" alt="noimage" src="left.png" />
        </div>

        <div className="col3">
          <img name="main" className="main" alt="noimage" src={main} />
        </div>

        <div className="col4">
          <img className="thumb" alt="noimage" src="right.png" />
        </div>

        <div className="col5">
          <img className="fav" alt="noimage" src="fav.png" />
        </div>

      </div>
    );
  }
}
export default App;
