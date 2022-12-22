import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { SIDEBAR } from "../../constants/sidebar";
import { setSideBarState } from "../../redux/actions/sidebarAction";
import { setSideBar } from "../../utils/auth";

function Role({ sidebar }) {
  let dispatch = useDispatch();
  const { activeSideBar, dashboardValue } = useSelector(
    (state) => state.activeSideBar
  );

  return (
    <Link to="/role/index">
      <li
        className={sidebar === SIDEBAR.ROLE ? "active py-2" : " py-2"}
        onClick={() => {
          setSideBar(SIDEBAR.ROLE);
          dispatch(setSideBarState(SIDEBAR.ROLE));
        }}
      >
        Role
      </li>
    </Link>
  );
}

export default Role;
