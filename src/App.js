import Home from './html/Home.js';
import React from "react";
import Login from './login/Login.js';
import Register from './login/Register.js'
import ListUser from './html/ListUser.js';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useRoutes,
} from "react-router-dom";
import PageGame from "../src/pages/PageGame";
import ForgetPassword from './login/ForgetPassword.js';

const AppLink = () => {
  let routes = useRoutes([
    { path: "/", element: <Home /> },
    { path: "/game/:id", element: <PageGame/> },
    { path: "/login", element: <Login/>},
    { path: "/list-user", element: <ListUser/>},
    { path: "/register", element: <Register/>},
    { path: "/forget-password", element: <ForgetPassword/>}
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