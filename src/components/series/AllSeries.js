import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useRouteMatch } from "react-router-dom";
import Spinner from "../ui/Spinner";

const AllSeries = (props) => {
  let { path, url } = useRouteMatch();

  console.log("AllSeries props=>", props);
  const [seriesNames, setSeriesNames] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios(`https://www.breakingbadapi.com/api/episodes`)
      .then((res) => {
        console.log(res.data);
        const dataReceivedArray = res.data;
        const seriesArray = dataReceivedArray.map((item) => item.series);

        const filteredSeriesArray = [...new Set(seriesArray)];
        console.log("filteredSeriesArray", filteredSeriesArray);
        setSeriesNames(filteredSeriesArray);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  return isLoading ? (
    <Spinner />
  ) : (
    <div className="all-series-card">
      {seriesNames.map((dataItem) => (
        <div className="single-series-card" key={Math.random()}>
          <Link to={path + "/" + dataItem.replace(" ", "+")}>{dataItem}</Link>
        </div>
      ))}
    </div>
  );
};

export default AllSeries;
