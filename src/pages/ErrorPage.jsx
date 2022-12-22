import React from "react";
import img from "../assets/img/error.svg";
import Dashboard from "../components/layout/Dashboard";

const ErrorPage = () => {
  return (
    <Dashboard>
      <div className="dashbroad__item">
        <div className="error-page">
          <img alt="error" src={img} />
        </div>
      </div>
      {/* </div> */}
    </Dashboard>
  );
};

export default ErrorPage;
