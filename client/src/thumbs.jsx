import React from 'react';
import PropTypes from 'prop-types';

class Thumbs extends React.Component {
  constructor(props) {
    super(props);
    this.thumbClick = this.thumbClick.bind(this);
  }

  thumbClick(event) {
    event.preventDefault();
    const { thumbs } = this.props;
    thumbs(event.target.name);
  }

  render() {
    const { images, thumbClass } = this.props;
    return (
      <div className="image-col1">
        {images.map((image, index) => <div name={index} role="button" tabIndex={0} onClick={this.thumbClick} onKeyUp={this.thumbClick} key={image + (Math.random() * Math.floor(100))}><img name={index} className={thumbClass[index]} alt="noimage" src={image} /></div>)}
      </div>
    );
  }
}

Thumbs.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
  thumbClass: PropTypes.arrayOf(PropTypes.string).isRequired,
  thumbs: PropTypes.func.isRequired,
};

export default Thumbs;
