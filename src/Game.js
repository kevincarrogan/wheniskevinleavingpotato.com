import React, { Component } from 'react';
import ReactAnimationFrame from 'react-animation-frame';
import uuidv4 from 'uuid/v4';
import { Collisions } from 'detect-collisions';

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
    this.restart = this.restart.bind(this);

    this.collisionSystem = new Collisions();
    this.shipBody = this.collisionSystem.createCircle(300, 300, 45);
    this.enemyBodies = {};
    this.bulletBodies = {};
    this.collisionSystem.update();

    this.canvasRef = React.createRef();

    this.state = {
      tick: 0,
      bullets: [],
      enemies: [],
      enemySpawnTimer: 0,
      gameOver: false,
    };
  }

  onAnimationFrame(timestamp, lastTimestamp) {
    const diff = timestamp - lastTimestamp;
    const tick = Math.round(diff / this._interval);

    if (this.state.gameOver) {
      return;
    }

    this.setState((state, props) => {
      const newTick = state.tick + tick;
      const bullets = this.updateBullets(state.bullets, newTick);
      const enemies = this.updateEnemies(state.enemies, newTick);
      const gameOver = this.isGameOver();

      this.collisionSystem.update();

      return {
        tick: newTick,
        bullets,
        enemies,
        gameOver,
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
    const x = movement * Math.cos(radians + Math.PI * 0.5) + 300;
    const y = movement * Math.sin(radians + Math.PI * 0.5) + 300;

    this.bulletBodies[id] = this.collisionSystem.createCircle(x, y, 5);

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

    return bullets
      .map(bullet => {
        const diff = tick - bullet.lastTick;
        const movement = bullet.movement + diff * velocity;
        const radians = toRadians(bullet.rotation);
        const x = movement * Math.cos(radians + Math.PI * 0.5) + 300;
        const y = movement * Math.sin(radians + Math.PI * 0.5) + 300;
        const collisionBody = this.bulletBodies[bullet.id];
        collisionBody.x = x;
        collisionBody.y = y;
        const lastTick = tick;
        const updatedBullet = {
          ...bullet,
          movement,
          lastTick,
          x,
          y,
        };
        return updatedBullet;
      })
      .filter(bullet => {
        const filterBullet =
          bullet.x < 0 || bullet.x > 600 || bullet.y < 0 || bullet.y > 600;
        if (filterBullet) {
          delete this.bulletBodies[bullet.id];
        }
        return !filterBullet;
      });
  }

  fire(rotation) {
    const bullet = this.initBullet(rotation);

    this.setState((state, props) => ({
      bullets: [...this.state.bullets, bullet],
    }));
  }

  initEnemy(rotation) {
    const id = uuidv4();
    const movement = 450;
    const radians = toRadians(rotation);
    const x = movement * Math.cos(radians + Math.PI * 0.5) + 300;
    const y = movement * Math.sin(radians + Math.PI * 0.5) + 300;

    this.enemyBodies[id] = this.collisionSystem.createCircle(x, y, 25);

    return {
      lastTick: this.state.tick,
      id,
      rotation,
      movement,
      x,
      y,
    };
  }

  addEnemy(rotation) {
    const enemy = this.initEnemy(rotation);

    this.setState((state, props) => ({
      enemies: [...this.state.enemies, enemy],
    }));
  }

  updateEnemies(enemies, tick) {
    const velocity = 3;

    if (enemies.length === 0) {
      return enemies;
    }

    return enemies
      .map(enemy => {
        const diff = tick - enemy.lastTick;
        const movement = enemy.movement - diff * velocity;
        const radians = toRadians(enemy.rotation);
        const x = movement * Math.cos(radians + Math.PI * 0.5) + 300;
        const y = movement * Math.sin(radians + Math.PI * 0.5) + 300;
        const lastTick = tick;
        const collisionBody = this.enemyBodies[enemy.id];
        collisionBody.x = x;
        collisionBody.y = y;
        const updatedEnemy = {
          ...enemy,
          movement,
          lastTick,
          x,
          y,
        };
        return updatedEnemy;
      })
      .filter(enemy => {
        const enemyBody = this.enemyBodies[enemy.id];
        const potentials = enemyBody.potentials();

        if (potentials.length) {
          for (const body of potentials) {
            if (
              enemyBody.collides(body) &&
              Object.values(this.bulletBodies).includes(body)
            ) {
              delete this.enemyBodies[enemy.id];
              this.collisionSystem.remove(enemyBody);
              return false;
            }
          }
        }

        return true;
      });
  }

  isGameOver() {
    const potentials = this.shipBody.potentials();

    for (const body of potentials) {
      if (
        this.shipBody.collides(body) &&
        Object.values(this.enemyBodies).includes(body)
      ) {
        return true;
      }
    }
    return false;
  }

  restart() {
    this.setState((state, props) => {
      return {
        tick: 0,
        bullets: [],
        enemies: [],
        enemySpawnTimer: 0,
        gameOver: false,
      };
    });
    this.enemyBodies = {};
    this.bulletBodies = {};
  }

  render() {
    return (
      <div className={styles.gameWrapper}>
        <div className={styles.game}>
          {!this.state.gameOver && (
            <>
              {this.state.bullets.map(bullet => (
                <Bullet key={bullet.id} x={bullet.x} y={bullet.y} />
              ))}
              {this.state.enemies.map(enemy => (
                <Enemy key={enemy.id} x={enemy.x} y={enemy.y} />
              ))}
              <Ship x="300" y="300" tick={this.state.tick} fire={this.fire} />
            </>
          )}
          {this.state.gameOver && (
            <div className={styles.gameOver}>
              <h1 className={styles.gameOverTitle}>Game Over</h1>
              <button className={styles.gameOverButton} onClick={this.restart}>
                Restart?
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default ReactAnimationFrame(Game);
