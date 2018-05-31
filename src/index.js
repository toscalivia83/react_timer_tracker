import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Timer from './timer'

class TabList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lines: [],
      runnerName:''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.startRace = this.startRace.bind(this);
    this.endRace = this.endRace.bind(this);
    this.addLapCount = this.addLapCount.bind(this);
  }

  handleChange(event) {
    this.setState({runnerName: event.target.value});
  }

  handleClick(event) {
    this.setState({
      lines: this.state.lines.concat([{
      	name: this.state.runnerName, 
      	lapCount:0,
      	totalTime:0,
      	averageTime:0,
      	lastLap:0,
      }])
    }, function() {
    	console.log(this.state.lines);
    });
  }

  addLapCount(index, event) {
    console.log('index', index);
    let linesCopy = this.state.lines.slice();
    linesCopy[index].lapCount += 1;
    this.setState({lines: linesCopy});
  }

	startRace() {
		this.child.startTimer();
	}

  endRace() {
    this.child.stopTimer();
  }

  render() {
  		const listItems = this.state.lines.map((number, index) =>
		  <tr key={index}>
		  	<td key="name"><button type="button" className="btn btn-warning" onClick={this.addLapCount.bind(this, index)}>{number.name}</button></td>
		  	<td key="lapCount">{number.lapCount}</td>
		  	<td key="totalTime"><Timer onRef={ref => (this.child = ref)} /></td>
		  	<td key="averageTime">{number.averageTime}</td>
		  	<td key="lastLap">{number.lastLap}</td>
		  </tr>
		);

    return (
      <div>
	      <table id="mytable" className="table">
				  <thead className="thead-dark">
				    <tr>
				      <th scope="col">Name</th>
				      <th scope="col">Lap Count</th>
				      <th scope="col">Total Time</th>
				      <th scope="col">Average Time</th>
				      <th scope="col">Last Lap Time</th>
				    </tr>
				  </thead>
				  <tbody>
				     {listItems}
				  </tbody>
				</table>
	      <div>
						<span>1km Timer</span>
						<input className="mx-3" placeholder="Name" type="text" onChange={this.handleChange}/>
						<button onClick={this.handleClick} className="mx-3 btn btn-primary" type="button">Add Name</button>
						<button onClick={this.startRace} className="mx-3 btn btn-success">Start Race</button>
						<button onClick={this.endRace} className="btn btn-danger">End Race</button>
				</div>
			</div>
    );
  }
}


ReactDOM.render(
  <TabList />,
  document.getElementById('root')
);