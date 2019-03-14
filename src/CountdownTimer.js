import React, { Component } from 'react';
import ReactAnimationFrame from 'react-animation-frame';
import { DateTime } from 'luxon';

import FixedWidthText from './FixedWidthText';

class CountdownTimer extends Component {
  onAnimationFrame() {
    this.forceUpdate();
  }

  render() {
    const diff = DateTime
                  .fromJSDate(this.props.until)
                  .diffNow()
                  .toFormat('hh:mm:ss.SSS');
    return (
      <div className="countdown-timer">
        <FixedWidthText text={diff} width="45px" />
      </div>
    );    
  }
}

export default ReactAnimationFrame(CountdownTimer);
