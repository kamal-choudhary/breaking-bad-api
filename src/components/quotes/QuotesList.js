import React, { useState, useEffect } from "react";
import axios from "axios";
import SingleQuote from "./SingleQuote";
import Spinner from "../ui/Spinner";

const QuotesList = (props) => {
  console.log("QuotesList Props=>", props);
  const paramName = props.match.params.c;
  console.log("QuotesList Param Name=>", paramName);
  const [quotes, setQuotes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  let characterName = "";

  if (paramName === undefined) {
    characterName = "";
  } else {
    characterName = paramName;
  }

  useEffect(() => {
    const url =
      characterName === ""
        ? `https://www.breakingbadapi.com/api/quotes`
        : `https://www.breakingbadapi.com/api/quote?author=${characterName}`;

    axios
      .get(url)
      .then((res) => {
        setQuotes(res.data);
        setIsLoading(false);
      })
      .catch((err) => console.log("QuotesList Error=>", err));
  }, [characterName]);

  return (
    <React.Fragment>
      {characterName === "" ? (
        <h2 style={{ marginBottom: "20px", textAlign: "center" }}>
          All Quotes
        </h2>
      ) : (
        <h2 style={{ marginBottom: "20px", textAlign: "center" }}>
          {characterName.replace("+", " ")} Quotes
        </h2>
      )}
      {isLoading ? <Spinner /> : null}

      {console.log("QuotesList quotes got=> ", quotes)}
      {!isLoading && quotes.length === 0 ? (
        <h4>There are no quotes associated with this person.</h4>
      ) : null}
      {quotes.map((quote) => (
        <SingleQuote key={quote.quote_id} quote={quote} />
      ))}
    </React.Fragment>
  );
};

export default QuotesList;
