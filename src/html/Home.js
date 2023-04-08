import '../App.css';
import '../../src/css/style.css';
import '../../src/css/style1.css';
import '../css/style2.css';
import React, { Component, useEffect, useState } from 'react';
import Image from './images/124010.png';
import wallpaper from "../html/images/wallpaper.png";


export default class Home extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);
    this.state = {
      currentUser: undefined
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

  render() {
    const { currentUser } = this.state;

    return (
      <body class="home-body">
        <div id="head-wrapper">
          <div class="logo">
            <i class="game-logo">
              <a href="/"> <img src={Image} /> </a>
            </i>
            <p>The Game Zone</p>
          </div>
          <ul class="navbar">
            <li><a href="." class="active"> Home </a></li>
            <li><a href="#type1">Trí tuệ</a></li>
            <li><a href="#type2">Phong tục</a></li>
            <li><a href="#type3">Chiến trận</a></li>
            <li><a href="#type4">Tình yêu</a></li>
            <li><a href="#type5">Nghề nghiệp</a></li>
          </ul>
          {currentUser ? (
            <div class="hello-user">
              <p> Hello, {currentUser}  <br></br>
                <a class="log-out" onClick={this.logOut} href="."> Sign out </a> </p>
            </div>
          ) : (<button type="button" id="btn"><a href="/login"><i class="play-logo"></i>Login</a></button>)}
        </div>

        <div class="home-wallpaper flex-col-align-center">
          <img src={wallpaper} alt="wallpaper" max-width="100%" object-fit="contain" />
        </div>
        <div class="introduction-wrapper">
          <div class="introduction-container">
            <h1>Giới thiệu</h1>
            <p>Trò chơi dân gian là những hoạt động vui chơi giải trí do quần chúng nhân dân sáng tạo ra và được lưu truyền tự nhiên qua nhiều thế hệ.
              Trò chơi dân gian diễn ra mọi lúc, mọi nơi, không hạn định về mặt thời gian, không gian và phản ánh đời sống tinh thần, văn hóa của dân tộc.
              Trò chơi dân gian là tài sản chung của cả một xã hội, nó không phải của riêng một cá nhân nào, trò chơi dân gian gắn liền với sự tồn tại, phát triển của một cộng đồng người trong nhiều chặng đường phát triển khác nhau.
            </p>
          </div>
          <div class="introduction-container">
          </div>
        </div>

        <div class="content-wrapper">
          <div class="section-1-wrapper">
            <h1>Thể loại</h1>
            <div class="section-1-container" id="type1">
              <h4>Trí tuệ</h4>
              <br />
              <div class="section-1-img">
                <a href="/game/1">
                  <div class="img img-1"></div>
                  <figcaption>Dung dăng dung dẻ</figcaption>
                </a>
                <a href="/game/2"
                ><div class="img img-2"></div>
                  <figcaption>Ô ăn quan</figcaption>
                </a>
                <a href="/game/3">
                  <div class="img img-3"></div>
                  <figcaption>Lật thẻ</figcaption>
                </a>
                <a href="/game/4">
                  <div class="img img-4"></div>
                  <figcaption>Cờ toán Việt Nam</figcaption>
                </a>
                <a href="/game/5">
                  <div class="img img-5"></div>
                  <figcaption>Tíc tắc toe</figcaption>
                </a>
              </div>
            </div>

            <div class="section-1-container" id="type2">
              <h4>Phong tục</h4>
              <br />
              <div class="section-1-img">
                <a href="/game/6">
                  <div class="img img-6"></div>
                  <figcaption>Bắn bi</figcaption>
                </a>
                <a href="/game/7"
                ><div class="img img-7"></div>
                  <figcaption>Bịt mắt bắt dê</figcaption>
                </a>
                <a href="/game/8">
                  <div class="img img-8"></div>
                  <figcaption>Cá sấu lên bờ</figcaption>
                </a>
                <a href="/game/9">
                  <div class="img img-9"></div>
                  <figcaption>Kéo co</figcaption>
                </a>
              </div>
            </div>

            <div class="section-1-container" id="type3">
              <h4>Chiến trận</h4>
              <br />
              <div class="section-1-img">
                <a href="/game/10">
                  <div class="img img-10"></div>
                  <figcaption>Kéo cưa lừa xẻ</figcaption>
                </a>
                <a href="/game/11"
                ><div class="img img-11"></div>
                  <figcaption>Mèo đuổi chuột</figcaption>
                </a>
                <a href="/game/12">
                  <div class="img img-12"></div>
                  <figcaption>Một hai ba</figcaption>
                </a>
                <a href="/game/13">
                  <div class="img img-13"></div>
                  <figcaption>Nhảy dây</figcaption>
                </a>
              </div>
            </div>

            <div class="section-1-container" id="type4">
              <h4>Tình yêu</h4>
              <br />
              <div class="section-1-img">
                <a href="/game/14">
                  <div class="img img-14"></div>
                  <figcaption>Nhảy lò cò</figcaption>
                </a>
                <a href="/game/15"
                ><div class="img img-15"></div>
                  <figcaption>Oẳn tù tì</figcaption>
                </a>
                <a href="/game/16">
                  <div class="img img-16"></div>
                  <figcaption>Rồng rắn lên mây</figcaption>
                </a>
                <a href="/game/17">
                  <div class="img img-17"></div>
                  <figcaption>Trốn tìm</figcaption>
                </a>
              </div>
            </div>

            <div class="section-1-container" id="type5">
              <h4>Nghề nghiệp</h4>
              <br />
              <div class="section-1-img">
                <a href="#">
                  <div class="img img-0"></div>
                  <figcaption>ten game</figcaption>
                </a>
                <a href="#"
                ><div class="img img-0"></div>
                  <figcaption>ten game</figcaption>
                </a>
                <a href="#">
                  <div class="img img-0"></div>
                  <figcaption>ten game</figcaption>
                </a>
                <a href="#">
                  <div class="img img-0"></div>
                  <figcaption>ten game</figcaption>
                </a>
              </div>
            </div>
          </div>
        </div>
        <footer className='flex-col-align-center'>
          <div class="footer-vertical flex-col-align-center"></div>
          <div class="footer-vertical flex-col-align-center">
            <span style={{position: 'absolute', bottom: '42.78px'}}>© Copyright 2022</span>
          </div>
        </footer>
      </body>

    );
  }

}

