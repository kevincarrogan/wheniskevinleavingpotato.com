import React, { Component } from 'react';

import Logo from './Logo';

class Ship extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rotation: 0,
      lastTick: props.tick,
      direction: 1,
    };

    this.onClick = this.onClick.bind(this);
  }

  static getDerivedStateFromProps(props, state) {
    const diff = (props.tick - state.lastTick) * state.direction;
    const rotation = (state.rotation + diff) % 360;

    return {
      lastTick: props.tick,
      rotation,
    };
  }

  onClick() {
    this.setState((state, props) => ({
      direction: state.direction * -1,
    }));
  }

  render() {
    return (
      <div onClick={this.onClick}>
        <Logo
          width="180"
          height="186"
          rotate={this.state.rotation}
          scale="1"
          opacity="1"
        />
      </div>
    );
  }
}

export default Ship;