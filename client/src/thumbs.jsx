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
    const { images } = this.props;
    return (
      <div className="col1">
        {images.map((image, index) => <div name={index} role="button" tabIndex={0} onClick={this.thumbClick} onKeyUp={this.thumbClick} key={image + (Math.random() * Math.floor(100))}><img name={index} className="thumb" alt="noimage" src={image} /></div>)}
      </div>
    );
  }
}

Thumbs.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
  thumbs: PropTypes.func.isRequired,
};

export default Thumbs;
