import React, { Component } from 'react'

export default class ForgetPassword extends Component {
    constructor(props) {
        super(props)
        this.state = {
            "recipient": ""
        }
    }

    setParams = (event) => {
        this.setState({[event.target.name] : event.target.value})
    }

    forgetpw = () => {
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
          
          fetch("http://localhost:8080/api/user/forgotpassword", requestOptions)
          .then(response => {
            console.log(response.text)
            if (response.status == 200) {
                return response
            }
            throw Error(response.status)
        })
        .then(result => {
            console.log(result)
            alert("Request success, We'll send an mail to you!")
        })
        .catch(error => {
            console.log('error', error)
            alert('Wrong email format!')
        })
    }

    render() {
        return (
            <form>
                <div>
                    <label>Input your email here:</label>
                    <input type="text" name="recipient" onChange={this.setParams}></input>
                </div>
                <div>
                    <button type="button" onClick={this.forgetpw}>Submit</button>
                </div>
            </form>
        )
    }
}
