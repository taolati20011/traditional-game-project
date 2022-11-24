import Home from './html/Home.js';
import React from "react";
import Login from './html/Login.js';
import ListUser from './html/ListUser.js';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useRoutes,
} from "react-router-dom";
import PageGame from "../src/pages/PageGame";

const AppLink = () => {
  let routes = useRoutes([
    { path: "/", element: <Home /> },
    { path: "/game/:id", element: <PageGame/> },
    { path: "/login", element: <Login/>},
    { path: "/list-user", element: <ListUser/>}
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