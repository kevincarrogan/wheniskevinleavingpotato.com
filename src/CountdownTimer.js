import React from 'react';
import { DateTime } from 'luxon';

const CountdownTimer = ({ until }) => {
  const diff = DateTime
                .fromJSDate(until)
                .diffNow()
                .toFormat('hh:mm:ss.SSS');
  return (
    <div className="countdown-timer">
      {diff}
    </div>
  );
};

export default CountdownTimer;
