import React, { Component } from 'react'
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
import Container from '../form/user/Container';
import '../form/style.css';

class ListEmployeeComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            employees: [],
            val: "",
            currentPage: 1,
            employeesPerPage: 5,
            isOpen: false,
            triggerText : 'Add user',
            "alert": 0,
            "type": 0,
            "access-denied": 0,
            "internal-server-error": 0,
            totalEmployee: 0,
            pageNo: 0
        }
        // this.addEmployee = this.addEmployee.bind(this);
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
        
    }

    componentDidMount() {
        UserService.getTotalNumberOfEmployee().then((res) => {
            console.log(res)
            this.setState({ totalEmployee: res.data})
            console.log(this.state.totalEmployee)
        }).catch (error => {
            window.location.replace("/access-denied");
        })

        UserService.getEmployees(this.state.employeesPerPage, this.state.pageNo).then((res) => {
            this.setState({ employees: res.data });
        }).catch (error => {
            window.location.replace("/access-denied");
        });
    }

    createEmployee(e) {
        e.preventDefault(e);
        const employee = {
            "username": e.target.username.value,
            "password": e.target.password.value,
            "userAddress": e.target.userAddress.value,
            "userFullname": e.target.userFullname.value,
            "userPhone": e.target.userPhone.value,
            "userEmail": e.target.userEmail.value,
            "userGender": e.target.userGender.value
        }

        UserService.createEmployee(employee).then((res) => {
            if (res.status == 200) {
                window.location.replace("#");
                return;
            }
        }).catch((error) => {
            console.log(error);
        })
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

    handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            UserService.getEmployeesByFilter(this.state.val).then((res) => {
                this.setState({ employees: res.data });
            }).catch((error) => {
                if (error) {
                    this.setState({ employees: [] });
                }
            });
        }
    }

    cancelSearch = () => {
        this.setState({ val: '' })
        UserService.getEmployees(this.state.employeesPerPage, 0).then((res) => {
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
            Math.ceil(this.state.employees.length / this.state.employeesPerPage)
        ) {
            this.setState({
                currentPage: this.state.currentPage + 1,
            });
        }
    };

    onSubmit = (event) => {
        event.preventDefault(event);
    };

    render() {
        const { employees, val, currentPage, employeesPerPage } = this.state;
        const totalEmployee = this.state.totalEmployee;
        const lastIndex = currentPage * employeesPerPage;
        const firstIndex = lastIndex - employeesPerPage;
        const currentEmployees = employees.slice(firstIndex, lastIndex);
        const totalPages = Math.ceil(totalEmployee/ employeesPerPage);

        return (
            <body>
            <div className="flex-col-align-center">
                <h2 className="text-center">Users List</h2>
                <div style={{ width: "80%" }}>
                    <div>                    
                        <Container triggerText={this.state.triggerText} onClick={this.onSubmit} onSubmit={this.createEmployee}>
                        </Container>
                        <div style={{ float: "left" }}>

                        </div>
                        <div style={{ float: "right" }}>
                            <InputGroup>
                                <FormControl
                                    placeholder="Search by name"
                                    name="search"
                                    value={val}
                                    className={"info-border bg-dark text-white"}
                                    onChange={this.inputSearch}
                                    onKeyDown={this.handleKeyPress}
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
                                                    <Container triggerText={"Update"} onClick={() => this.editEmployee(employee.id)} className="btn btn-info">Update </Container>
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
            </body>
        )
    }
}

export default ListEmployeeComponent
