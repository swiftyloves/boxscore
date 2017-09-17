import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

const datajson = require('./data.json');
const scoreboard = require('./scoreboard.json').service.scoreboard;
const michigan_airforce = require('./michgan_airforce.json');

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
            <div className="player">
                <div className="player_unit">{this.props.player.player_id}</div>
                <div className="player_unit">{this.props.player.position_id}</div>
                <div className="player_unit">{this.props.player.number}</div>
            </div>
        );
    }

}

class Team extends Component {
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
            <div className="title">{this.props.data.name}</div>
            <div className="table">
                <div className="university">
                    <img src={this.props.data.home.image} alt="homeimage" />
                    <div>{this.props.data.home.name}</div>
                </div>
                <div className="university">
                    <img src={this.props.data.away.image} alt="homeimage" />
                    <div>{this.props.data.away.name}</div>
                </div>

                <div className="players_wrapper"><div className="players">{players}</div></div>
            </div>
        </div>
    );

  }
}

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
        'data': datajson,
        'scoreboard': scoreboard,
        'michigan_airforce': michigan_airforce
    };
  }

  componentDidMount () {
    
  }

  getInitialState(): number {
    this.setState({'a': 123})
    return 0;
  }

  render() {
    let teams = [];
    for (let i=0; i < this.state.data.length; i++) {
        teams.push(<Team data={this.state.data[i]}/>);
    }

    // const games = <Game scoreboard={this.state.scoreboard}/>
    return (
        <div className="teams_wrapper">
            <div id="teams">{teams}</div>
        </div>
    );
  }
}

export default App;
