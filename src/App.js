import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

const datajson = require('./data.json');
const Dispatcher = require('flux').Dispatcher;

console.log(datajson)




class Game extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount () {
    
  }

  render() {
    let players = [];
    for (let i = 0; i < players.length; i++) {
        let playerObj = this.props.data.players[i];
        if (playerObj.player_id) {
            // players.push(<Player player={this.props.data.players[i]}>)
        }
    }
    return (
        <div class="game">
            <div>{this.props.data.name}</div>
            <img src={this.props.data.home.image} alt="homeimage" />
            <div>{this.props.data.home.name}</div>
            <img src={this.props.data.away.image} alt="homeimage" />
            <div>{this.props.data.away.name}</div>
        </div>
    );

  }
}

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {'data': datajson};
  }

  componentDidMount () {
    
  }

  getInitialState(): number {
    this.setState({'a': 123})
    return 0;
  }

  render() {
    let firstdata = this.state.data[0].name
    let games = [];
    for (let i=0; i < this.state.data.length; i++) {
        games.push(<Game data={this.state.data[i]}/>);
    }
    console.log(games.length)


    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React 123</h2>
          
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <div id="games">{games}</div>
      </div>
    );
  }
}

export default App;
