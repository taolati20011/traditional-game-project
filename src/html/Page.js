import React, {Component} from 'react';
import fbIcon from './images/124010.png';
import gameIcon from './images/images.jpg';

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
    const {currentUser} = this.state;
    var urlGame = null;
    switch (props.gameName) {
      case "Ô ăn quan":
        urlGame = "http://127.0.0.1:5500/src/games/o-an-quan/index.html";
        break;
      case "Lật thẻ":
        urlGame = "http://127.0.0.1:5500/src/games/flipCard/quiz14.html";
        break;    
      case "Cờ toán Việt Nam":
        urlGame = "http://127.0.0.1:5500/src/games/chess_vn/index.html";
        break;
      case "Tíc tắc toe":
        urlGame = "http://127.0.0.1:5500/src/games/tic-tac-toe/index.html";
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
            <img src={gameIcon} alt="game_pic"/>
          </div>
          <div class="button-container">
            <button class="content-button"><a href={urlGame}>Chơi game</a></button>
          </div>
        </div>
        <div id="content-right" class ="flex-col-align-center">
          <h1>Mô tả {props.gameName}</h1>
          <p>{props.description}</p>
        </div>
      </div>
    </body>
      );
  }

  render() {
    return this.renderPage(this.props);
  }
}

export default Page;