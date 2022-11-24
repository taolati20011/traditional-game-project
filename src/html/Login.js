import "../css/Login.css";
import background from './images/background_1.jpg';
import avatar from './images/avatar.png';

const Login = () => {
    return (
        <body>
    <img class="image" src={background}/>
    <div class="loginbox">
        <img src={avatar} class="avatar"/>
        <h1>Login Here</h1>
        <form>
            <p>Username</p>
            <input type="text" name="" placeholder="Enter Username"/>
            <p>Password</p>
            <input type="password" name="" placeholder="Enter Password"/>
            <input type="submit" name="" value="login"/>
            <a href="#">Forget your password?</a><br/>
            <a href="#">Dont have an account?</a>
        </form>
    </div>
</body>
    );
}

export default Login;