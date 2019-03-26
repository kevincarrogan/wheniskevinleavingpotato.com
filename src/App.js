import React from 'react';

import CountdownTimer from './CountdownTimer';
import RickRoll from './RickRoll';
import { DisplayBefore, DisplayAfter } from './TimedDisplay';
import TimedAudio from './TimedAudio';
import Game from './Game';

import './App.css';

import sunrise from './sunrise.mp3';

const App = () => {
  const leavingTime = new Date(2019, 2, 29, 16, 30);
  return (
    <main>
      <h1>When is Kevin leaving Potato?</h1>
      <DisplayBefore when={leavingTime}>
        <CountdownTimer until={leavingTime} />
        <Game />
      </DisplayBefore>
      <DisplayAfter when={leavingTime}>
        <RickRoll />
      </DisplayAfter>
      <TimedAudio src={sunrise} finish={leavingTime} />
    </main>
  );
};

export default App;
