import React from "react";
import { useParams } from "react-router-dom";
import Dashboard from "../../components/layout/Dashboard";
import { AD } from "../../constants/ad";
import Address from "./create/Address";
import Basic from "./create/Basic";
import Education from "./create/Education";
import Experience from "./create/Experience";
import Skill from "./create/Skill";
import UploadDocument from "./create/UploadDocument";
import Header from "./Header";

function Create() {
  let {name} = useParams();


  let activeBar = (name === AD.BASIC) ? <Basic /> : (name === AD.SKILL) ? <Skill/>: (name === AD.EXPERIENCE) ? <Experience/>: (name === AD.ADDRESS) ? <Address/>:(name === AD.EDUCATION) ? <Education/>:<UploadDocument/>;


  // let activeBar = (name === AD.BASIC) ? <Basic /> : (name === AD.SKILL && userCurrent) ? <Skill/>: (name === AD.EXPERIENCE && userCurrent) ? <Experience/>: (name === AD.ADDRESS && userCurrent) ? <Address/>:(name === AD.EDUCATION && userCurrent) ? <Education/>:(name === AD.PROVE_DOCUMENT && userCurrent) ?<UploadDocument/>:"";
  return (
    <>
      <Dashboard>
        <div className="students">
          <Header />

          {activeBar}
        </div>
      </Dashboard>
    </>
  );
}

export default Create;
