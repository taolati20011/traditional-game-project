import React, { Component, useEffect } from 'react'
import background from '../html/images/background_1.jpg';
import avatar from '../html/images/avatar.png';
import "../css/form.css"
import "../css/style.css"
import SuccessAlert from '../errors/alert/SuccessAlert';
import ErrorAlert from '../errors/alert/ErrorAlert';

export default class Register extends Component {
    constructor(props) {
        super(props)
        this.state = {
            "username": "",
            "password": "",
            "userAddress": "",
            "userFullname": "",
            "userPhone": "",
            "userEmail": "",
            "userGender": "",
            "alert": 0,
            "type": 0
        }
    }

    componentDidUpdate() {
        if (localStorage.getItem("username")) {
            alert("Please sign out first!");
            window.location.replace("/");
            return;
        }
    }

    setParams = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }

    register = () => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "username": this.state.username,
            "password": this.state.password,
            "userAddress": this.state.userAddress,
            "userFullname": this.state.userFullName,
            "userPhone": this.state.userPhone,
            "userEmail": this.state.userEmail,
            "userGender": this.state.userGender
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        }

        fetch("http://13.210.125.44:8080/api/user/signup", requestOptions)
            .then(response => {
                return response.text()
            })
            .then(result => {
                result = result.replace(/","/g, "\n").replace(/"/g, "")
                    .replace('[', '').replace(']', '')
                for (let i = 0; i <= result.length; i++) {
                    console.log(result[i])
                }
                if (result == "Register successful") {
                    this.setState({
                        alert: 1,
                        message: result + "!"
                    })
                    this.forceUpdate();
                    setTimeout(function() {window.location.replace("/login");}, 5000)
                }
                else {
                    this.setState({
                        alert: 2,
                        message: result
                    })
                    this.forceUpdate();
                    return;
                }
            })
            .catch (error => {
                this.state.alert = 2;
                this.state.message = "Server is down! Please contact admin to open server!";
                this.forceUpdate();
                return;
            })
    }

    renderAlert = () => {
        switch(this.state.alert) {
            case 1:
                return <SuccessAlert message={this.state.message}></SuccessAlert>
            case 2:
                return <ErrorAlert message={this.state.message}></ErrorAlert>
            default:
                return null;
        }
    }

    render() {
        return (
            <body>
            <div class="alert-message">
                {this.renderAlert()}
            </div>
            <div class="form-body-container">
                <img class="background-form" src={background}></img>
                <div class="formbox registerbox">
                    <img src={avatar} class="avatar"></img>
                    <h1>Register</h1>
                    <form onSubmit={e => {
                        e.preventDefault();
                        this.register();
                    }}>
                        <div class="registerrow">
                            <div>
                                <label>Username:</label>
                                <input type="text" name="username" onChange={this.setParams}></input>
                            </div>

                            <div>
                                <label>Password:</label>
                                <input type="password" name="password" onChange={this.setParams}></input>
                            </div>
                        </div>
                        <div class="registerrow">
                            <div>
                                <label>Address:</label>
                                <input type="text" name="userAddress" onChange={this.setParams}></input>
                            </div>
                            <div>
                                <label>FullName:</label>
                                <input type="text" name="userFullName" onChange={this.setParams}></input>
                            </div>
                        </div>
                        <div class="registerrow">
                            <div>
                                <label>Phone:</label>
                                <input type="text" name="userPhone" onChange={this.setParams}></input>
                            </div>
                            <div>
                                <label>Gender:</label>
                                <input type="text" name="userGender" onChange={this.setParams}></input>

                            </div>
                        </div>

                        <div>
                            <label>Email:</label>
                            <input type="text" name="userEmail" onChange={this.setParams}></input>
                            <button type="submit">Register</button>
                        </div>

                    </form>
                </div>
            </div>
            </body>
        )
    }
}
