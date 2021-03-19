import React, { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import Header from "./components/ui/Header";
import axios from "axios";
import CharacterGrid from "./components/characters/CharacterGrid";
import Search from "./components/ui/Search";
import QuotesList from "./components/quotes/QuotesList";
import CharacterProfile from "./components/characters/CharacterProfile";
import AllSeries from "./components/series/AllSeries";
import SingleSeries from "./components/series/singleSeries";
import SingleEpisode from "./components/series/SingleEpisode";
import Pagination from "./components/ui/Pagination";

const App = (props) => {
  //Pagination Related

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(12);

  //
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const fetchItems = async () => {
      const result = await axios(
        `https://www.breakingbadapi.com/api/characters/?name=${query}`
      );
      setItems(result.data);
      console.log("KAMAL===>", result.data);
      setIsLoading(false);
    };

    fetchItems();
  }, [query]);
  console.log("App.js props", props);

  //Get Current Posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentItems = items.slice(indexOfFirstPost, indexOfLastPost);

  //Change Page

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container">
      <Header />

      <Switch>
        <Route path="/character/:c">
          {(props) => <CharacterProfile {...props} />}
        </Route>
        <Route path="/characters" exact>
          <Search getQuery={(q) => setQuery(q)} />

          <CharacterGrid
            items={currentItems}
            isLoading={isLoading}
            props={props}
          />
          <Pagination
            postsPerPage={postsPerPage}
            totalPosts={items.length}
            paginate={paginate}
          />
        </Route>
        <Route path="/quotes" exact>
          {(props) => <QuotesList {...props} />}
        </Route>
        <Route path="/series/:s/:epi">
          {(props) => <SingleEpisode {...props} />}
        </Route>
        <Route path="/series/:s">
          {(props) => <SingleSeries {...props} />}
        </Route>
        <Route path="/series" exact>
          {(props) => <AllSeries {...props} />}
        </Route>
        <Route path="/">
          <Search getQuery={(q) => setQuery(q)} />
          <CharacterGrid
            items={currentItems}
            isLoading={isLoading}
            props={props}
          />
          <Pagination
            postsPerPage={postsPerPage}
            totalPosts={items.length}
            paginate={paginate}
          />
        </Route>
      </Switch>
    </div>
  );
};

export default App;
