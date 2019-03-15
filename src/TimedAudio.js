import React from 'react';
import ReactAnimationFrame from 'react-animation-frame';
import { DateTime } from 'luxon';

class TimedAudio extends React.Component {
  constructor(props) {
    super(props);
    this.audio = React.createRef();
    this.playing = false;
    this.duration = null;

    this.loadedMetadata = this.loadedMetadata.bind(this);
  }

  onAnimationFrame() {
    if (this.duration && !this.playing && this.audio.current) {
      const finish = DateTime.fromJSDate(this.props.finish);
      const playAt = DateTime.fromMillis(finish - (this.duration * 1000));
      const now = DateTime.fromJSDate(new Date());

      if (now >= playAt && now < finish) {
        this.playing = true;
        this.audio.current.play();
      }
    }
  }

  componentDidMount() {
    this.audio.current.addEventListener('loadedmetadata', this.loadedMetadata);
  }

  loadedMetadata(evt) {
    this.duration = this.audio.current.duration;
  }

  render() {
    return (
      <audio src={this.props.src} ref={this.audio} />
    );    
  }
}

export default ReactAnimationFrame(TimedAudio);
