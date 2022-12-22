import React from "react";
import { Link } from "react-router-dom";
import userCreate from "../../assets/img/studentCreate.svg";

function Index() {
  return (
    <div className="studentFirstPage">
      <div>
        <img src={userCreate} alt="userCreate" />
      </div>
      <div>
        <p>
          Currently no data exists! Please click on the following button to add
          your academic qualification.
        </p>
        <div className="text-center">
            <Link to="/user/create/student/basic">
            <button>
            <p>+ Add Education ( If Required)</p>
          </button>
            </Link>
       
        </div>
      </div>
    </div>
  );
}

export default Index;
