import React from 'react';

export default class Timer extends React.Component {
  constructor (props) {
    super(props)
    this.state = {count: 0}
  }

  componentDidMount() {
    this.props.onRef(this);
  }
  componentWillUnmount () {
    this.props.onRef(undefined);
    clearInterval(this.timer);
  }
  tick () {
    this.setState({count: (this.state.count + 1)});
  }
  startTimer () {
    clearInterval(this.timer);
    this.timer = setInterval(this.tick.bind(this), 10);
  }
  stopTimer () {
    clearInterval(this.timer);
    this.setState({count: 0});
  }

  render () {
    return (
      <div className='timer'>
        <div>{Math.floor((this.state.count/100)/60)}:{Math.floor(this.state.count/100)}.{this.state.count%100}</div>
      </div>
    )
  }
}
