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
    const rotation = (state.rotation + diff * 2.5) % 360;

    return {
      lastTick: props.tick,
      rotation,
    };
  }

  onClick(evt) {
    evt.preventDefault();
    this.props.fire(this.state.rotation);

    this.setState((state, props) => ({
      direction: state.direction * -1,
    }));
  }

  onMouseDown(evt) {
    evt.preventDefault();
  }

  render() {
    const left = this.props.x - 90 / 2;
    const top = this.props.y - 93 / 2;
    return (
      <div
        onClick={this.onClick}
        onMouseDown={this.onMouseDown}
        style={{
          position: `absolute`,
          left: `${left}px`,
          top: `${top}px`,
        }}
      >
        <Logo
          width="90"
          height="93"
          rotate={this.state.rotation}
          scale="1"
          opacity="1"
        />
      </div>
    );
  }
}

export default Ship;
