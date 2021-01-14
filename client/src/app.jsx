/* eslint-disable no-console */
import React from 'react';
import axios from 'axios';

console.log(`Updated: ${new Date().toLocaleTimeString('en-US', {
  hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: false,
})}`);

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [],
      main: '',
    };
    this.getNames = this.getNames.bind(this);
    this.thumbClick = this.thumbClick.bind(this);
  }

  componentDidMount() {
    this.getNames();
  }

  getNames() {
    axios.get('/names')
      .then(({ data }) => {
        this.setState({ images: data[0].images, main: data[0].images[0] });
      });
  }

  thumbClick(event) {
    event.preventDefault();
    console.log(event.target.src)
    this.setState({ main: event.target.src })
  }

  render() {
    return (
      <div>

        <div className="col1">
        {this.state.images.map((nameCard, index) =>
          <div key={nameCard + index}><img onClick={this.thumbClick} className="thumb" src={nameCard}/></div>)}
        </div>

        <div className="col2">
        <img className="thumb" src="left.png"/>
        </div>

        <div className="col3">
          <img name="main" className="main" src={this.state.main}/>
        </div>

        <div className="col4">
        <img className="thumb" src="right.png"/>
        </div>

        <div className="col5">
        <img className="fav" src="fav.png"/>
        </div>

      </div>
    );
  }
}
export default App;