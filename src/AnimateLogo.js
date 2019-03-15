import React, { Component } from 'react';
import ReactAnimationFrame from 'react-animation-frame';
import { DateTime } from 'luxon';

const timeDiff = fromDate => (
  DateTime
    .fromJSDate(fromDate)
    .diffNow()
);

const scaleFromInterval = interval => (
  1 - (interval.toFormat('hh:mm:ss:SSS').split(':')[3] / 1000)
);

const easeOutQuad = value => (
  (--value) * value * value + 1
);

class AnimateLogo extends Component {
  constructor(props) {
    super(props);
    this.state = {scale: 1};
  }

  onAnimationFrame() {
    const diff = timeDiff(this.props.leavingTime);
    const scale = scaleFromInterval(diff);
    const easedScale = easeOutQuad(scale);
    this.setState({scale: easedScale});
  }

  render() {
    return this.props.children(this.state.scale);
  }
}

export default ReactAnimationFrame(AnimateLogo);
