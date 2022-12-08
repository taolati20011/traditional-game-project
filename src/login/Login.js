import React, { Component } from 'react'
import background from '../html/images/background_1.jpg';
import avatar from '../html/images/avatar.png';
import "../css/Login.css"
import axios from 'axios';

export default class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            "username": "",
            "password": ""
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

        fetch("http://localhost:8080/api/user/login", requestOptions)
            .then(response => {
                if (response.status == 400) {
                    alert("Username or password is wrong! Please check it again!")
                    return
                }
                else return response.json()
            })
            .then(result => {
                console.log(result)
                if (result.accessToken) {
                    alert("Login Successful")
                    localStorage.setItem("username", result.username)
                    localStorage.setItem("accessToken", result.accessToken)
                    window.location.replace("/")
                }
                else {
                    alert("Server is down!\nPlease contact admin to open server!")
                }
            })
    }

    render() {
        return (
        <body>
        <div class="login-body-container">
        <img class="background-login" src={background}></img>
            <div class="loginbox">
                <img src={avatar} class="avatar"></img>
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
        </div>
        </div>
        </body>
        )
    }
}
