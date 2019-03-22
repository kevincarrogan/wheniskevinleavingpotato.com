import { Component } from 'react';
import ReactAnimationFrame from 'react-animation-frame';
import { DateTime } from 'luxon';

const timeDiff = fromDate => DateTime.fromJSDate(fromDate).diffNow();

const scaleFromInterval = interval =>
  1 - interval.toFormat('hh:mm:ss:SSS').split(':')[3] / 1000;

const easeOutQuad = value => --value * value * value + 1;

const currentScale = leavingTime => {
  const diff = timeDiff(leavingTime);
  const scale = scaleFromInterval(diff);
  const easedScale = easeOutQuad(scale);

  return easedScale;
};

const ratioFromTimePeriod = (value, beginningTime, leavingTime) => {
  if (new Date() < beginningTime) {
    return value;
  }

  const beginning = DateTime.fromJSDate(beginningTime);
  const leaving = DateTime.fromJSDate(leavingTime);
  const now = DateTime.fromJSDate(new Date());
  const diffToLeaving = leaving.diff(now);
  const diffPeriod = leaving.diff(beginning);
  const ratio = (100 / diffPeriod) * diffToLeaving;

  return value * (ratio / 100);
};

const currentWidth = (beginningTime, leavingTime) => {
  return ratioFromTimePeriod(180, beginningTime, leavingTime);
};

const currentHeight = (beginningTime, leavingTime) => {
  return ratioFromTimePeriod(186, beginningTime, leavingTime);
};

class AnimateLogo extends Component {
  constructor(props) {
    super(props);
    const { leavingTime, beginningTime } = this.props;
    const scale = currentScale(leavingTime);
    const opacity = 1;
    const width = currentWidth(beginningTime, leavingTime);
    const height = currentHeight(beginningTime, leavingTime);
    this.state = { scale, opacity, width, height };
  }

  onAnimationFrame() {
    const { leavingTime, beginningTime } = this.props;
    const scale = currentScale(leavingTime);
    const width = currentWidth(beginningTime, leavingTime);
    const height = currentHeight(beginningTime, leavingTime);
    this.setState({ ...this.state, scale, width, height });
  }

  render() {
    const { scale, opacity, width, height } = this.state;
    return this.props.children(scale, opacity, width, height);
  }
}

export default ReactAnimationFrame(AnimateLogo);
