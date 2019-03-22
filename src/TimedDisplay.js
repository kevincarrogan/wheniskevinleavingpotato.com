import { Component } from 'react';
import ReactAnimationFrame from 'react-animation-frame';

class DisplayBefore extends Component {
  constructor(props) {
    super(props);
    this.state = { display: this.shouldDisplay(new Date()) };
  }

  shouldDisplay(date) {
    return date <= this.props.when;
  }

  onAnimationFrame() {
    this.setState({ display: this.shouldDisplay(new Date()) });
  }

  render() {
    if (this.state.display) {
      return this.props.children;
    }

    return null;
  }
}
DisplayBefore = ReactAnimationFrame(DisplayBefore);

class DisplayAfter extends Component {
  constructor(props) {
    super(props);
    this.state = { display: this.shouldDisplay(new Date()) };
  }

  shouldDisplay(date) {
    return date > this.props.when;
  }

  onAnimationFrame() {
    this.setState({ display: this.shouldDisplay(new Date()) });
  }

  render() {
    if (this.state.display) {
      return this.props.children;
    }

    return null;
  }
}
DisplayAfter = ReactAnimationFrame(DisplayAfter);

export { DisplayBefore, DisplayAfter };
