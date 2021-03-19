import React from "react";
import { Link } from "react-router-dom";

const Links = () => {
  return (
    <div className="kamal-links">
      <Link to="/">Home</Link>
      <Link to="/quotes">Quotes</Link>
      <Link to="/characters">Characters</Link>
      <Link to="/series">Series</Link>
    </div>
  );
};
export default Links;
