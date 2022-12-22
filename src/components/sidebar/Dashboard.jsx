import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { AD } from "../../constants/ad";
import { SIDEBAR } from "../../constants/sidebar";
import { setSideBarState } from "../../redux/actions/sidebarAction";
import { setSideBar } from "../../utils/auth";

function Dashboard({ sidebar, show }) {
  const { activeSideBar, dashboardValue } = useSelector(
    (state) => state.activeSideBar
  );
  let dispatch = useDispatch();

  return (
    <Link to="/dashboard">
      <li
        className={
          sidebar === SIDEBAR.DASHBOARD || sidebar === "/dashboard"
            ? // ||
              // sidebar === urlName
              "active py-2"
            : ""
        }
        onClick={() => {
          setSideBar(SIDEBAR.DASHBOARD);
          dispatch(setSideBarState(AD.DASHBOARD));
        }}
      >
        Dashboard
      </li>
    </Link>
  );
}

export default Dashboard;
