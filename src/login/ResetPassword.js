import React, { Component } from 'react'

export default class ResetPassword extends Component {
    constructor(props) {
        super(props)
        this.state = {
            "password": "",
            "token": ""
        }
    }

    setParams = (event) => {
        this.setState({[event.target.name] : event.target.value})
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
          
          fetch("http://localhost:8080/api/user/resetpassword", requestOptions)
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
            <form onSubmit = {e => {
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
        )
    }
}
