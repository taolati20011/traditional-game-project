import React, { useEffect, useState } from 'react';
import './App.css';
import './css/style.css';
import './css/o-an-quan-style.css';
import Page from './html/o-an-quan.js';
import Home from './html/index.js';

const App = () => {

  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(false);

  const URL = "api/game/get-detail/" + "?game-id=5";

  useEffect(() => {
    setLoading(true);

    fetch(URL)
      .then(response => response.json())
      .then(data => {
        setGroups(data);
        setLoading(false);
      })
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    Page(groups.gameName, groups.gameDescription)
  );
}

export default App;