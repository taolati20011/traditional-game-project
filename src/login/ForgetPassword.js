import React, { Component, useEffect } from 'react'
import background from '../html/images/background_1.jpg';
import avatar from '../html/images/forget-password.png';
import "../css/form.css"

export default class ForgetPassword extends Component {
    constructor(props) {
        super(props)
        this.state = {
            "recipient": "",
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
                alert(result)
                if (result == "Request success, We'll send an mail to you!") {
                    window.location.replace("/reset-password");
                }
            })
    }

    render() {
        return (
            <body>
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
