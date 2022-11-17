import React, { useEffect, useState } from 'react';
import '../App.css';
import '../css/style.css';
import '../css/style1.css';
import Page from '../html/Page';
import {useParams} from "react-router-dom";

const PageGame = () => {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(false);
  let { id } = useParams();

  const URL = "/api/game/get-detail/" + "?game-id=" + id;

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

export default PageGame;