import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useRouteMatch } from "react-router-dom";
import Spinner from "../ui/Spinner";

const SingleSeries = (props) => {
  let { path, url } = useRouteMatch();
  const [episodesData, setEpisodesData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  console.log(props);
  const paramName = props.match.params.s;

  useEffect(() => {
    axios(`https://www.breakingbadapi.com/api/episodes?series=${paramName}`)
      .then((res) => {
        console.log("SingleSeries initial Data=>", res.data);
        setEpisodesData(res.data);
        console.log("AHMED===>", res.data);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }, [paramName]);

  console.log("singleSeries paramName =>", paramName);
  return (
    <div>
      <section className="all-series-card">
        <div className="colored-card">
          <h1>{paramName.replace("+", " ")}</h1>
          <h2>Series Name</h2>
        </div>
        <div className="colored-card">
          <h1>{episodesData.length}</h1>
          <h2>Number of episodes</h2>
        </div>
      </section>
      <h2 style={{ textAlign: "center" }}>Titles of All Episodes</h2>

      {isLoading ? (
        <Spinner />
      ) : (
        <div className="cards">
          {episodesData.map((episode) => (
            <div key={Math.random()} className="episode-list-grid">
              <Link
                style={{
                  color: "white",
                }}
                to={url + "/" + episode.episode_id}
              >
                {episode.title}
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SingleSeries;
