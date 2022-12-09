import React, { Component, useEffect } from 'react'
import background from '../html/images/background_1.jpg';
import avatar from '../html/images/avatar.png';
import "../css/form.css"
import "../css/style.css"

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
            "userGender": ""
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

        fetch("http://localhost:8080/api/user/signup", requestOptions)
            .then(response => {
                return response.text()
            })
            .then(result => {
                result = result.replace(/","/g, "\n").replace(/"/g, "")
                    .replace('[', '').replace(']', '')
                for (let i = 0; i <= result.length; i++) {
                    console.log(result[i])
                }
                alert(result)
                if (result == "Register successful") {
                    window.location.replace("/login")
                }
            })
    }

    render() {
        return (
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
                                <input type="text" name="password" onChange={this.setParams}></input>
                            </div>
                        </div>
                        <div class="registerrow">
                            <div>
                                <label>userAddress:</label>
                                <input type="text" name="userAddress" onChange={this.setParams}></input>
                            </div>
                            <div>
                                <label>userFullName:</label>
                                <input type="text" name="userFullName" onChange={this.setParams}></input>
                            </div>
                        </div>
                        <div class="registerrow">
                            <div>
                                <label>userPhone:</label>
                                <input type="text" name="userPhone" onChange={this.setParams}></input>
                            </div>
                            <div>
                                <label>userGender:</label>
                                <input type="text" name="userGender" onChange={this.setParams}></input>

                            </div>
                        </div>

                        <div>
                            <label>userEmail:</label>
                            <input type="text" name="userEmail" onChange={this.setParams}></input>
                            <button type="submit">Register</button>
                        </div>

                    </form>
                </div>
            </div>
        )
    }
}
