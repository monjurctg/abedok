import React from 'react';
import { useAuth } from "../../context/auth";

function ProfileSIde() {
  let currentUser = useAuth();
  // console.log("currentUser :>> ", currentUser);
  console.log("ProfileSIde :>> ");
  return (
    <div className="profile__side">
      <div className="container">
        <div className="profile">
          <img
            src={
              currentUser?.currentUser?.data?.documents?.pp_photo ||
              currentUser?.currentUser?.data?.photo
            }
            alt="profile"
          />
          <div className="texts">
            <h5>{currentUser?.currentUser?.data?.name || "Ananda"}</h5>
            <p>
              {currentUser?.currentUser?.data?.roles[0]?.name || "No roles"}
            </p>
          </div>
        </div>
        {/* <div className="search__box">
          <input type="text" placeholder="Search" />
          <img src={searchIcon} alt="searchIcon" />
        </div> */}
      </div>
    </div>
  );
}

export default ProfileSIde;
