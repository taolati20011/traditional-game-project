import React, { Component } from 'react';
import { HashLink } from 'react-router-hash-link';
import fbIcon from './images/124010.png';
import notAvailable from "../html/images/not-available.png";
import GameService from '../services/GameService';
import { Box, CircularProgress } from '@mui/material';

const scrollWithOffset = (el) => {
  const yCoordinate = el.getBoundingClientRect().top + window.pageYOffset;
  const yOffset = 350; 
  // console.log(window.pageYOffset)
  window.scrollTo({ top: yCoordinate + yOffset, behavior: 'smooth' }); 
}

class Page extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);
    this.state = {
      currentUser: undefined,
      gameId: undefined,
      gameName: undefined,
      description: undefined,
      mainImage: undefined,
      coverImages: [],
      isFetch: false
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

  getImageData(id) {
    GameService.getAllImage(id).then(res => {
      const imageArray = res.data;
      const size = imageArray.length;
      this.setState({
        mainImage: imageArray.slice(size-1),
        coverImages: imageArray.slice(0, size-1)
      }, () => {
        this.setState({
          isFetch: true
        }, () => {
          this.forceUpdate();
        } )
      })
    }).catch(error => {
      if (error.response) {
        if (error.response.status == 404) {
          window.location.replace("/not-found");
          return;
        }
      }
      window.location.replace("/internal-server-error");
    })
  }

  renderPage(props) {
    const { currentUser } = this.state;
    var urlGame = null;
    var gameIcon = notAvailable;
    this.getImageData(props.gameId);
    switch (props.gameName) {
      case "Ô ăn quan":
        urlGame = "https://traditional-games.vercel.app/o-an-quan/index.html";
        break;
      case "Lật bài":
        urlGame = "https://traditional-games.vercel.app/flipCard/quiz14.html";
        break;
      case "Cờ toán Việt Nam":
        urlGame = "https://traditional-games.vercel.app/chess_vn/index.html";
        break;
      case "Tíc tắc toe":
        urlGame = "https://traditional-games.vercel.app/tic-tac-toe/index.html";
        break;
    }
    if (!this.state.isFetch) {
      return (
        <Box sx={{ display: 'flex', justifyContent: 'center'}}>
          <CircularProgress />
        </Box>
      )
    }
    return (
      <body class="page-body">
        <div id="head-wrapper">
          <div class="logo">
          </div>
          <ul class="navbar">
            <li><HashLink smooth to="../#" >Trang chủ</HashLink></li>
            <li><HashLink smooth to="../#type1" scroll={el => scrollWithOffset(el)}>Trí tuệ</HashLink></li>
            <li><HashLink smooth to="../#type2" scroll={el => scrollWithOffset(el)}>Phong tục</HashLink></li>
            <li><HashLink smooth to="../#type3" scroll={el => scrollWithOffset(el)}>Chiến trận</HashLink></li>
            <li><HashLink smooth to="../#type4" scroll={el => scrollWithOffset(el)}>Tình yêu</HashLink></li>
            <li><HashLink smooth to="../#type5" scroll={el => scrollWithOffset(el)}>Nghề nghiệp</HashLink></li>
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
              <img src={this.state.mainImage[0].image} width="504.57px" height="329.79px" alt="game_pic" />
            </div>
            <div class="image-container">
              <img src={this.state.coverImages[0].image} width="155.79px" height="118.24px" alt="game_pic"/>
              <img src={this.state.coverImages[1].image} width="155.79px" height="118.24px" alt="game_pic"/>
              <img src={this.state.coverImages[2].image} width="155.79px" height="118.24px" alt="game_pic"/>
            </div>
          </div>
          <div id="content-right" class="flex-col-align-center">
            <h1>Mô tả {props.gameName}</h1>
            <p>{props.description}</p>
            <div class="button-container">
              {urlGame ? (
                <button class="content-button">
                  <a class="play-button-in-page" href={urlGame}>Chơi game
                  </a>
                </button>
              ) : (<button class="content-button-black"> <a>Chơi game</a></button>)}
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

  render() {
    return this.renderPage(this.props);
  }
}

export default Page;