import Home from './html/Home.js';
import React from "react";
import Login from './login/Login.js';
import Register from './login/Register.js'
import ListUser from './html/ListUser.js';
import {
  BrowserRouter as Router,
  useRoutes,
} from "react-router-dom";
import PageGame from "../src/pages/PageGame";
import ForgetPassword from './login/ForgetPassword.js';
import ResetPassword from './login/ResetPassword.js';
import Addgame from './login/AddGame.js';
import ListGame from './login/ListGame.js';
import ListEmployee from './login/ListEmployee.js';

const AppLink = () => {
  let routes = useRoutes([
    { path: "/", element: <Home /> },
    { path: "/game/:id", element: <PageGame/> },
    { path: "/login", element: <Login/>},
    { path: "/list-user", element: <ListUser/>},
    { path: "/register", element: <Register/>},
    { path: "/forget-password", element: <ForgetPassword/>},
    { path: "/reset-password", element: <ResetPassword/>},
    { path: "/add-game", element: <Addgame/>},
    { path: "/list-game", element: <ListGame/>},
    { path: "/list-employee", element: <ListEmployee/>}
    // ...
  ]);
  return routes;
};

const App = () => {
  return (
    <Router>
      <AppLink />
    </Router>
  );
}

export default App;