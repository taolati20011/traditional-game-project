import React, { useEffect, useState } from 'react';
import '../App.css';
import '../css/style.css';
import '../css/style1.css';
import Page from '../html/Page';
import { useNavigate, useParams } from 'react-router-dom';

const PageGame = () => {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(false);
  let { id } = useParams();
  const navigate = useNavigate();

  const URL = "http://13.210.125.44:8080/api/game/get-detail/" + "?game-id=" + id;

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

  if (groups.gameName == null || groups.gameDescription == null) {
    navigate("/not-found");
  }

  return (
    <Page gameName={groups.gameName} description={groups.gameDescription}></Page>
  );
}

export default PageGame;