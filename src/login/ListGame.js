import React, { Component } from 'react'
import GameService from '../services/GameService';
import {
    Button,
    InputGroup,
    FormControl,
    FormGroup,
    Card
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faList,
    faEdit,
    faTrash,
    faStepBackward,
    faFastBackward,
    faStepForward,
    faFastForward,
    faSearch,
    faTimes,
} from "@fortawesome/free-solid-svg-icons";
class ListGameComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            games: [],
        }
        this.addGame = this.addGame.bind(this);
        this.editGame = this.editGame.bind(this);
        this.deleteGame = this.deleteGame.bind(this);
    }

    deleteGame(id) {
        GameService.deleteGame(id).then(res => {
            this.setState({ games: this.state.games.filter(game => game.id !== id) });
        });
    }
    viewGame(id) {
        this.props.history.push(`/view-game/${id}`);
    }
    editGame(id) {
        this.props.history.push(`/add-game/${id}`);
    }

    componentDidMount() {
        GameService.getGames().then((res) => {
            this.setState({ games: res.data });
        });
    }

    addGame() {
        this.props.history.push('/add-game/_add');
    }

    render() {
        return (
            <div className="flex-col-align-center">
                <h2 className="text-center">Games List</h2>
                <div style={{ width: "80%" }}>
                    <div>
                        <button className="btn btn-primary" onClick={this.addGame}> Add Game</button>
                        <div style={{ float: "left" }}>

                        </div>
                        <div style={{ float: "right" }}>
                            <InputGroup>
                                <FormControl
                                    placeholder="Search"
                                    name="search"
                                    className={"info-border bg-dark text-white"}
                                />
                                <FormGroup>
                                    <Button size="sm"
                                        variant="outline-info"
                                        type="button"
                                    ><FontAwesomeIcon icon={faSearch} /></Button>


                                    <Button size="sm"
                                        variant="outline-danger"
                                        type="button"
                                        onClick={this.cancelSearch}
                                    >
                                        <FontAwesomeIcon icon={faTimes} /></Button>
                                </FormGroup>
                            </InputGroup>
                        </div>
                    </div>
                    <div className="row">
                        <table className="table table-striped table-bordered">

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
                                                <td style={{ width: "4%" }}> {game.gameId} </td>
                                                <td > {game.gameName} </td>
                                                <td style={{ width: "5%" }}> {game.gameType} </td>
                                                <td style={{ width: "60%" }}> {game.gameDescription} </td>
                                                <td> {game.releaseDate} </td>
                                                <td> {game.releaseLocation} </td>
                                                <td style={{ width: "16%" }}>
                                                    <button onClick={() => this.editGame(game.id)} className="btn btn-info">Update </button>
                                                    <button style={{ marginLeft: "10px" }} onClick={() => this.deleteGame(game.id)} className="btn btn-danger">Delete </button>
                                                    <button style={{ marginLeft: "10px" }} onClick={() => this.viewGame(game.id)} className="btn btn-info">View </button>
                                                </td>
                                            </tr>
                                    )
                                }
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        )
    }
}

export default ListGameComponent
