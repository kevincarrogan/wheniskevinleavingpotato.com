import image from './face.png';

import React, { Component } from 'react';

const toRadians = angle => angle * (Math.PI / 180);
const velocity = 3;

class Enemy extends Component {
  constructor(props) {
    super(props);

    this.state = {
      lastTick: props.tick,
      movement: 450,
    };
  }

  static getDerivedStateFromProps(props, state) {
    const diff = props.tick - state.lastTick;
    const movement = state.movement - diff * velocity;

    const rotation = toRadians(props.rotation);
    const x = movement * Math.cos(rotation + Math.PI * 0.5);
    const y = movement * Math.sin(rotation + Math.PI * 0.5);

    const left = 275 - x;
    const top = 275 - y;

    return {
      lastTick: props.tick,
      left,
      top,
      movement,
    };
  }

  render() {
    return (
      <img
        src={image}
        style={{
          borderRadius: `50%`,
          height: `50px`,
          width: `50px`,
          left: `${this.state.left}px`,
          top: `${this.state.top}px`,
          position: `absolute`,
        }}
      />
    );
  }
}

export default Enemy;
