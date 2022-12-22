import React from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { AD } from "../../constants/ad";
function Header() {
  let { name,id } = useParams();
  let { userCurrent } = useSelector((state) => state.inputVal);
  console.log("userCurrent", userCurrent);

  return (
    <>
      <div className="header__create">
        <div>
          <Link to={`/user/create/student/${id}/basic`}>
            <h5 className={name === AD.BASIC ? "active" : ""}>Basic Info</h5>
          </Link>
        </div>
        <div>
            <Link to={`/user/create/student/${id}/address`}>
              <h5 className={name === AD.ADDRESS ? "active" : ""}>Address</h5>
            </Link>
       
        </div>
        <div>
            <Link to={`/user/create/student/${id}/education`}>
              <h5 className={name === AD.EDUCATION ? "active" : ""}>
                Education
              </h5>
            </Link>
     
        </div>

        <div>

          <Link to={`/user/create/student/${id}/skill`}>
            <h5 className={name === AD.SKILL ? "active" : ""}>Skill</h5>
          </Link>
        </div>
        <div>

          <Link to={`/user/create/student/${id}/experience`}>
            <h5 className={name === AD.EXPERIENCE ? "active" : ""}>
              Experience
            </h5>
          </Link>

        </div>

        <div>
          <Link to={`/user/create/student/${id}/prove-document`}>
            <h5 className={name === AD.PROVE_DOCUMENT ? "active" : ""}>
              Prove Document
            </h5>
          </Link>
        </div>
      </div>
    </>
  );
}

export default Header;
