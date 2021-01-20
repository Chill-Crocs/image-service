import React from 'react';
import PropTypes from 'prop-types';
import Thumbs from './thumbs';

class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showZoomModal: false,
    };
    this.thumbClick = this.thumbClick.bind(this);
    this.leftClick = this.leftClick.bind(this);
    this.rightClick = this.rightClick.bind(this);
    this.zoom = this.zoom.bind(this);
  }

  onClose(event) {
    this.setState({ showZoomModal: false });
    const { onClose } = this.props;
    if (onClose) {
      onClose(event);
    }
  }

  thumbClick(index) {
    const { modalThumbs } = this.props;
    modalThumbs(index);
  }

  leftClick() {
    const { left } = this.props;
    left();
  }

  rightClick() {
    const { right } = this.props;
    right();
  }

  zoom() {
    const { showZoomModal } = this.state;
    this.setState({ showZoomModal: !showZoomModal });
  }

  render() {
    const { showZoomModal } = this.state;
    const {
      showModal, images, main, thumbClass,
    } = this.props;
    if (!showModal) {
      return null;
    }
    if (!showZoomModal) {
      return (
        <div className="image-backGround">
          <div className="image-modalHeader">
            <span
              onClick={(event) => this.onClose(event)}
              role="button"
              tabIndex={0}
              onKeyUp={(event) => this.onClose(event)}
            >
              <img
                className="image-modalClose image-modalButton"
                alt="noimage"
                src="close.svg"
              />
            </span>
          </div>

          <div className="image-modalGrid">
            <div className="image-modelCarousel">
              <div className="image-modalCol1">
                <span
                  onClick={(event) => this.leftClick(event)}
                  role="button"
                  tabIndex={0}
                  onKeyUp={(event) => this.leftClick(event)}
                >
                  <img
                    className="image-modalLeft"
                    alt="noimage"
                    src="left.svg"
                  />
                </span>
              </div>

              <span onClick={this.zoom} className="image-modalCol2 image-colModalMain" name="main" role="button" tabIndex={0} onKeyUp={this.zoom}>
                <img
                  className="image-modalMain"
                  alt="noimage"
                  src={images[main]}
                />
              </span>

              <div className="image-modalCol3">
                <span
                  onClick={(event) => this.rightClick(event)}
                  role="button"
                  tabIndex={0}
                  onKeyUp={(event) => this.rightClick(event)}
                >
                  <img
                    className="image-modalRight"
                    alt="noimage"
                    src="right.svg"
                  />
                </span>
              </div>
            </div>

            <Thumbs thumbClass={thumbClass} images={images} thumbs={this.thumbClick} />

          </div>
        </div>
      );
    }
    return (
      <div className="image-backGround">
        <div className="image-modalHeader">
          <span
            onClick={(event) => this.onClose(event)}
            role="button"
            tabIndex={0}
            onKeyUp={(event) => this.onClose(event)}
          >
            <img
              className="image-modalClose image-modalButton"
              alt="noimage"
              src="close.svg"
            />
          </span>
        </div>

        <div className="image-modalGrid">
          <div className="image-modelCarousel">
            <span onClick={this.zoom} className="image-modalZoomBox" name="main" role="button" tabIndex={0} onKeyUp={this.zoom}>
              <img
                className="image-modalZoomMain"
                alt="noimage"
                src={images[main]}
              />
            </span>
          </div>

          <Thumbs thumbClass={thumbClass} images={images} thumbs={this.thumbClick} />
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
  thumbClass: PropTypes.arrayOf(PropTypes.string).isRequired,
  showModal: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  left: PropTypes.func.isRequired,
  modalThumbs: PropTypes.func.isRequired,
  right: PropTypes.func.isRequired,
  main: PropTypes.number.isRequired,
};

export default Modal;