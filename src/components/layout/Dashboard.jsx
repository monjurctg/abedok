import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Sidebar from "../../pages/Sidebar";
import { setdashBoard } from "../../redux/actions/sidebarAction";

function Dashboard({ children }) {
  let dispatch = useDispatch();
  const [dashboardRes, setDashboardRes] = useState(true);

  function open() {
    dispatch(setdashBoard(dashboardRes));
  }
  // let sidebar = getSideBar();
  // // const { activeSideBar } = useSelector((state) => state.activeSideBar);
  // let currentUser = useAuth();
  // console.log("object :>> ", currentUser.currentUser.data.permission);

  // let permissions = currentUser?.currentUser?.data?.permission;

  // console.log("permissions :>> ", permissions);
  // console.log("children :>> ", children);

  // console.log("sidebar :>> ", sidebar);
  return (
    <div className="dashboard d-flex">
      {/* <div className="container-fluid"> */}

      <Sidebar />
      <div className="ds__menuBar mb-3" onClick={open}>
        <i className="fa-solid fa-bars"></i>
      </div>
      <>{children}</>
    </div>

    // </div>
  );
}

export default Dashboard;
