import React from 'react';

const Bullet = ({ x, y }) => {
  const left = x - 10 / 2;
  const top = y - 10 / 2;

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
