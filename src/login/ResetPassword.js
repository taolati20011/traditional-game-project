import React, { Component } from 'react'
import background from '../html/images/background_1.jpg';
import avatar from '../html/images/forget-password.png';
import "../css/form.css"
import SuccessAlert from '../errors/alert/SuccessAlert';
import ErrorAlert from '../errors/alert/ErrorAlert';

export default class ResetPassword extends Component {
    constructor(props) {
        super(props)
        this.state = {
            "password": "",
            "token": "",
            "alert": 0,
            "message": 0
        }
    }

    setParams = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }

    resetpw = () => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "password": this.state.password,
            "token": this.state.token
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("http://13.210.125.44:8080/api/user/resetpassword", requestOptions)
            .then(response => {
                return response.text()
            })
            .then(result => {
                if (result == "Password Change Successful") {
                    this.setState({
                        alert: 1,
                        message: result
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
                <div class="formbox resetbox">
                    <img src={avatar} class="avatar"></img>
                    <h1>Reset password</h1>
                    <form onSubmit={e => {
                        e.preventDefault();
                        this.resetpw()
                    }}>
                        <div>
                            <label>Input new password here:</label>
                            <input type="password" name="password" onChange={this.setParams}></input>
                        </div>
                        <div>
                            <label>Input token here:</label>
                            <input type="text" name="token" onChange={this.setParams}></input>
                        </div>
                        <div>
                            <button type="submit">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
            </body>
        )
    }
}
