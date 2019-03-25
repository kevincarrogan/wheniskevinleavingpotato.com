import React, { Component } from 'react';
import ReactAnimationFrame from 'react-animation-frame';

import Ship from './Ship';

import styles from './Game.module.css';

class Game extends Component {
  constructor(props) {
    super(props);

    this.fps = 60;
    this._interval = 1000 / this.fps;

    this.fire = this.fire.bind(this);

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

  fire(rotation) {
    console.log(rotation);
  }

  render() {
    return (
      <div className={styles.game}>
        <Ship tick={this.state.tick} fire={this.fire} />
      </div>
    );
  }
}

export default ReactAnimationFrame(Game);
