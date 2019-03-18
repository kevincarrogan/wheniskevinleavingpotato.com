import { Component } from "react";
import ReactAnimationFrame from "react-animation-frame";
import { DateTime } from "luxon";

const timeDiff = fromDate => DateTime.fromJSDate(fromDate).diffNow();

const scaleFromInterval = interval =>
  1 - interval.toFormat("hh:mm:ss:SSS").split(":")[3] / 1000;

const easeOutQuad = value => --value * value * value + 1;

const currentScale = leavingTime => {
  const diff = timeDiff(leavingTime);
  const scale = scaleFromInterval(diff);
  const easedScale = easeOutQuad(scale);

  return easedScale;
};

const currentOpacity = (beginningTime, leavingTime) => {
  const beginning = DateTime.fromJSDate(beginningTime);
  const leaving = DateTime.fromJSDate(leavingTime);
  const now = DateTime.fromJSDate(new Date());

  const diffToLeaving = leaving.diff(now);
  const diffPeriod = leaving.diff(beginning);

  return ((100 / diffPeriod) * diffToLeaving) / 100;
};

class AnimateLogo extends Component {
  constructor(props) {
    super(props);
    const scale = currentScale(this.props.leavingTime);
    const opacity = currentOpacity(
      this.props.beginningTime,
      this.props.leavingTime
    );
    this.state = { scale, opacity };
  }

  onAnimationFrame() {
    const scale = currentScale(this.props.leavingTime);
    const opacity = currentOpacity(
      this.props.beginningTime,
      this.props.leavingTime
    );
    this.setState({ scale, opacity });
  }

  render() {
    const { scale, opacity } = this.state;
    return this.props.children(scale, opacity);
  }
}

export default ReactAnimationFrame(AnimateLogo);
