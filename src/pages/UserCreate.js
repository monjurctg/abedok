import React from "react";
import { useParams } from "react-router-dom";
import { ToastContainer, Zoom } from "react-toastify";
import Dashboard from "../components/layout/Dashboard";
import InputLayouts from "./students/userInputs/InputLayouts";
function UserCreate() {
  let { type } = useParams();
  // // console.log("type", type);
  let mainLayout = <InputLayouts />;

  
  

  let profile = "";
  // if (type === AD.USER_TYPE_SUPER_ADMIN || type === AD.USER_TYPE_MERCHENTS) {
  profile = (
    <div className="user__create userShow">
      <div className=" profile-details">
      <h4 className="job-h4">Create {type === "merchents" ? "Merchents" :"User"}</h4>
      <form>{mainLayout}</form>
      </div>
    </div>
  );
  // }
  // else if (type === AD.USER_TYPE_USER) {
  //   //   console.log('jhhhhh')
  //   profile = <Index />;
  // }
  return (
    <Dashboard>
      {/* <PermissionCheck permission={user.access} module={"user"}> */}
      {profile}
      {/* </PermissionCheck> */}
      <ToastContainer transition={Zoom} />
    </Dashboard>
  );
}

export default UserCreate;
