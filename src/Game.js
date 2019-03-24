import React, { Component } from 'react';
import ReactAnimationFrame from 'react-animation-frame';

import Ship from './Ship';

class Game extends Component {
  constructor(props) {
    super(props);

    this.fps = 60;
    this._interval = 1000 / this.fps;

    this.state = {
      tick: 0,
    };
  }

  onAnimationFrame(timestamp, lastTimestamp) {
    const diff = timestamp - lastTimestamp;
    const tick = Math.ceil(diff / this._interval);
    this.setState((state, props) => ({
      tick: state.tick + tick,
    }));
  }

  render() {
    return (
      <div className="game">
        <Ship tick={this.state.tick} />
      </div>
    );
  }
}

export default ReactAnimationFrame(Game);
