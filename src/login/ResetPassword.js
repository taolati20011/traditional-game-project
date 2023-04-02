import React, { Component } from 'react'
import background from '../html/images/background_1.jpg';
import avatar from '../html/images/forget-password.png';
import "../css/form.css"

export default class ResetPassword extends Component {
    constructor(props) {
        super(props)
        this.state = {
            "password": "",
            "token": ""
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
                alert(result)
                if (result == "Password Change Successful") {
                    window.location.replace("/login")
                }
            })
    }

    render() {
        return (
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
                            <input type="text" name="password" onChange={this.setParams}></input>
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
        )
    }
}
