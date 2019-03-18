import React from "react";
import YouTube from "react-youtube";

const RickRoll = () => (
  <YouTube
    videoId="DLzxrzFCyOs"
    opts={{
      width: 800,
      height: 600,
      playerVars: {
        autoplay: 1,
        controls: 0,
        playsinline: 1,
        loop: 1
      }
    }}
  />
);

export default RickRoll;
