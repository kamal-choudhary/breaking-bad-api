import React from "react";
import logo from "../../img/logo.png";
import Links from "./Links";

const Header = () => {
  return (
    <header className="center">
      <img src={logo} alt="" />
      <Links />
    </header>
  );
};

export default Header;
