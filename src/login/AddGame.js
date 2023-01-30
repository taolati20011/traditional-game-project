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

    render() {
        return (
            <div class="addGame-form-container">
                  <img class="background-form" src={background}></img>
                <div class="addGame-form">
                    <img src={avatar} class="avatar"></img>
                    <h1>Thêm trò chơi</h1>
                    <form onSubmit={e => {
                        e.preventDefault();
                        this.Addgame();
                    }}>
                        <div>
                            <label for="gameName">Tên trò chơi:</label>
                            <input type="text" name="gameName" onChange={this.setParams} placeholder="Tên trò chơi của bạn"></input>
                        </div>
                        <div>
                            <label for="gameType">Thể loại:</label><br />
                            <select name="gameType">
                                <option hidden>Chọn thể loại</option>
                                <option value="tinhYeu">Tình yêu</option>
                                <option value="triTue">Trí tuệ</option>
                                <option value="phongTuc">Phong tục</option>
                                <option value="chienTran">Chiến trận</option>
                                <option value="ngheNghiep">Nghề nghiệp</option>
                            </select>
                        </div>

                        <div>
                            <label for="gameDescription">Mô tả:</label>
                            <input type="text" name="gameDescription" onChange={this.setParams} placeholder="Thông tin trò choi"></input>
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
