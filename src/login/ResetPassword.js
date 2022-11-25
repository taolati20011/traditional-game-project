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
            console.log(response.text)
            if (response.status == 200) {
                return response
            }
            throw Error(response.status)
        })
        .then(result => {
            console.log(result)
            alert("Reset password success!")
        })
        .catch(error => {
            console.log('error', error)
            alert('Wrong password format!')
        })
    }

    render() {
        return (
            <form>
                <div>
                    <label>Input new password here:</label>
                    <input type="text" name="password" onChange={this.setParams}></input>
                </div>
                <div>
                    <label>Input token here:</label>
                    <input type="text" name="token" onChange={this.setParams}></input>
                </div>
                <div>
                    <button type="button" onClick={this.resetpw}>Submit</button>
                </div>
            </form>
        )
    }
}
