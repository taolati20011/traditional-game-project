import Home from './html/Home.js';
import React from "react";
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