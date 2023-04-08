import React, { Component, useEffect } from 'react'
import background from '../html/images/background_1.jpg';
import avatar from '../html/images/forget-password.png';
import "../css/form.css"
import SuccessAlert from '../errors/alert/SuccessAlert';
import ErrorAlert from '../errors/alert/ErrorAlert';

export default class ForgetPassword extends Component {
    constructor(props) {
        super(props)
        this.state = {
            "recipient": "",
            "alert": 0,
            "message": 0
        }
    }

    setParams = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }

    forgetpw = () => {
        // let currentURL = "/forget-password"
        // let navigate = useNavigate();
        // let t = false;
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "recipient": this.state.recipient
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("http://13.210.125.44:8080/api/user/forgotpassword", requestOptions)
            .then(response => {
                return response.text()
            })
            .then(result => {
                if (result == "Request success, We'll send an mail to you!") {
                    this.setState({
                        alert: 1,
                        message: result + "\n" + "Please check your email to get token reset password"
                    })
                    this.forceUpdate();
                    setTimeout(function() {window.location.replace("/reset-password");}, 5000)
                }
                else {
                    this.setState({
                        alert: 2,
                        message: result
                    })
                    this.forceUpdate();
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
                    <div class="formbox forgetbox">
                        <img src={avatar} class="avatar"></img>
                        <h1> Forget your password? </h1>
                        <form onSubmit={e => {
                            e.preventDefault();
                            this.forgetpw()
                        }}>
                            <div>
                                <label>Input your email here:</label>
                                <input type="text" name="recipient" onChange={this.setParams}></input>
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
