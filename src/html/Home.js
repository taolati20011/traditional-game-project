import '../App.css';
import '../../src/css/style.css';
import '../../src/css/style1.css';
import '../css/style2.css';
import React, { Component, useEffect, useState } from 'react';
import { HashLink } from 'react-router-hash-link';
import {Swiper, SwiperSlide} from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y, EffectCube } from 'swiper';
import 'swiper/swiper-bundle.min.css';
import '../login/groupGame/style.css';
import GroupGame from '../login/groupGame/GroupGame';

import Image from './images/124010.png';
import wallpaper from "../html/images/wallpaper.png";
import TriTue from "../html/images/tri-tue.png"
import PhongTuc from "../html/images/phong-tuc.png"
import ChienTran from "../html/images/chien-tran.png"
import TinhYeu from "../html/images/tinh-yeu.png"
import NgheNghiep from "../html/images/nghe-nghiep.png"
import LetsPlayButton from "../html/images/lets-play.png"
import LatBai from "../html/images/lat-bai.jpg"
import slides from '../login/groupGame/mock.json';
import GameService from '../services/GameService';
import { Box, CircularProgress } from '@mui/material';

const scrollWithOffset = (el) => {
  const yCoordinate = el.getBoundingClientRect().top + window.pageYOffset;
  const yOffset = -100;
  console.log(window.pageYOffset)
  window.scrollTo({ top: yCoordinate + yOffset, behavior: 'smooth' });
}

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);
    this.state = {
      currentUser: undefined,
      images: [],
      types: [],
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

    GameService.getAllType().then(res => {
      this.setState({ types: res.data }, () => {
        GameService.getMainImageByType().then((res1) => {
          this.setState({ images: res1.data }, () => {
            this.setState({ isFetch: true }, () => {
              this.forceUpdate();
            })
          })
        })
      })
    }).catch (error => {
      if (error.response.status == 401 | error.response.status == 403) {
          window.location.replace("/access-denied");
          return;
      }
      window.location.replace("/internal-server-error");
    });

  }

  logOut() {
    localStorage.removeItem("username")
    localStorage.removeItem("accessToken")
  }

  render() {
    const { currentUser } = this.state;

    if (!this.state.isFetch) {
      return (
        <Box sx={{ display: 'flex', justifyContent: 'center'}}>
          <CircularProgress />
        </Box>
      )
    }

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
            <li><HashLink smooth to="#">Trang chủ</HashLink></li>
            <li><HashLink smooth to="#type1" scroll={el => scrollWithOffset(el)}>Trí tuệ</HashLink></li>
            <li><HashLink smooth to="#type2" scroll={el => scrollWithOffset(el)}>Phong tục</HashLink></li>
            <li><HashLink smooth to="#type3" scroll={el => scrollWithOffset(el)}>Chiến trận</HashLink></li>
            <li><HashLink smooth to="#type4" scroll={el => scrollWithOffset(el)}>Tình yêu</HashLink></li>
            <li><HashLink smooth to="#type5" scroll={el => scrollWithOffset(el)}>Nghề nghiệp</HashLink></li>
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
        <div className='introduction'>
          <div className='introduction-border'></div>
          <div class="introduction-wrapper">
            <div class="introduction-container">
              <h1>Giới thiệu</h1>
              <p>Trò chơi dân gian là những hoạt động vui chơi giải trí do quần chúng nhân dân sáng tạo ra và được lưu truyền tự nhiên qua nhiều thế hệ.
                Trò chơi dân gian diễn ra mọi lúc, mọi nơi, không hạn định về mặt thời gian, không gian và phản ánh đời sống tinh thần, văn hóa của dân tộc.
                Trò chơi dân gian là tài sản chung của cả một xã hội, nó không phải của riêng một cá nhân nào, trò chơi dân gian gắn liền với sự tồn tại, phát triển của một cộng đồng người trong nhiều chặng đường phát triển khác nhau.
              </p>
              <img src={LetsPlayButton} alt="lets'play" style={{ marginTop: "20px" }}></img>
            </div>
            <div className='introduction-container'>
              <div class="introduction-container-right">
                <img src={LatBai} alt='lat-bai.png'></img>
              </div>
            </div>
          </div>
        </div>

        <div class="content-wrapper">
          <div class="section-1-wrapper">
            <div className='section-1-h1'>
              <h1>Thể loại</h1>
            </div>

            {
              this.state.images.map(
                image => 
                  <div class="section-1-container" id="type1">
                    <div className='type-container'>
                      <img src={image[0].typeImage}></img>
                    </div>
                    <GroupGame slides={image}>
                    </GroupGame>
                  </div>
              )
            }
          </div>
        </div>
        <footer className='flex-col-align-center'>
          <div class="footer-vertical flex-col-align-center"></div>
          <div class="footer-vertical flex-col-align-center">
            <span style={{ position: 'absolute', bottom: '42.78px' }}>© Copyright 2022</span>
          </div>
        </footer>
      </body>

    );
  }

}

