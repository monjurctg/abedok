import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { SIDEBAR } from "../../constants/sidebar";
import { setSideBarState } from "../../redux/actions/sidebarAction";
import { setSideBar } from "../../utils/auth";

function Permission({ sidebar }) {
  const { activeSideBar, dashboardValue } = useSelector(
    (state) => state.activeSideBar
  );
  let dispatch = useDispatch();

  return (
    <Link to="/permission/index">
      <li
        className={sidebar === SIDEBAR.PERMISSION ? "active py-2" : " py-2"}
        onClick={() => {
          setSideBar(SIDEBAR.PERMISSION);
          dispatch(setSideBarState(SIDEBAR.PERMISSION));
        }}
      >
        Permission
      </li>
    </Link>
  );
}

export default Permission;
