import React, { Component } from 'react'
import background from '../html/images/background_1.jpg';
import avatar from '../html/images/avatar.png';
import "../css/form.css"
import axios from 'axios';
import SuccessAlert from '../errors/alert/SuccessAlert';
import ErrorAlert from '../errors/alert/ErrorAlert';

export default class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            "username": "",
            "password": "",
            "alert": 0,
            "message": ""
        }
    }

    setParams = (event) => {
        this.setState({[event.target.name] : event.target.value})
    }

    login = () => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "username": this.state.username,
            "password": this.state.password
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        }

        fetch("http://13.210.125.44:8080/api/user/login", requestOptions)
            .then(response => {
                if (response.status == 400) {
                    this.setState({
                        alert: 2,
                        message: "Username or password is wrong! Please check it again!"
                    })
                    this.forceUpdate();
                    return;
                }
                else return response.json()
            })
            .then(result => {
                console.log(result)
                if (result.accessToken) {
                    this.setState({
                        alert: 1,
                        message: "Login Successful!"
                    })
                    this.forceUpdate();
                    localStorage.setItem("username", result.username)
                    localStorage.setItem("accessToken", result.accessToken)
                    setTimeout(function() {window.location.replace("/");}, 5000)
                }
                else {
                    this.state.alert = 2;
                    this.state.message = "Server is down! Please contact admin to open server!";
                    this.forceUpdate();
                    return;
                }
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
                <div class="formbox">
                    <img src={avatar} class="avatar" alt="avatar icon"></img>
                    <h1> Login Here </h1>
                    <form onSubmit = {e => {
                        e.preventDefault();
                        this.login()
                    }}>
                        <div>
                            <label>Username:</label>
                            <input type="text" name="username" placeholder="Enter username" onChange={this.setParams}></input>
                        </div>
                        <div>
                            <label>Password:</label>
                            <input type="password" name="password" placeholder="Enter password" onChange={this.setParams}></input>
                        </div>
                        <div>
                            <button type="submit">Login</button>
                        </div>
                        <a href="/forget-password">Forget your password?</a><br></br>
                        <a href="/register">Dont have an account?</a>
                    </form>
                    {this.state.alert == 1 ? (<div class="redirect-message"><h1> Đang tự động chuyển hướng tới trang chủ </h1></div>) : ""}
                </div>
            </div>
        </body>
        )
    }
}
