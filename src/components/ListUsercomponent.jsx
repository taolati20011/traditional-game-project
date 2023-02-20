import React, { Component } from 'react'
import UserService from '../services/UserService'
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
export default class ListUsercomponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            users: []
        }
    }

    componentDidMount() {
        UserService.getUsers().then((res) => {
            this.setState({ users: res.data });
        })
    }

    render() {
        return (
            <body className='list-page'>
                <div className="flex-col-align-center">
                    <h2 className="text-center">Users List</h2>
                    <div style={{ width: "80%" }}>
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
                        <div className="row">
                            <table className="table table-striped table-bordered">
                                <thead>
                                    <tr>
                                        <th> username </th>
                                        <th> userAddress </th>
                                        <th> userFullname </th>
                                        <th> userPhone </th>
                                        <th> userEmail </th>
                                        <th> userGender </th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {
                                        this.state.users.map(
                                            user =>
                                                <tr key={user.id}>
                                                    <td> {user.username} </td>
                                                    <td> {user.userAddress} </td>
                                                    <td> {user.userFullname} </td>
                                                    <td> {user.userPhone} </td>
                                                    <td> {user.userEmail} </td>
                                                    <td> {user.userGender} </td>
                                                </tr>
                                        )
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </body>
        )
    }
}
