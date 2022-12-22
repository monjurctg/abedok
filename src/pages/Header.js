import React from "react";
import human from "../assets/img/human.svg";
import logo from "../assets/img/logo.png";
function Header() {
  return (
  
      <header className="header">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12">
              <div className="header__logo">
                <img src={logo} alt="logo" />
              </div>
            </div>
            <div className="col-md-12">
              <div>
                <img src={human} alt="human" />
              </div>
            </div>
          </div>
        </div>
      </header>
  
  );
}

export default Header;
