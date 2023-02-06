import React, { Component } from 'react'
import GameService from '../services/GameService';

class ListGameComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
                games: []
        }
        this.addGame = this.addGame.bind(this);
        this.editGame = this.editGame.bind(this);
        this.deleteGame = this.deleteGame.bind(this);
    }

    deleteGame(id){
        GameService.deleteGame(id).then( res => {
            this.setState({games: this.state.games.filter(game => game.id !== id)});
        });
    }
    viewGame(id){
        this.props.history.push(`/view-game/${id}`);
    }
    editGame(id){
        this.props.history.push(`/add-game/${id}`);
    }

    componentDidMount(){
        GameService.getGames().then((res) => {
            this.setState({ games: res.data});
        });
    }

    addGame(){
        this.props.history.push('/add-game/_add');
    }

    render() {
        return (
            <div>
                 <h2 className="text-center">Games List</h2>
                 <div>
                    <button className="btn btn-primary" onClick={this.addGame}> Add Game</button>
                 </div>
                 <br></br>
                 <div className = "row">
                        <table className = "table table-striped table-bordered">

                            <thead>
                                <tr>
                                    <th> Id </th>
                                    <th> Name </th>
                                    <th> Type </th>
                                    <th> Description </th>
                                    <th> Release Date </th>
                                    <th> Release Location </th>
                                    <th> Actions </th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.games.map(
                                        game => 
                                        <tr key={game.gameId}>
                                            <td> {game.gameId} </td>
                                            <td> {game.gameName} </td>
                                            <td> {game.gameType} </td>
                                            <td> {game.gameDescription} </td>
                                            <td> {game.releaseDate} </td>
                                            <td> {game.releaseLocation} </td>
                                             <td>
                                                 <button onClick={ () => this.editGame(game.id)} className="btn btn-info">Update </button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.deleteGame(game.id)} className="btn btn-danger">Delete </button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.viewGame(game.id)} className="btn btn-info">View </button>
                                             </td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>

                 </div>

            </div>
        )
    }
}

export default ListGameComponent
