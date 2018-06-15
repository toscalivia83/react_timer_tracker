import React from 'react';

export default class Timer extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      count: 0,
      isActive: false
    }
    this.startTimer = this.startTimer.bind(this);
    this.stopTimer = this.stopTimer.bind(this);
  }

  componentWillReceiveProps(props){
    console.log(props);
    const isActive = Boolean(props.isActive);
    const isActiveHasChanged = Boolean(props.isActive !== this.state.isActive);
    debugger;
    if (isActiveHasChanged){
        if (isActive){
          this.startTimer();
          this.setState({isActive: true});
        } else {
          this.stopTimer();
          this.setState({isActive: false});
        }
    }
    props.callbackParent(this.state.count);
  }

  componentWillUnmount () {
    clearInterval(this.timer);
  }
  tick () {
    this.setState({
      count: (this.state.count + 1)
    });
  }
  startTimer () {
    clearInterval(this.timer);
    this.timer = setInterval(this.tick.bind(this), 10);
  }
  stopTimer () {
    clearInterval(this.timer);
    //this.setState({count: 0});
  }


  render () {
    return (
      <div className='timer'>
        <div>{Math.floor((this.state.count/100)/60)}:{Math.floor(this.state.count/100)}.{this.state.count%100}</div>
      </div>
    )
  }
}
