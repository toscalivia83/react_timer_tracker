import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Timer from './timer'

class Race extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      players: [],
      runnerName:'',
      isActive: false
    };

    this.onNameChange = this.onNameChange.bind(this);
    this.createPlayer = this.createPlayer.bind(this);
    this.startRace = this.startRace.bind(this);
    this.endRace = this.endRace.bind(this);
    this.endLap = this.endLap.bind(this);
  }

  onNameChange(event) {
    this.setState({runnerName: event.target.value});
  }

  createPlayer(event) {
    this.setState({
      players: this.state.players.concat([{
      	name: this.state.runnerName, 
      	lapCount:0,
      	totalTime:0,
      	averageTime:0,
      	lastLap:0,
        lapsTime: []
      }])
    }, function() {
    	console.log(this.state.players);
    });
  }

  endLap(index, event) {
    let playersCopy = this.state.players.slice();
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    playersCopy[index].lapCount += 1;
    if(playersCopy[index].lapsTime.length){
      debugger;
      const totalTimeSpentInLastLap = playersCopy[index].totalTime - playersCopy[index].lapsTime.reduce(reducer);
      playersCopy[index].lapsTime.push(totalTimeSpentInLastLap);
      console.log("test",playersCopy[index].lapsTime);
    }else{
      playersCopy[index].lapsTime.push(playersCopy[index].totalTime);
    }
    this.setState({players: playersCopy});
  }

	startRace() {
		this.setState({
      isActive: true
    })
	}

  endRace() {
    this.setState({
      isActive: false
    })
  }

  onTimerChanged(newState, currentIndex) { 
    // this.state.players[index].totalTime = newState; 
      this.setState({
        'players': this.state.players.filter((player, index) => {
          if (index === currentIndex) {
            player.totalTime = newState;
          }
          return player;
        })
      });
    }

  render() {
  		const listItems = this.state.players.map((player, index) =>
		  <tr key={index}>
		  	<td key="name"><button type="button" className="btn btn-warning" onClick={this.endLap.bind(this, index)}>{player.name}</button></td>
		  	<td key="lapCount">{player.lapCount}</td>
		  	<td key="totalTime"><Timer callbackParent={(newState) => this.onTimerChanged(newState, index) } isActive={this.state.isActive} /></td>
		  	<td key="averageTime">{player.averageTime}</td>
		  	<td key="lastLap">{player.lastLap}</td>
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
						<input className="mx-3" placeholder="Name" type="text" onChange={this.onNameChange}/>
						<button onClick={this.createPlayer} className="mx-3 btn btn-primary" type="button">Add Name</button>
						<button onClick={this.startRace} className="mx-3 btn btn-success">Start Race</button>
						<button onClick={this.endRace} className="btn btn-danger">End Race</button>
				</div>
			</div>
    );
  }
}


ReactDOM.render(
  <Race />,
  document.getElementById('root')
);