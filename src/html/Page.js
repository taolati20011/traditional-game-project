import React, { Component } from 'react';
import fbIcon from './images/124010.png';
import notAvailable from "../html/images/not-available.png";
import oAnQuan from "../html/images/o-an-quan.jpg";
import latBai from "../html/images/lat-bai.jpg";
import coToan from "../html/images/co-toan.jpg";
import coCaro from "../html/images/co-caro.jpg";
import banBi from "../html/images/ban-bi.jpg";
import bitMatBatDe from "../html/images/bit-mat-bat-de.jpg";
import caSauLenBo from "../html/images/ca-sau-len-bo.jpg";
import keoCo from "../html/images/keo-co.jpg";
import keoCua from "../html/images/keo-cua-lua-xe.jpg";
import meoDuoiChuot from "../html/images/meo-duoi-chuot.jpg";
import motHaiBa from "../html/images/mot-hai-ba.jpg";
import nhayDay from "../html/images/nhay-day.jpg";
import nhayLoCo from "../html/images/nhay-lo-co.jpg";
import oanTuTi from "../html/images/oan-tu-ti.jpg";
import rongRan from "../html/images/rong-ran-len-may.jpg";
import tronTim from "../html/images/tron-tim.jpg";
import dungDang from "../html/images/dung-dang-dung-de.jpg";

class Page extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);
    this.state = {
      currentUser: undefined,
      gameName: undefined,
      description: undefined
    }
  }

  componentDidMount() {
    const user = localStorage.getItem("username");

    if (user) {
      this.setState({
        currentUser: user
      });
    }
  }

  logOut() {
    localStorage.removeItem("username")
    localStorage.removeItem("accessToken")
  }

  renderPage(props) {
    const { currentUser } = this.state;
    var urlGame = null;
    var gameIcon = notAvailable;
    switch (props.gameName) {
      case "Ô ăn quan":
        urlGame = "http://127.0.0.1:5500/src/games/o-an-quan/index.html";
        gameIcon = oAnQuan;
        break;
      case "Lật bài":
        urlGame = "http://127.0.0.1:5500/src/games/flipCard/quiz14.html";
        gameIcon = latBai;
        break;
      case "Cờ toán Việt Nam":
        urlGame = "http://127.0.0.1:5500/src/games/chess_vn/index.html";
        gameIcon = coToan;
        break;
      case "Tíc tắc toe":
        urlGame = "http://127.0.0.1:5500/src/games/tic-tac-toe/index.html";
        gameIcon = coCaro;
        break;
      case "Bắn bi":
        gameIcon = banBi;
        break;
      case "Bịt mắt bắt dê":
        gameIcon = bitMatBatDe;
        break;
      case "Cá sấu lên bờ":
        gameIcon = caSauLenBo;
        break;
      case "Kéo co":
        gameIcon = keoCo;
        break;
      case "Kéo cưa lừa xẻ":
        gameIcon = keoCua;
        break;
      case "Mèo đuổi chuột":
        gameIcon = meoDuoiChuot;
        break;
      case "Một hai ba":
        gameIcon = motHaiBa;
        break;
      case "Nhảy dây":
        gameIcon = nhayDay;
        break;
      case "Nhảy lò cò":
        gameIcon = nhayLoCo;
        break;
      case "Oẳn tù tì":
        gameIcon = oanTuTi;
        break;
      case "Rồng rắn lên mây":
        gameIcon = rongRan;
        break;
      case "Trốn tìm":
        gameIcon = tronTim;
        break;
      case "Dung dăng dung dẻ":
        gameIcon = dungDang;
        break; 
    }
    return (
      <body class="page-body">
        <div id="head-wrapper">
          <div class="logo">
            <i class="game-logo">
              <a href="/"> <img src={fbIcon} /> </a>
            </i>
            <p>The Game Zone</p>
          </div>
          <ul class="navbar">
            <li><a href="/" class="active"> Home </a></li>
            <li><a href="#">Tình yêu</a></li>
            <li><a href="#">Phong tục</a></li>
            <li><a href="#">Chiến trận</a></li>
            <li><a href="#">Trí tuệ</a></li>
            <li><a href="#">Nghề nghiệp</a></li>
          </ul>
          {currentUser ? (
            <div class="hello-user">
              <p> Hello, {currentUser}  <br></br>
                <a class="log-out" onClick={this.logOut} href="/"> Sign out </a> </p>
            </div>
          ) : (<button type="button" id="btn"><a href="/login"><i class="play-logo"></i>Login</a></button>)}
        </div>
        <div id="content-wrapper" class="flex-row-justify-between">
          <div id="content-left" class="flex-col-align-center">
            <div class="image-container">
              <img src={gameIcon} width="225px" height="225px" alt="game_pic" />
            </div>
            <div class="button-container">
              {urlGame ? (
                <button class="content-button">
                  <a href={urlGame}>Chơi game
                  </a>
                </button>
              ) : (<button class="content-button-black"> <a>Chơi game</a></button>)}
            </div>
          </div>
          <div id="content-right" class="flex-col-align-center">
            <h1>Mô tả {props.gameName}</h1>
            <p>{props.description}</p>
          </div>
        </div>
        <footer>
          <div class="footer-vertical flex-row-justify-end">
            <div class="vertical-child-left">
              <p>Bấm vào đây để đóng góp ý kiến:</p>
              <button>Click me!</button>
            </div>
          </div>
          <div class="footer-vertical flex-col-align-center">
            <span>© Copyright 2022. All rights reserved</span>
            <span ><a class="footer-a">Terms of Service</a> | <a class="footer-a">Privacy Policy</a></span>
          </div>
        </footer>
      </body>
    );
  }

  render() {
    return this.renderPage(this.props);
  }
}

export default Page;