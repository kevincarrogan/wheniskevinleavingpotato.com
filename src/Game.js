import React, { Component } from 'react';
import ReactAnimationFrame from 'react-animation-frame';
import uuidv4 from 'uuid/v4';

import Ship from './Ship';
import Bullet from './Bullet';
import Enemy from './Enemy';

import styles from './Game.module.css';

const randomInt = (min, max) =>
  Math.floor(Math.random() * (+max - +min)) + +min;

const toRadians = angle => angle * (Math.PI / 180);

class Game extends Component {
  constructor(props) {
    super(props);

    this.fps = 60;
    this._interval = 1000 / this.fps;

    this.enemySpawnRate = 120;

    this.fire = this.fire.bind(this);
    this.initBullet = this.initBullet.bind(this);
    this.updateBullets = this.updateBullets.bind(this);

    this.state = {
      tick: 0,
      bullets: [],
      enemies: {},
      enemySpawnTimer: 0,
    };
  }

  onAnimationFrame(timestamp, lastTimestamp) {
    const diff = timestamp - lastTimestamp;
    const tick = Math.ceil(diff / this._interval);

    this.setState((state, props) => {
      const newTick = state.tick + tick;
      const bullets = this.updateBullets(state.bullets, newTick);
      return {
        tick: newTick,
        bullets,
      };
    });

    if (this.state.enemySpawnTimer > this.enemySpawnRate) {
      this.addEnemy(randomInt(0, 360));
      this.setState({ enemySpawnTimer: 0 });
    } else {
      this.setState((state, props) => ({
        enemySpawnTimer: state.enemySpawnTimer + tick,
      }));
    }
  }

  initBullet(rotation) {
    const id = uuidv4();
    const movement = 45;
    const radians = toRadians(rotation);
    const x = movement * Math.cos(radians + Math.PI * 1.5);
    const y = movement * Math.sin(radians + Math.PI * 1.5);
    return {
      lastTick: this.state.tick,
      id,
      rotation,
      movement,
      x,
      y,
    };
  }

  updateBullets(bullets, tick) {
    const velocity = 5;

    if (bullets.length === 0) {
      return bullets;
    }

    return bullets.map(bullet => {
      const diff = tick - bullet.lastTick;
      const movement = bullet.movement + diff * velocity;
      const radians = toRadians(bullet.rotation);
      const x = movement * Math.cos(radians + Math.PI * 1.5);
      const y = movement * Math.sin(radians + Math.PI * 1.5);
      const lastTick = tick;
      const updatedBullet = {
        ...bullet,
        movement,
        lastTick,
        x,
        y,
      };
      return updatedBullet;
    });
  }

  fire(rotation) {
    const bullet = this.initBullet(rotation);

    this.setState((state, props) => ({
      bullets: [...this.state.bullets, bullet],
    }));
  }

  addEnemy(rotation) {
    this.setState((state, props) => ({
      enemies: { ...this.state.enemies, [state.tick]: rotation },
    }));
  }

  render() {
    return (
      <div className={styles.game}>
        <Ship tick={this.state.tick} fire={this.fire} />
        {this.state.bullets.map(bullet => (
          <Bullet key={bullet.id} x={bullet.x} y={bullet.y} />
        ))}
        {Object.entries(this.state.enemies).map(([id, rotation]) => (
          <Enemy id={id} key={id} rotation={rotation} tick={this.state.tick} />
        ))}
      </div>
    );
  }
}

export default ReactAnimationFrame(Game);
