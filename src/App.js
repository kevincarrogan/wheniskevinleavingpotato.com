import React from 'react';

import CountdownTimer from './CountdownTimer';
import Logo from './Logo';
import AnimateLogo from './AnimateLogo';
import RickRoll from './RickRoll';
import { DisplayBefore, DisplayAfter } from './TimedDisplay';

import './App.css';

const App = () => {
  const beginningTime = new Date(2019, 2, 29, 9);
  const leavingTime = new Date(2019, 2, 29, 17);
  return (
    <main>
      <h1>When is Kevin leaving Potato?</h1>
      <DisplayBefore when={leavingTime}>
        <CountdownTimer until={leavingTime} />
        <AnimateLogo beginningTime={beginningTime} leavingTime={leavingTime}>
          {(scale, opacity) => (
            <Logo scale={scale} opacity={opacity} width="180" height="186" />
          )}
        </AnimateLogo>
      </DisplayBefore>
      <DisplayAfter when={leavingTime}>
        <RickRoll />
      </DisplayAfter>
    </main>
  );
}

export default App;
