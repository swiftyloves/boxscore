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

class Game extends Component {
    constructor(props) {
        super(props)
        this.state = {
            'games': this.props.scoreboard.games,
            'teams': this.props.scoreboard.teams,
            'scoreboard': scoreboard,
            'michigan_airforce': michigan_airforce
        };

        this.handleClick = this.handleClick.bind(this)
    }

    componentDidMount () {
        this.setState({
            'games': this.props.scoreboard.games,
            'scoreboard': scoreboard,
            'michigan_airforce': michigan_airforce
        });

    }

    handleClick() {
        this.setState(prevState => {
            return ({
                isToggleOn: !prevState.isToggleOn
            })
        });
    }

    render() {
        let games = this.state.games;
        let teams = this.state.teams;
        let keys = Object.keys(this.state.games);
        let games_result = [];
        for (let i = 0; i < keys.length; i++) {
            let gameObj = games[keys[i]];
            let winning_team_id = gameObj.winning_team_id;
            let home_team_id = gameObj.home_team_id;
            let away_team_id = gameObj.away_team_id;
            let home_team = teams[home_team_id]
            let away_team = teams[away_team_id]

            let win_full_name = teams[winning_team_id].full_name
            let start_time = gameObj.start_time
            let game_periods = gameObj.game_periods

            let game_periods_dom = [];

            for (let i = 0; i < game_periods.length; i++) {
                game_periods_dom.push (
                    <div className="period_score">
                        <div> {game_periods[i].away_points} </div>
                        <div> {game_periods[i].home_points} </div>
                    </div>
                )
            }

            games_result.push(
                <div>
                    <div>{start_time}</div>
                    <div className="game_period_wrapper">
                        <div className="team_name">
                            <div> {away_team.full_name} </div>
                            <div> {home_team.full_name} </div>
                        </div>
                        {game_periods_dom}
                    </div>
                </div>
            )
        }
        return (
            <div>
            <button onClick={this.handleClick}>
                {this.state.isSorted ? 'Random' : 'Sort'}
            </button>
            <div>{games_result}</div>
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
        if (playerObj.player_id) {
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

    const games = <Game scoreboard={this.state.scoreboard}/>
    return (
        <div>
            {games}
            <div className="teams_wrapper">
                <div id="teams">{teams}</div>
            </div>
        </div>

    );
  }
}

export default App;
