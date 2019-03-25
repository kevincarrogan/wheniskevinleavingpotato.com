import React, { Component } from 'react';

const toRadians = angle => angle * (Math.PI / 180);

class Bullet extends Component {
  render() {
    const rotation = toRadians(this.props.rotation);
    var x = 45 * Math.cos(rotation + Math.PI);
    var y = 45 * Math.sin(rotation + Math.PI);
    return (
      <div
        style={{
          backgroundColor: `white`,
          borderRadius: `50%`,
          height: `10px`,
          left: `${295 - x}px`,
          position: `absolute`,
          top: `${280 - y}px`,
          width: `10px`,
        }}
      />
    );
  }
}

export default Bullet;
