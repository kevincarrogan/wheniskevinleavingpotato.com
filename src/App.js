import React, { Component } from 'react';

import CountdownTimer from './CountdownTimer';
import Logo from './Logo';
import AnimateLogo from './AnimateLogo';

import './App.css';

class App extends Component {
  render() {
    const leavingTime = new Date(2019, 2, 29, 17);
    return (
      <main>
        <h1>When is Kevin leaving Potato?</h1>
        <CountdownTimer until={leavingTime} />
        <AnimateLogo leavingTime={leavingTime}>
          {scale => (
            <Logo scale={scale} />
          )}
        </AnimateLogo>
      </main>
    );
  }
}

export default App;
