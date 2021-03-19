import axios from "axios";
import React, { useEffect, useState } from "react";
import QuotesList from "../quotes/QuotesList";

const CharacterProfile = (props) => {
  const [deathCounter, setDeathCounter] = useState(0);
  const [isDead, setIsDead] = useState(false);
  const [episode, setEpisode] = useState("N/A");
  const [season, setSeason] = useState("N/A");

  const paramName = props.match.params.c;

  useEffect(() => {
    axios(`https://www.breakingbadapi.com/api/death-count?name=${paramName}`)
      .then((res) => {
        console.log(res.data);
        setDeathCounter(res.data[0].deathCount);
      })
      .catch((err) => console.log(err));
  }, [paramName]);

  useEffect(() => {
    axios(`https://www.breakingbadapi.com/api/deaths`)
      .then((res) => {
        console.log("Received Array", res.data);
        const dataRec = res.data;
        const filteredArray = dataRec.filter(
          (oneDeath) => oneDeath.death.replace(" ", "+") === paramName
        );
        console.log("filteredArray", filteredArray);
        filteredArray.length < 1 ? setIsDead(false) : setIsDead(true);
        isDead ? setEpisode(filteredArray[0].episode) : setEpisode("N/A");
        isDead ? setSeason(filteredArray[0].season) : setSeason("N/A");
      })
      .catch((err) => console.log(err));
  }, [paramName, isDead]);

  return (
    <div>
      <section className="all-series-card">
        <div className="colored-card">
          <h1>{paramName.replace("+", " ")}</h1>
          <h2>Character's Name</h2>
        </div>
        <div className="colored-card">
          <h1>{isDead ? "DEAD" : "NOT DEAD"}</h1>
          <h2>Whether Dead or Alive</h2>
        </div>
      </section>

      <section className="all-series-cards-three">
        <div className="colored-card">
          <h1>{episode}</h1>
          <h3>Dies in episode</h3>
        </div>
        <div className="colored-card">
          <h1>{season}</h1>
          <h3>Dies in season</h3>
        </div>
        <div className="colored-card">
          <h1>{deathCounter}</h1>
          <h3>Responsible for deaths</h3>
        </div>
      </section>

      <QuotesList {...props} />
    </div>
  );
};

export default CharacterProfile;
