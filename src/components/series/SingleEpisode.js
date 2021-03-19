import React, { useState, useEffect } from "react";
import axios from "axios";
import Spinner from "../ui/Spinner";

const SingleEpisode = (props) => {
  const episodeID = props.match.params.epi;
  const [episodeData, setEpisodeData] = useState({});
  const [charactersData, setCharactersData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  console.log("SingleEpisode paramName epi=> ", episodeID);

  useEffect(() => {
    axios(`https://www.breakingbadapi.com/api/episodes/${episodeID}`)
      .then((res) => {
        console.log("SingleEpisode initial Data", res.data);
        setEpisodeData(res.data[0]);
        setCharactersData(episodeData.characters);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }, [episodeID]);

  return (
    <div>
      <section className="all-series-card">
        <div className="colored-card">
          <h1>{episodeData.air_date}</h1>
          <h2>Air Date</h2>
        </div>
        <div className="colored-card">
          <h1>{episodeData.title}</h1>
          <h2>Episode Title</h2>
        </div>
        <div className="colored-card">
          <h1>{episodeData.season}</h1>
          <h2>Season</h2>
        </div>
        <div className="colored-card">
          <h1>{episodeData.series}</h1>
          <h2>Series Name</h2>
        </div>
      </section>
      <h2 style={{ textAlign: "center" }}>Characters of this episode</h2>

      {isLoading ? (
        <Spinner />
      ) : (
        <div className="cards">
          {episodeData.characters
            ? episodeData.characters.map((char) => {
                return (
                  <div className="episode-list-grid" key={Math.random()}>
                    <h3>{char}</h3>
                  </div>
                );
              })
            : episodeData.characters}
        </div>
      )}
    </div>
  );
};

export default SingleEpisode;
