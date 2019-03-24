import React, { useState } from 'react';

import Logo from './Logo';

const Ship = ({ tick }) => {
  const rotate = tick % 360;

  return (
    <Logo width="180" height="186" rotate={rotate} scale="1" opacity="1" />
  );
};

export default Ship;
