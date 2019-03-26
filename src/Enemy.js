import image from './face.png';

import React from 'react';

const Enemy = ({ x, y }) => {
  const left = x - 50 / 2;
  const top = y - 50 / 2;

  return (
    <img
      alt=""
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
