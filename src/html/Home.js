import '../App.css';
import '../../src/css/style.css';
import '../../src/css/style1.css';
import '../css/style2.css'
import React, { useEffect, useState } from 'react';
import Image from './images/124010.png';

const Home = () => {
    return (
  <body class="home-body">
    <div id="head-wrapper">
      <div class="logo">
        <i class="game-logo">
          <a href=""> <img src={Image} /> </a>
        </i>
        <p>The Game Zone</p>
      </div>
      <ul class="navbar">
        <li><a href="#" class="active"> Home </a></li>
        <li><a href="#">Tình yêu</a></li>
        <li><a href="#">Phong tục</a></li>
        <li><a href="#">Chiến trận</a></li>
        <li><a href="#">Trí tuệ</a></li>
        <li><a href="#">Nghề nghiệp</a></li>
      </ul>
      <button type="button" id="btn"><a href="/login"><i class="play-logo"></i>Login</a></button>
    </div>

    <div id="introduction-wrapper">
      <div class="introduction-container">
        <h1>Gioi thieu</h1>
        <p>viet phan gioi thieu tai day</p>
      </div>
    </div>

    <div class="content-wrapper">
      <div class="section-1-wrapper">
        <h1>The loai</h1>
        <div class="section-1-container">
          <h4>Tình yêu</h4>
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
              <figcaption>Mèo đuổi chuột</figcaption>
            </a>
            <a href="/game/4">
              <div class="img img-4"></div>
              <figcaption>Rồng rắn lên mây</figcaption>
            </a>
            <a href="/game/5">
              <div class="img img-5"></div>
              <figcaption>Oẳn tù tì</figcaption>
            </a>
            <a href="#">
              <div class="img img-6"></div>
              <figcaption>ten game</figcaption>
            </a>
          </div>
        </div>

        <div class="section-1-container">
          <h4>Phong tục</h4>
          <br />
          <div class="section-1-img">
            <a href="#">
              <div class="img img-1"></div>
              <figcaption>ten game</figcaption>
            </a>
            <a href="#"
              ><div class="img img-2"></div>
              <figcaption>ten game</figcaption>
            </a>
            <a href="#">
              <div class="img img-3"></div>
              <figcaption>ten game</figcaption>
            </a>
            <a href="#">
              <div class="img img-4"></div>
              <figcaption>ten game</figcaption>
            </a>
            <a href="#">
              <div class="img img-5"></div>
              <figcaption>ten game</figcaption>
            </a>
            <a href="#">
              <div class="img img-6"></div>
              <figcaption>ten game</figcaption>
            </a>
          </div>
        </div>

        <div class="section-1-container">
          <h4>Chiến trận</h4>
          <br />
          <div class="section-1-img">
            <a href="#">
              <div class="img img-1"></div>
              <figcaption>ten game</figcaption>
            </a>
            <a href="#"
              ><div class="img img-2"></div>
              <figcaption>ten game</figcaption>
            </a>
            <a href="#">
              <div class="img img-3"></div>
              <figcaption>ten game</figcaption>
            </a>
            <a href="#">
              <div class="img img-4"></div>
              <figcaption>ten game</figcaption>
            </a>
            <a href="#">
              <div class="img img-5"></div>
              <figcaption>ten game</figcaption>
            </a>
            <a href="#">
              <div class="img img-6"></div>
              <figcaption>ten game</figcaption>
            </a>
          </div>
        </div>

        <div class="section-1-container">
          <h4>Trí tuệ</h4>
          <br />
          <div class="section-1-img">
            <a href="#">
              <div class="img img-1"></div>
              <figcaption>Keo co</figcaption>
            </a>
            <a href="#"
              ><div class="img img-2"></div>
              <figcaption>O an quan</figcaption>
            </a>
            <a href="#">
              <div class="img img-3"></div>
              <figcaption>ten game</figcaption>
            </a>
            <a href="#">
              <div class="img img-4"></div>
              <figcaption>ten game</figcaption>
            </a>
            <a href="#">
              <div class="img img-5"></div>
              <figcaption>ten game</figcaption>
            </a>
            <a href="#">
              <div class="img img-6"></div>
              <figcaption>ten game</figcaption>
            </a>
          </div>
        </div>

        <div class="section-1-container">
          <h4>Nghề nghiệp</h4>
          <br />
          <div class="section-1-img">
            <a href="#">
              <div class="img img-1"></div>
              <figcaption>ten game</figcaption>
            </a>
            <a href="#"
              ><div class="img img-2"></div>
              <figcaption>ten game</figcaption>
            </a>
            <a href="#">
              <div class="img img-3"></div>
              <figcaption>ten game</figcaption>
            </a>
            <a href="#">
              <div class="img img-4"></div>
              <figcaption>ten game</figcaption>
            </a>
            <a href="#">
              <div class="img img-5"></div>
              <figcaption>ten game</figcaption>
            </a>
            <a href="#">
              <div class="img img-6"></div>
              <figcaption>ten game</figcaption>
            </a>
          </div>
        </div>
      </div>
    </div>
  </body>

    );
}

export default Home;