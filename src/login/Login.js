import React, { Component } from 'react'

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
                console.log(response.status)
                if (response.status == 200) {
                    return response
                }
                throw Error(response.status)
            })
            .then(result => {
                console.log(result)
                localStorage.setItem("accessToken", result.accessToken)
                alert("Login success")
            })
            .catch(error => {
                console.log('error', error)
                alert('Username or password wrong!')
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
                <button type="button" onClick={this.login}>Login</button>
            </div>
        </form>
        )
    }
}
