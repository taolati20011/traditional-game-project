import React, { Component, useEffect } from 'react'
import background from '../html/images/background_1.jpg';
import avatar from '../html/images/avatar.png';
import "../css/addgame.css"
import "../css/style.css"

export default class Addgame extends Component {
    constructor(props) {
        super(props)
        this.state = {
            "gameName": "",
            "gameDescription": "",
            "gameType": "",
            "gameImage": "",
        }
    }

    setParams = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }

    addNewGame = () => {
        const token = localStorage.getItem("accessToken");
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", `Bearer ${token}`);

        var raw = JSON.stringify({
        "gameName": this.state.gameName,
        "typeId": this.state.gameType,
        "gameDescription": this.state.gameDescription
        });

        var requestOptions = {
            method: 'POST',
            body: raw,
            redirect: 'follow',
            headers: myHeaders
        };

        fetch("http://13.210.125.44:8080/api/game/add", requestOptions)
        .then(response => response.text())
        .then(result => {
            alert(result)
        })
    }

    render() {
        return (
            <div class="addGame-form-container">
                  <img class="background-form" src={background}></img>
                <div class="addGame-form">
                    <img src={avatar} class="avatar"></img>
                    <h1>Thêm trò chơi</h1>
                    <form onSubmit={e => {
                        e.preventDefault();
                        this.addNewGame();
                    }}>
                        <div>
                            <label for="gameName">Tên trò chơi:</label>
                            <input type="text" name="gameName" onChange={this.setParams} placeholder="Tên trò chơi của bạn"></input>
                        </div>
                        <div>
                            <label for="gameType">Thể loại:</label><br />
                            <select name="gameType" onChange={this.setParams} value={this.state.gameType}>
                                <option hidden>Chọn thể loại</option>
                                <option value="1">Tình yêu</option>
                                <option value="2">Phong tục</option>
                                <option value="3">Chiến trận</option>
                                <option value="4">Nghề nghiệp</option>
                                <option value="5">Trí tuệ</option>
                            </select>
                        </div>

                        <div>
                            <label for="gameDescription">Mô tả:</label>
                            <input type="text" name="gameDescription" onChange={this.setParams} placeholder="Thông tin trò chơi"></input>
                        </div>
                        <div>
                            <label for="gameImage">Hình ảnh:</label>
                            <input type="file" name="gameImage" accept="image/*"></input>
                            <input type="submit"></input>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}
