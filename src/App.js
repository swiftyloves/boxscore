import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

const datajson = require('./data.json');
const Dispatcher = require('flux').Dispatcher;

class Player extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount () {

    }

    render() {
        let players = [];
        for (let i = 0; i < players.length; i++) {
            // players.push()
        }
        return (
            <div class="player">
                <div>{this.props.player.player_id}({this.props.player.id})</div>
            </div>
        );
    }

}

class Game extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount () {
    
  }

  render() {
    let players = [];
    for (let i = 0; i < this.props.data.players.length; i++) {
        let playerObj = this.props.data.players[i];
        console.log(playerObj)
        if (playerObj.player_id) {
            console.log(playerObj)
            players.push(<Player player={this.props.data.players[i]} />)
        }
    }
    return (
        <div class="game">
            <div>{this.props.data.name}</div>
            <div>
                <div class="university">
                    <img src={this.props.data.home.image} alt="homeimage" />
                    <div>{this.props.data.home.name}</div>
                </div>
                <div class="university">
                    <img src={this.props.data.away.image} alt="homeimage" />
                    <div>{this.props.data.away.name}</div>
                </div>

                <div>{players}</div>
            </div>
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

    return (
        <div class="games_wrapper">
            <div id="games">{games}</div>
        </div>
    );
  }
}

export default App;
