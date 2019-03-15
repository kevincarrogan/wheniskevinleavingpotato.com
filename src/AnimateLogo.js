import React, { Component } from 'react';
import ReactAnimationFrame from 'react-animation-frame';
import { DateTime } from 'luxon';

class AnimateLogo extends Component {
  constructor(props) {
    super(props);
    this.state = {scale: 1};
  }

  onAnimationFrame() {
    const diff = DateTime
                  .fromJSDate(this.props.leavingTime)
                  .diffNow();
    let scale = 1 - (diff.toFormat('hh:mm:ss:SSS').split(':')[3] / 1000);
    scale = (--scale) * scale * scale + 1;
    this.setState({scale});
  }

  render() {
    return this.props.children(this.state.scale);
  }
}

export default ReactAnimationFrame(AnimateLogo);
