import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class RecyleView extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
    this.state = {
      list: [...Array(1000).keys()],
      showlist: []
    };
  }

  componentDidMount() {
    const { list } = this.state;
    this.setState({
      showlist: list.slice(0, 16)
    });
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }
  handleScroll() {
    console.log('scroll...');
  }
  onScroll = () => {
    const { list } = this.state;
    const scrollY = window.scrollY; //Don't get confused by what's scrolling - It's not the window
    const scrollTop = this.myRef.current.scrollTop;
    console.log(`onScroll, window.scrollY: ${scrollY} myRef.scrollTop: ${scrollTop}`);
    const start = Math.floor(scrollTop/30);
    const end = scrollTop + 16;
    console.log('start:',start);
    console.log('end:',end);
    this.setState({
      showlist: list.slice(start, end)
    })
  };

  render() {
    const { showlist } = this.state;
    const testDiv = showlist.map((item) => {
      return (
        <div className="item-container" style={{ top: item * 30 + 'px' }} key={item}>
          {item}
        </div>
      );
    });
    return (
      <div className="container" onScroll={this.onScroll} ref={this.myRef}>
        <div className="wrapper">{testDiv}</div>
      </div>
    );
  }
}

ReactDOM.render(<RecyleView></RecyleView>, document.getElementById('root'));
