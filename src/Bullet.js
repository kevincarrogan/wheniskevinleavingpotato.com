import React from 'react';

const Bullet = ({ x, y }) => {
  const left = 295 - x;
  const top = 295 - y;

  return (
    <div
      style={{
        backgroundColor: `white`,
        borderRadius: `50%`,
        height: `10px`,
        left: `${left}px`,
        position: `absolute`,
        top: `${top}px`,
        width: `10px`,
      }}
    />
  );
};

export default Bullet;
