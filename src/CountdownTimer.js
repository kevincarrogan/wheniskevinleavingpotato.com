import React, { Component } from 'react';
import ReactAnimationFrame from 'react-animation-frame';
import { DateTime } from 'luxon';

import FixedWidthText from './FixedWidthText';

const Fixed = ({ t }) => (
  <FixedWidthText text={t} width="90px" />
);

class CountdownTimer extends Component {
  onAnimationFrame() {
    this.forceUpdate();
  }

  render() {
    const diff = DateTime
                  .fromJSDate(this.props.until)
                  .diffNow();

    let [hh, mm, ss, sss] = diff.toFormat('hh:mm:ss:SSS').split(':');

    return (
      <div className="countdown-timer">
        { hh > 0 &&
          <>
            <Fixed t={hh} />:
          </>
        }
        {
          mm > 0 &&
          <>
            <Fixed t={mm} />:
          </>
        }
        <Fixed t={ss} />.<Fixed t={sss} />
      </div>
    );    
  }
}

export default ReactAnimationFrame(CountdownTimer);
