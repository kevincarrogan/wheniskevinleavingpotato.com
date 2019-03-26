import image from './face.png';

import React from 'react';

const Enemy = ({ x, y }) => {
  const left = 275 - x;
  const top = 275 - y;

  return (
    <img
      src={image}
      style={{
        borderRadius: `50%`,
        height: `50px`,
        width: `50px`,
        left: `${left}px`,
        top: `${top}px`,
        position: `absolute`,
      }}
    />
  );
};

export default Enemy;
