import React from 'react';

import CountdownTimer from './CountdownTimer';
import Logo from './Logo';
import AnimateLogo from './AnimateLogo';
import RickRoll from './RickRoll';

import './App.css';

const App = () => {
  const leavingTime = new Date(2019, 2, 29, 17);
  const beforeLeavingTime = false;
  return (
    <main>
      <h1>When is Kevin leaving Potato?</h1>
      { beforeLeavingTime &&
        <React.Fragment>
          <CountdownTimer until={leavingTime} />
          <AnimateLogo leavingTime={leavingTime}>
            {scale => (
              <Logo scale={scale} width="180" height="186" />
            )}
          </AnimateLogo>
        </React.Fragment>
      }
      { !beforeLeavingTime && <RickRoll /> }
    </main>
  );
}

export default App;
