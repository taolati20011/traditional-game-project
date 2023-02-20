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

class ListEmployeeComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
                employees: [],
                val: ""
        }
        this.addEmployee = this.addEmployee.bind(this);
        this.editEmployee = this.editEmployee.bind(this);
        this.deleteEmployee = this.deleteEmployee.bind(this);
    }

    deleteEmployee(id){
        UserService.deleteEmployee(id).then( res => {
            this.setState({employees: this.state.employees.filter(employee => employee.id !== id)});
        });
    }
    viewEmployee(id){
        this.props.history.push(`/view-employee/${id}`);
    }
    editEmployee(id){
        this.props.history.push(`/add-employee/${id}`);
    }

    componentDidMount(){
        UserService.getEmployees().then((res) => {
            this.setState({ employees: res.data});
        });
    }

    addEmployee(){
        this.props.history.push('/add-employee/_add');
    }

    inputSearch = (event) => {
        this.setState({val: event.target.value})
    }

    doFilter = () => {
        UserService.getEmployeesByFilter(this.state.val).then((res) => {
            this.setState({ employees: res.data});
        }).catch((error) => {
            if (error) {
                this.setState({employees: []});
            }
        });
    }

    cancelSearch = () => {
        this.setState({val: ''})
        UserService.getEmployees().then((res) => {
            this.setState({ employees: res.data});
        });
    }

    render() {
        const {employees, val} = this.state;
        return (
            <div>
                 <h2 className="text-center">Users List</h2>
                 <div>
                    <button className="btn btn-primary" onClick={this.addEmployee}> Add Employee</button>
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
                                    <Button size="sm"
                                        variant="outline-info"
                                        type="button"
                                        onClick={this.doFilter}
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
                 <br></br>
                 <div className = "row">
                        <table className = "table table-striped table-bordered">

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
                                                 <button onClick={ () => this.editEmployee(employee.id)} className="btn btn-info">Update </button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.deleteEmployee(employee.id)} className="btn btn-danger">Delete </button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.viewEmployee(employee.id)} className="btn btn-info">View </button>
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

export default ListEmployeeComponent
