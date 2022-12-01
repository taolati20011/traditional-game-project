import React, { Component, useEffect } from 'react'

export default class ForgetPassword extends Component {
    constructor(props) {
        super(props)
        this.state = {
            "recipient": "",
        }
    }

    setParams = (event) => {
        this.setState({[event.target.name] : event.target.value})
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
          
          fetch("http://localhost:8080/api/user/forgotpassword", requestOptions)
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
