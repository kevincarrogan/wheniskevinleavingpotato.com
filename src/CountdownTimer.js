import React, { Component } from 'react';
import ReactAnimationFrame from 'react-animation-frame';
import { DateTime } from 'luxon';

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
        {diff}
      </div>
    );    
  }
}

export default ReactAnimationFrame(CountdownTimer);
