import React, { Component } from 'react';

const toRadians = angle => angle * (Math.PI / 180);
const velocity = 5;

class Bullet extends Component {
  constructor(props) {
    super(props);

    this.state = {
      lastTick: props.tick,
      movement: 45,
    };
  }

  static getDerivedStateFromProps(props, state) {
    const diff = props.tick - state.lastTick;
    const movement = state.movement + diff * velocity;

    return {
      lastTick: props.tick,
      movement,
    };
  }

  render() {
    const rotation = toRadians(this.props.rotation);
    const x = this.state.movement * Math.cos(rotation + Math.PI * 1.5);
    const y = this.state.movement * Math.sin(rotation + Math.PI * 1.5);

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
  }
}

export default Bullet;
