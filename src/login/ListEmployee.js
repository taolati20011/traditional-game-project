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

const employeeNull = {
    "username": "",
    "password": "",
    "userAddress": "",
    "userFullname": "",
    "userPhone": "",
    "userEmail": "",
    "userGender": ""
}

class ListEmployeeComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            employees: [],
            val: "",
            currentPage: 1,
            employeesPerPage: 5,
            totalEmployee: undefined,
            totalPages: undefined
        }
        // this.addEmployee = this.addEmployee.bind(this);
        this.editEmployee = this.editEmployee.bind(this);
        this.deleteEmployee = this.deleteEmployee.bind(this);
    }

    deleteEmployee(id) {
        UserService.deleteEmployee(id).then(res => {
            this.setState({ 
                employees: this.state.employees.filter(employee => employee.id !== id),
                totalEmployee: this.state.totalEmployee - 1,
                currentPage: 1,
                totalPages: Math.ceil(this.state.totalEmployee/ this.state.employeesPerPage),
                val: ""
            }, () => {
                window.location.reload();
                return;
            });
        }).catch (error => {
            if (error.response.status == 401 | error.response.status == 403) {
                window.location.replace("/access-denied");
                return;
            }
            window.location.replace("/internal-server-error");
        });;
    }
    viewEmployee(id) {
        this.props.history.push(`/view-employee/${id}`);
    }
    editEmployee(id, e) {
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

        UserService.updateEmployee(id, employee).then((res) => {
            if (res.status == 200) {
                window.location.reload();
                return;
            }
        }).catch (error => {
            if (error.response.status == 401 | error.response.status == 403) {
                window.location.replace("/access-denied");
                return;
            }
            window.location.replace("/internal-server-error");
        });
    }

    componentDidMount() {
        UserService.getTotalNumberOfEmployee(this.state.val).then((res) => {
            this.setState({ totalEmployee: res.data}, () => {
                let totalEmployee = this.state.totalEmployee;
                const employeesPerPage = this.state.employeesPerPage;
                var x = Math.ceil(totalEmployee / employeesPerPage);
                this.setState({totalPages: x}, () => {
                    this.forceUpdate();
                });
            })
        }).catch (error => {
            if (error.response.status == 401 | error.response.status == 403) {
                window.location.replace("/access-denied");
                return;
            }
            window.location.replace("/internal-server-error");
        });

        UserService.getEmployees(this.state.employeesPerPage, this.state.currentPage - 1).then((res) => {
            this.setState({ employees: res.data });
        }).catch (error => {
            if (error.response.status == 401 | error.response.status == 403) {
                window.location.replace("/access-denied");
                return;
            }
            window.location.replace("/internal-server-error");
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
                window.location.reload();
                return;
            }
        }).catch (error => {
            if (error.response.status == 401 | error.response.status == 403) {
                window.location.replace("/access-denied");
                return;
            }
            window.location.replace("/internal-server-error");
        });
    }

    inputSearch = (event) => {
        this.setState({ val: event.target.value })
    }

    doFilter = () => {
        UserService.getEmployeesByFilter(this.state.val, this.state.employeesPerPage, 0).then((res) => {
            this.setState({ employees: res.data }, () => {
                UserService.getTotalNumberOfEmployee(this.state.val).then((res) => {
                    this.setState({ totalEmployee: res.data}, () => {
                        let totalEmployee = this.state.totalEmployee;
                        const employeesPerPage = this.state.employeesPerPage;
                        var x = Math.ceil(totalEmployee / employeesPerPage);
                        this.setState({totalPages: x, currentPage: 1}, () => {
                            this.forceUpdate();
                        });
                    })
                }).catch (error => {
                    if (error.response.status == 401 | error.response.status == 403) {
                        window.location.replace("/access-denied");
                        return;
                    }
                    window.location.replace("/internal-server-error");
                });
            });
        }).catch((error) => {
            if (error) {
                this.setState({ employees: [] }, () => {
                    this.forceUpdate();
                });
            }
        });
    }

    handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            UserService.getEmployeesByFilter(this.state.val, this.state.employeesPerPage, 0).then((res) => {
                this.setState({ employees: res.data }, () => {
                    UserService.getTotalNumberOfEmployee(this.state.val).then((res) => {
                        this.setState({ totalEmployee: res.data}, () => {
                            let totalEmployee = this.state.totalEmployee;
                            const employeesPerPage = this.state.employeesPerPage;
                            var x = Math.ceil(totalEmployee / employeesPerPage);
                            this.setState({totalPages: x, currentPage: 1}, () => {
                                this.forceUpdate();
                            });
                        })
                    }).catch (error => {
                        if (error.response.status == 401 | error.response.status == 403) {
                            window.location.replace("/access-denied");
                            return;
                        }
                        window.location.replace("/internal-server-error");
                    });
                });
            }).catch((error) => {
                if (error) {
                    this.setState({ employees: [] }, () => {
                        this.forceUpdate()
                    });
                }
            });
        }
    }

    cancelSearch = () => {
        this.setState({ val: '' }, () => {
            UserService.getEmployeesByFilter(this.state.val, this.state.employeesPerPage, 0).then((res) => {
                this.setState({ employees: res.data }, () => {
                    UserService.getTotalNumberOfEmployee(this.state.val).then((res) => {
                        this.setState({ totalEmployee: res.data}, () => {
                            let totalEmployee = this.state.totalEmployee;
                            const employeesPerPage = this.state.employeesPerPage;
                            var x = Math.ceil(totalEmployee / employeesPerPage);
                            this.setState({totalPages: x, currentPage: 1}, () => {
                                this.forceUpdate();
                            });
                        })
                    }).catch (error => {
                        if (error.response.status == 401 | error.response.status == 403) {
                            window.location.replace("/access-denied");
                            return;
                        }
                        window.location.replace("/internal-server-error");
                    });
                });
            }).catch((error) => {
                if (error) {
                    this.setState({ employees: [] }, () => {
                        this.forceUpdate()
                    });
                }
            });
        })
    }

    firstPage = () => {
        if (this.state.currentPage > 0) {
            UserService.getEmployeesByFilter(this.state.val, this.state.employeesPerPage, 0).then((res) => {
                this.setState({ employees: res.data }, () => {
                    this.setState({currentPage: 1}, () => {
                        this.forceUpdate();
                    });
                });
            }).catch (error => {
                if (error.response.status == 401 | error.response.status == 403) {
                    window.location.replace("/access-denied");
                    return;
                }
                window.location.replace("/internal-server-error");
            });
        }
    };

    prevPage = () => {
        if (this.state.currentPage > 0) {
            UserService.getEmployeesByFilter(this.state.val, this.state.employeesPerPage, this.state.currentPage - 2).then((res) => {
                this.setState({ employees: res.data }, () => {
                    this.setState({currentPage: this.state.currentPage - 1}, () => {
                        this.forceUpdate();
                    });
                });
            }).catch (error => {
                if (error.response.status == 401 | error.response.status == 403) {
                    window.location.replace("/access-denied");
                    return;
                }
                window.location.replace("/internal-server-error");
            });
        }
    };

    lastPage = () => {
        if (this.state.currentPage < this.state.totalPages) {
            UserService.getEmployeesByFilter(this.state.val, this.state.employeesPerPage, this.state.totalPages - 1).then((res) => {
                this.setState({ employees: res.data }, () => {
                    this.setState({currentPage: this.state.totalPages}, () => {
                        this.forceUpdate();
                    });
                });
            }).catch (error => {
                if (error.response.status == 401 | error.response.status == 403) {
                    window.location.replace("/access-denied");
                    return;
                }
                window.location.replace("/internal-server-error");
            });
        }
    };

    nextPage = () => {
        if (this.state.currentPage < this.state.totalPages) {
            UserService.getEmployeesByFilter(this.state.val, this.state.employeesPerPage, this.state.currentPage).then((res) => {
                this.setState({ employees: res.data }, () => {
                    this.setState({currentPage: this.state.currentPage + 1}, () => {
                        this.forceUpdate();
                    });
                });
            }).catch (error => {
                if (error.response.status == 401 | error.response.status == 403) {
                    window.location.replace("/access-denied");
                    return;
                }
                window.location.replace("/internal-server-error");
            });
        }
    };

    changePage = (event) => {
        if (event.key == "Enter") {
            var input = event.target.value;
            input = input <= 0 ? 1 : (input > this.state.totalPages ? this.state.totalPages : input);
            UserService.getEmployeesByFilter(this.state.val, this.state.employeesPerPage, input - 1).then((res) => {
                this.setState({ employees: res.data }, () => {
                    this.setState({currentPage: input}, () => {
                        event.target.value = input;
                        this.forceUpdate();
                    });
                });
            }).catch (error => {
                if (error.response.status == 401 | error.response.status == 403) {
                    window.location.replace("/access-denied");
                    return;
                }
                window.location.replace("/internal-server-error");
            });
        }
    }

    onSubmit = (event) => {
        event.preventDefault(event);
        this.forceUpdate()
    };

    render() {
        const { employees, val, currentPage, employeesPerPage } = this.state;
        const totalPages = this.state.totalPages;

        return (
            <body>
            <div className="flex-col-align-center">
                <h2 className="text-center">Users List</h2>
                <div style={{ width: "80%" }}>
                    <div>                    
                        <Container triggerText={"Add user"} onClick={this.onSubmit} onSubmit={this.createEmployee} filledValue={employeeNull}>
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
                                                    <Container triggerText={"Update"} onSubmit={(e) => this.editEmployee(employee.userId, e)} filledValue={employee} className="btn btn-info">Update </Container>
                                                    <button style={{ marginLeft: "10px" }} onClick={() => this.deleteEmployee(employee.userId)} className="btn btn-danger">Delete </button>
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
                                            id="input-page"
                                            type="text"
                                            className="page-num"
                                            name="currentPage"
                                            value={this.state.currentPage}
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
