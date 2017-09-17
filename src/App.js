import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

const datajson = require('./data.json');
const scoreboard = require('./scoreboard.json').service.scoreboard;
const michigan_airforce = require('./michgan_airforce.json');

const Dispatcher = require('flux').Dispatcher;


let sortDate = function(a, b) {
        console.log(a)
        console.log(b)
        let a_date = new Date(a.start_time);
        let b_date = new Date(b.start_time);
        return a_date - b_date;
    }

class Game extends Component {
    constructor(props) {
        super(props)
        
        let gameObjs = []

        let keys = Object.keys(this.props.scoreboard.games);
        for (let i = 0; i < keys.length; i++) {
            gameObjs.push(this.props.scoreboard.games[keys[i]]);
        }
        console.log('gameObjs:',gameObjs)

        this.state = {
            'games': this.props.scoreboard.games,
            'gameObjs': gameObjs,
            'teams': this.props.scoreboard.teams,
            'scoreboard': scoreboard,
            'michigan_airforce': michigan_airforce,
            'isSorted': true
        };

        this.handleClick = this.handleClick.bind(this)
        this.sortDate = this.sortDate.bind(this)
        this.sortName = this.sortName.bind(this)
        this.sortByHomeTeamName = this.sortByHomeTeamName.bind(this)

    }

    componentDidMount () {
        this.setState({
            'games': this.props.scoreboard.games,
            'scoreboard': scoreboard,
            'michigan_airforce': michigan_airforce
        });

    }

    sortDate = function(a, b) {
        console.log(a)
        console.log(b)
        let a_date = new Date(a.start_time);
        let b_date = new Date(b.start_time);
        return a_date - b_date;
    }

    sortName(a, b) {
        console.log('sortName')
        let a_h_id = a.home_team_id
        console.log('a.home_team_id:',a.home_team_id)
        console.log('b.home_team_id:',b.home_team_id)
        let b_h_id = b.home_team_id
        let a_name = this.state.teams[a_h_id].full_name;
        let b_name = this.state.teams[b_h_id].full_name;
        console.log('a_name:',a_name)
        console.log('b_name:',b_name)
        


        if (a_name > b_name) {
            return 1;
        } else {
            return -1;
        }
    }

    sortByHomeTeamName() {
        console.log('sortByHomeTeamName')
        let gameObjs = this.state.gameObjs;
        this.setState(prevState => {
            let gameObjs = this.state.gameObjs;
            gameObjs.sort(this.sortName);

        });

        return ({
            gameObjs: gameObjs
        })
    }


    handleClick() {
        this.setState(prevState => {
            let gameObjs = this.state.gameObjs;
            let randomNumberArr = []
            if (this.state.isSorted) {
                // random things
                gameObjs = this.randomNumberArr();
                console.log('let randomNumberArr:',gameObjs)
            } else {
                console.log('gameObjs:',gameObjs);
                gameObjs.sort(this.sortDate);
                // gameObjs.sort(sortDate);
            }
            
            return ({
                isSorted: !this.state.isSorted,
                gameObjs: gameObjs
            })
        });
    }

    randomNumberArr() {

        let array = this.state.gameObjs
        let currentIndex = array.length, temporaryValue, randomIndex;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
        }

        
        return array;
    }

    render() {
        let games = this.state.games;
        let teams = this.state.teams;
        let keys = Object.keys(this.state.games);
        let games_result = [];
        console.log('this.state.gameObjs:',this.state.gameObjs);
        for (let i = 0; i < this.state.gameObjs.length; i++) {
            let gameObj = this.state.gameObjs[i];

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
            let away_win = '';
            let home_win = '';
            if (away_team_id === winning_team_id) {
                away_win = <span className="winner">Winner!</span>
            } else if (home_team_id === winning_team_id) {
                home_win = <span className="winner">Winner!</span>
            }

            games_result.push(
                <div>
                    <div>{start_time}</div>
                    <div className="game_period_wrapper">
                        <div className="team_name">
                            <div> {away_team.full_name} {away_win }</div>

                            <div> {home_team.full_name} {home_win }</div>
                        </div>
                        {game_periods_dom}
                    </div>
                </div>
            )
        }
        return (
            <div>
                <button onClick={this.handleClick}>
                    {this.state.isSorted ? 'Random Sequence' : 'Sort by Date'}
                </button>
                <button onClick={this.sortByHomeTeamName}>
                    Sort be Home Team Name
                </button>
                <div>{games_result}</div>
            </div>
        );
    }
}


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

    let players = [];
    for (let i = 0; i < this.props.data.players.length; i++) {
        let playerObj = this.props.data.players[i];
        if (playerObj.player_id) {
            players.push(<Player player={this.props.data.players[i]} />)
        }
    }

    this.state = {
        players: players
    };
  }

  componentDidMount () {
    
  }

  render() {

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

                <div className="players_wrapper"><div className="players">{this.state.players}</div></div>
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
