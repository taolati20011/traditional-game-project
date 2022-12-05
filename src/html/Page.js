import React from 'react';
import fbIcon from './images/124010.png';
import gameIcon from './images/images.jpg'

const Page = (gameName, description) => {
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
      <button type="button" id="btn"><a href="/login"><i class="play-logo"></i>Login</a></button>
    </div>
    <div id="content-wrapper" class="flex-row-justify-between">
      <div id="content-left" class="flex-col-align-center">
        <div class="image-container">
          <img src={gameIcon} alt="game_pic"/>
        </div>
        <div class="button-container">
          <button class="content-button">Chơi game</button>
        </div>
      </div>
      <div id="content-right" class ="flex-col-align-center">
        <h1>Mô tả {gameName}</h1>
        <p>{description}</p>
      </div>
    </div>
  </body>
    );
}

export default Page;