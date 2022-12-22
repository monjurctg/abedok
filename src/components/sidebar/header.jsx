import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/img/logo.svg";
import { setSideBar } from "../../utils/auth";

function Header() {
  return (
    <header>
      <Link to={"/dashboard"} className="header_div">
        <img
          className=""
          src={logo}
          alt="header"
          onClick={() => setSideBar("/dashboard")}
        />
      </Link>
    </header>
  );
}

export default Header;
