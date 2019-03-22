import React from 'react';

const FixedWidthText = ({ text, width }) => (
  <>
    {text.split('').map((chr, i) => (
      <span
        key={i}
        style={{ display: 'inline-block', textAlign: 'center', width: width }}
      >
        {chr}
      </span>
    ))}
  </>
);

export default FixedWidthText;
