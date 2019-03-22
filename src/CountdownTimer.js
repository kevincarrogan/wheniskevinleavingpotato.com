import React, { Component } from 'react';
import ReactAnimationFrame from 'react-animation-frame';
import { DateTime } from 'luxon';

import FixedWidthText from './FixedWidthText';

const Fixed = ({ t }) => <FixedWidthText text={t} width="7.5rem" />;

class CountdownTimer extends Component {
  onAnimationFrame() {
    this.forceUpdate();
  }

  render() {
    const diff = DateTime.fromJSDate(this.props.until).diffNow();

    let [hh, mm, ss, millis] = diff.toFormat('hh:mm:ss:SSS').split(':');
    millis = `${millis[0]}${millis[1]}`;

    return (
      <div className="countdown-timer">
        {hh > 0 && (
          <>
            <Fixed t={hh} />:
          </>
        )}
        {(hh > 0 || mm > 0) && (
          <>
            <Fixed t={mm} />:
          </>
        )}
        <Fixed t={ss} />.<Fixed t={millis} />
      </div>
    );
  }
}

export default ReactAnimationFrame(CountdownTimer);
