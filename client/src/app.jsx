/* eslint-disable react/no-unused-state */
/* eslint-disable no-underscore-dangle */
import React from 'react';
import axios from 'axios';
import Thumbs from './thumbs';
import Modal from './modal';

class App extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      _id: 0,
      images: [],
      thumbClass: [],
      modalThumbClass: [],
      main: 0,
      modalMain: 0,
      favorite: false,
      fav: 'whiteHeart.svg',
      showModal: true, // change to false
    };
    this.getItems = this.getItems.bind(this);
    this.thumbClick = this.thumbClick.bind(this);
    this.leftClick = this.leftClick.bind(this);
    this.rightClick = this.rightClick.bind(this);
    this.leftModalClick = this.leftModalClick.bind(this);
    this.rightModalClick = this.rightModalClick.bind(this);
    this.modalThumbs = this.modalThumbs.bind(this);
    this.mainClick = this.mainClick.bind(this);
    this.changeFav = this.changeFav.bind(this);
  }

  componentDidMount() {
    this.getItems();
  }

  getItems() {
    const { main } = this.state;
    axios.get('/items')
      .then(({ data }) => {
        const item = 0;
        let newFav;
        const thumbsArray = [];
        const modalThumbsArray = [];
        for (let i = 0; i < data[item].images.length; i += 1) {
          if (i === main) {
            thumbsArray.push('image-thumbMain');
          } else {
            thumbsArray.push('image-thumb');
          }
          if ((i + 1) % 3 === 0) {
            modalThumbsArray.push('image-modalThumbMain');
          } else {
            modalThumbsArray.push('image-modalThumb');
          }
        }
        if (data[item].favorite) {
          newFav = 'redHeart.svg';
        } else {
          newFav = 'whiteHeart.svg';
        }
        this.setState({
          _id: data[item]._id,
          images: data[item].images,
          fav: newFav,
          favorite: data[item].favorite,
          thumbClass: thumbsArray,
          modalThumbClass: modalThumbsArray,
        });
      });
  }

  thumbClick(index) {
    // setTimeout(() => document.getElementById('main').classList.remove('fade-in'), 500);
    // document.getElementById('main').classList.toggle('fade-in');
    const { thumbClass } = this.state;
    thumbClass[thumbClass.indexOf('image-thumbMain')] = 'image-thumb';
    thumbClass[index] = 'image-thumbMain';
    this.setState({ main: Number(index), thumbClass });
  }

  leftClick() {
    // setTimeout(() => document.getElementById('main').classList.remove('fade-in'), 500);
    // document.getElementById('main').classList.toggle('fade-in');
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
    // setTimeout(() => document.getElementById('main').classList.remove('fade-in'), 500);
    // document.getElementById('main').classList.toggle('fade-in');
    const { images, main, thumbClass } = this.state;
    thumbClass.unshift(thumbClass.pop());
    const max = images.length;
    if (main === max - 1) {
      this.setState({ main: 0 });
    } else {
      this.setState({ main: main + 1 });
    }
  }

  leftModalClick() {
    const { modalMain, images } = this.state;
    const max = images.length;
    if (modalMain === 0) {
      this.setState({ modalMain: max - 1 });
    } else {
      this.setState({ modalMain: modalMain - 1 });
    }
  }

  rightModalClick() {
    const { modalMain, images } = this.state;
    const max = images.length;
    if (modalMain === max - 1) {
      this.setState({ modalMain: 0 });
    } else {
      this.setState({ modalMain: modalMain + 1 });
    }
  }

  modalThumbs(index) {
    this.setState({ modalMain: Number(index) });
  }

  mainClick(event) {
    event.preventDefault();
    const { showModal, main } = this.state;
    this.setState({ showModal: !showModal, modalMain: main });
  }

  changeFav(event) {
    event.preventDefault();
    const { _id } = this.state;
    axios.patch('./items', { _id })
      .then(() => {
        this.getItems();
      });
  }

  render() {
    const {
      images, main, fav, thumbClass, modalThumbClass,
      showModal, modalMain,
    } = this.state;
    return (
      <div className="image-grid">

        <Thumbs thumbClass={thumbClass} images={images} thumbs={this.thumbClick} />

        <div className="image-col2">
          <span onClick={this.leftClick} name="button" role="button" tabIndex={0} onKeyUp={this.leftClick}><img className="image-left" alt="noimage" src="left.svg" /></span>
        </div>

        <div className="image-col3 image-colMain">
          <span onClick={this.mainClick} name="main" role="button" tabIndex={0} onKeyUp={this.mainClick}><img id="main" name="main" className="image-main" alt="noimage" src={images[main]} /></span>
        </div>

        <div className="image-col4">
          <span onClick={this.rightClick} role="button" tabIndex={0} onKeyUp={this.rightClick}><img className="image-right" alt="noimage" src="right.svg" /></span>
        </div>

        <span onClick={this.changeFav} name="fav" role="button" tabIndex={0} onKeyUp={this.changeFav}><img className="image-fav" alt="noimage" src={fav} /></span>

        <Modal
          thumbClass={modalThumbClass}
          images={images}
          main={modalMain}
          showModal={showModal}
          onClose={this.mainClick}
          left={this.leftModalClick}
          right={this.rightModalClick}
          modalThumbs={this.modalThumbs}
        />

      </div>
    );
  }
}
export default App;
