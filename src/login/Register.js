import React, { Component } from 'react'

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

    setParams = (event) => {
        this.setState({[event.target.name] : event.target.value})
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
                console.log(response.text)
                if (response.status == 200) {
                    return response
                }
                throw Error(response.status)
            })
            .then(result => {
                console.log(result)
                localStorage.setItem("accessToken", result.accessToken)
                alert("Register success, We'll send an mail to you!")
            })
            .catch(error => {
                console.log('error', error)
                alert('Wrong format!')
            })
    }

    render() {
        return (
        <form>
            <div>
                <label>Username:</label>
                <input type="text" name="username" onChange={this.setParams}></input>
            </div>
            <div>
                <label>Password:</label>
                <input type="text" name="password" onChange={this.setParams}></input>
            </div>
            <div>
                <label>userAddress:</label>
                <input type="text" name="userAddress" onChange={this.setParams}></input>
            </div>
            <div>
                <label>userFullName:</label>
                <input type="text" name="userFullName" onChange={this.setParams}></input>
            </div>
            <div>
                <label>userPhone:</label>
                <input type="text" name="userPhone" onChange={this.setParams}></input>
            </div>
            <div>
                <label>userEmail:</label>
                <input type="text" name="userEmail" onChange={this.setParams}></input>
            </div>
            <div>
                <label>userGender:</label>
                <input type="text" name="userGender" onChange={this.setParams}></input>
            </div>
            <div>
                <button type="button" onClick={this.register}>Register</button>
            </div>
        </form>
        )
    }
}
