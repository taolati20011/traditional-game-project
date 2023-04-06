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
import Container from "../form/game/Container";
import "../form/style.css";
class ListGameComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            games: [],
            val: "",
            triggerText: "Add game"
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
        }).catch (error => {
            window.location.replace("/access-denied");
        });
    }

    addGame() {
        this.props.history.push('/add-game/_add');
    }

    inputSearch = (event) => {
        this.setState({val: event.target.value})
    }

    doFilter = () => {
        GameService.getGameByFilter(this.state.val).then((res) => {
            this.setState({ games: res.data});
        }).catch((error) => {
            if (error) {
                this.setState({games: []});
            }
        });
    }

    cancelSearch = () => {
        this.setState({val: ''})
        GameService.getGames().then((res) => {
            this.setState({ games: res.data});
        });
    }

    render() {
        const {games, val} = this.state;
        return (
            <div className="flex-col-align-center">
                <h2 className="text-center">Games List</h2>
                <div style={{ width: "80%" }}>
                    <div>
                        <Container triggerText={this.state.triggerText} onClick={this.onSubmit}>
                        </Container>       
                        <div style={{ float: "left" }}>

                        </div>
                        <div style={{ float: "right" }}>
                            <InputGroup>
                                <FormControl
                                    placeholder="Search"
                                    name="search"
                                    className={"info-border bg-dark text-white"}
                                    value={val}
                                    onChange={this.inputSearch}
                                />
                                <FormGroup>
                                    <Button
                                        variant="outline-info"
                                        type="button"
                                        onClick={this.doFilter}
                                    ><FontAwesomeIcon icon={faSearch} /></Button>


                                    <Button
                                        variant="outline-danger"
                                        type="button"
                                        onClick={this.cancelSearch}
                                    >
                                        <FontAwesomeIcon icon={faTimes} /></Button>
                                </FormGroup>
                            </InputGroup>
                        </div>
                    </div>
                    <br></br>
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
                                                <td style={{ width: "8%" }}> {game.gameName} </td>
                                                <td style={{ width: "8%" }}> {game.gameType} </td>
                                                <td style={{ width: "40%" }}> {game.gameDescription} </td>
                                                <td style={{ width: "10%" }}>  {game.releaseDate} </td>
                                                <td style={{ width: "10%" }}>  {game.releaseLocation} </td>
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
