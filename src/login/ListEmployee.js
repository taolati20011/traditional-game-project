import React, { Component } from 'react'
import Popup from './Popup';
import UserService from '../services/UserService'
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
import {
    Button,
    InputGroup,
    FormControl,
    FormGroup,
    Card
} from "react-bootstrap";

class ListEmployeeComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            employees: [],
            val: "",
            currentPage: 1,
            employeesPerPage: 5,
            isOpen: false
        }
        this.addEmployee = this.addEmployee.bind(this);
        this.editEmployee = this.editEmployee.bind(this);
        this.deleteEmployee = this.deleteEmployee.bind(this);
    }



    deleteEmployee(id) {
        UserService.deleteEmployee(id).then(res => {
            this.setState({ employees: this.state.employees.filter(employee => employee.id !== id) });
        });
    }
    viewEmployee(id) {
        this.props.history.push(`/view-employee/${id}`);
    }
    editEmployee(id) {
        this.props.history.push(`/add-employee/${id}`);
    }

    componentDidMount() {
        UserService.getEmployees().then((res) => {
            this.setState({ employees: res.data });
        });
    }

    addEmployee() {
        this.props.history.push('/add-employee/_add');
    }

    inputSearch = (event) => {
        this.setState({ val: event.target.value })
    }

    doFilter = () => {
        UserService.getEmployeesByFilter(this.state.val).then((res) => {
            this.setState({ employees: res.data });
        }).catch((error) => {
            if (error) {
                this.setState({ employees: [] });
            }
        });
    }

    cancelSearch = () => {
        this.setState({ val: '' })
        UserService.getEmployees().then((res) => {
            this.setState({ employees: res.data });
        });
    }

    firstPage = () => {
        if (this.state.currentPage > 1) {
            this.setState({
                currentPage: 1,
            });
        }
    };

    prevPage = () => {
        if (this.state.currentPage > 1) {
            this.setState({
                currentPage: this.state.currentPage - 1,
            });
        }
    };

    lastPage = () => {
        if (
            this.state.currentPage < Math.ceil(this.props.employees.length / this.state.employeesPerPage)
        ) {
            this.setState({
                currentPage: Math.ceil(this.props.employees.length / this.state.employeesPerPage),
            });
        }
    };

    nextPage = () => {
        if (
            this.state.currentPage <
            Math.ceil(this.props.employees.length / this.state.employeesPerPage)
        ) {
            this.setState({
                currentPage: this.state.currentPage + 1,
            });
        }
    };


    render() {
        const { employees, val, currentPage, employeesPerPage } = this.state;
        const lastIndex = currentPage * employeesPerPage;
        const firstIndex = lastIndex - employeesPerPage;
        const currentEmployees = employees.slice(firstIndex, lastIndex);
        const totalPages = Math.ceil(employees.length / employeesPerPage);


        return (
            <div className="flex-col-align-center">
                <h2 className="text-center">Users List</h2>
                <div style={{ width: "80%" }}>
                    <div>                    
                        <button className="btn btn-primary" onClick={this.addEmployee}> Add Employee</button>             
                        <p style={{color: "black"}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                        <div style={{ float: "left" }}>

                        </div>
                        <div style={{ float: "right" }}>
                            <InputGroup>
                                <FormControl
                                    placeholder="Search"
                                    name="search"
                                    value={val}
                                    className={"info-border bg-dark text-white"}
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
                                    <th> Username </th>
                                    <th> Address </th>
                                    <th> Fullname </th>
                                    <th> Phone </th>
                                    <th> Email </th>
                                    <th> Gender </th>
                                    <th> Actions </th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.employees.map(
                                        employee =>
                                            <tr key={employee.userId}>
                                                <td> {employee.userId} </td>
                                                <td> {employee.username} </td>
                                                <td> {employee.userAddress} </td>
                                                <td> {employee.userFullname} </td>
                                                <td> {employee.userPhone} </td>
                                                <td> {employee.userEmail} </td>
                                                <td> {employee.userGender} </td>
                                                <td>
                                                    <button onClick={() => this.editEmployee(employee.id)} className="btn btn-info">Update </button>
                                                    <button style={{ marginLeft: "10px" }} onClick={() => this.deleteEmployee(employee.id)} className="btn btn-danger">Delete </button>
                                                    <button style={{ marginLeft: "10px" }} onClick={() => this.viewEmployee(employee.id)} className="btn btn-info">View </button>
                                                </td>
                                            </tr>
                                    )
                                }
                            </tbody>
                        </table>
                        {employees.length > 0 ? (
                            <Card.Footer>
                                <div style={{ float: "left" }}>
                                    Showing Page {currentPage} of {totalPages}
                                </div>
                                <div style={{ float: "right" }}>
                                    <InputGroup size="sm">

                                        <Button
                                            type="button"
                                            disabled={currentPage === 1 ? true : false}
                                            onClick={this.firstPage}
                                        >
                                            <FontAwesomeIcon icon={faFastBackward} /> First
                                        </Button>
                                        <Button
                                            type="button"
                                            disabled={currentPage === 1 ? true : false}
                                            onClick={this.prevPage}
                                        >
                                            <FontAwesomeIcon icon={faStepBackward} /> Prev
                                        </Button>

                                        <input
                                            className={"page-num"}
                                            name="currentPage"
                                            value={currentPage}
                                            onChange={this.changePage}
                                        ></input>

                                        <Button
                                            type="button"
                                            disabled={currentPage === totalPages ? true : false}
                                            onClick={this.nextPage}
                                        >
                                            <FontAwesomeIcon icon={faStepForward} /> Next
                                        </Button>
                                        <Button
                                            type="button"
                                            disabled={currentPage === totalPages ? true : false}
                                            onClick={this.lastPage}
                                        >
                                            <FontAwesomeIcon icon={faFastForward} /> Last
                                        </Button>

                                    </InputGroup>
                                </div>
                            </Card.Footer>
                        ) : null}
                    </div>
                </div>

            </div>
        )
    }
}

export default ListEmployeeComponent
