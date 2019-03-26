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

    const rotation = toRadians(props.rotation);
    const x = state.movement * Math.cos(rotation + Math.PI * 1.5);
    const y = state.movement * Math.sin(rotation + Math.PI * 1.5);

    const left = 295 - x;
    const top = 295 - y;

    return {
      lastTick: props.tick,
      movement,
      left,
      top,
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.top < 0 ||
      prevState.top > 600 ||
      prevState.left < 0 ||
      prevState.left > 600
    ) {
      prevProps.remove(prevProps.id);
    }
  }

  render() {
    return (
      <div
        style={{
          backgroundColor: `white`,
          borderRadius: `50%`,
          height: `10px`,
          left: `${this.state.left}px`,
          position: `absolute`,
          top: `${this.state.top}px`,
          width: `10px`,
        }}
      />
    );
  }
}

export default Bullet;
